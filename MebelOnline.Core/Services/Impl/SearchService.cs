using MebelOnline.Core.Enums;
using MebelOnline.Core.Models.Common;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class SearchService : ISearchService
    {
        public async Task<PagedResultModel<ProductCardModel>> GetProductsBySearchParams(SearchParamsModel searchParams)
        {
            var page = NormalizePage(searchParams.Page);
            var pageSize = NormalizePageSize(searchParams.PageSize);

            var query = BuildProductQuery(searchParams);

            query = ApplySorting(query, searchParams.SortBy);

            var totalCount = await query.CountAsync();

            var pagedItems = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var mappedResult = _productCardMapper.MapList(pagedItems).ToList();

            return new PagedResultModel<ProductCardModel>
            {
                Items = mappedResult,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            };
        }

        private int NormalizePage(int page) => page < 1 ? 1 : page;

        private int NormalizePageSize(int pageSize) => pageSize < 10 ? 10 : pageSize;

        private IQueryable<ProductEntity> BuildProductQuery(SearchParamsModel searchParams)
        {
            var query = _dbContext.Products
                .Include(p => p.Brand)
                .Include(p => p.Images)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchParams.SearchString))
            {
                query = query.Where(p =>
                    p.Title.Contains(searchParams.SearchString) ||
                    p.Description.Contains(searchParams.SearchString));
            }

            if (searchParams.MinPrice.HasValue)
            {
                query = query.Where(p => p.Price >= searchParams.MinPrice.Value);
            }

            if (searchParams.MaxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= searchParams.MaxPrice.Value);
            }

            if (!string.IsNullOrWhiteSpace(searchParams.BrandName))
            {
                query = query.Where(p =>
                    p.Brand != null &&
                    p.Brand.Name.Contains(searchParams.BrandName));
            }

            return query;
        }

        private IQueryable<ProductEntity> ApplySorting(IQueryable<ProductEntity> query, SortBy sortBy)
        {
            return sortBy switch
            {
                SortBy.Ascending => query.OrderBy(p => p.Price),
                SortBy.Descending => query.OrderByDescending(p => p.Price),
                SortBy.Name => query.OrderBy(p => p.Title),
                _ => query.OrderBy(p => p.Id),
            };
        }
    }
}
