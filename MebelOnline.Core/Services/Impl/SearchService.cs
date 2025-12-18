using MebelOnline.Core.Enums;
using MebelOnline.Core.Mappings.Config;
using MebelOnline.Core.Models.Common;
using MebelOnline.Core.Models.Products;
using MebelOnline.Core.Models.Search;
using MebelOnline.Db;
using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class SearchService : ISearchService
    {
        private const string MATERIAL = "Матеріал";
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public SearchService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PagedResultModel<ProductCardModel>> GetProductsBySearchParamsAsync(SearchParamsModel searchParams)
        {
            var page = NormalizePage(searchParams.Page);
            var pageSize = NormalizePageSize(searchParams.PageSize);
            var query = await BuildProductQueryAsync(searchParams);

            query = ApplySorting(query, searchParams.SortBy);

            var totalCount = await query.CountAsync();
            var pagedItems = await query
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var mappedResult = _mapper
                .Map<IList<ProductEntity>, IList<ProductCardModel>>(pagedItems)
                .ToList();

            return new PagedResultModel<ProductCardModel>
            {
                Items = mappedResult,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            };
        }

        public async Task<SearchSidebarModel> GetSearchSidebarParamsAsync(SearchParamsModel searchParams)
        {
            var materialAttrId = await GetMaterialAttrIdAsync();

            var queryForPrice = await BuildProductQueryAsync(searchParams, applyPriceFilter: false);
            decimal minPrice = await queryForPrice.AnyAsync() ? await queryForPrice.MinAsync(p => p.Price) : 0;
            decimal maxPrice = await queryForPrice.AnyAsync() ? await queryForPrice.MaxAsync(p => p.Price) : 0;

            var applyPriceFilterForBrands = searchParams.SelectedBrands != null;
            var queryForBrands = await BuildProductQueryAsync(
                searchParams,
                applyBrandFilter: false,
                applyPriceFilter: applyPriceFilterForBrands);

            var brands = await queryForBrands
                .Where(p => p.Brand != null)
                .Select(p => p.Brand.Name)
                .Distinct()
                .OrderBy(name => name)
                .ToListAsync();

            var applyPriceFilterForMaterials = searchParams.SelectedMaterials != null;
            var queryForMaterials = await BuildProductQueryAsync(
                searchParams,
                applyMaterialFilter: false,
                applyPriceFilter: applyPriceFilterForMaterials);

            var materials = await _dbContext.ProductAttributeValues
                .Where(pav =>
                    pav.AttributeId == materialAttrId &&
                    queryForMaterials.Any(p => p.Id == pav.ProductId))
                .Select(pav => pav.Value)
                .Distinct()
                .OrderBy(value => value)
                .ToListAsync();

            return new SearchSidebarModel
            {
                MinPrice = minPrice,
                MaxPrice = maxPrice,
                Brands = brands,
                Materials = materials
            };
        }

        private async Task<int> GetMaterialAttrIdAsync()
        {
            var attr = await _dbContext.ProductAttributes
                .FirstOrDefaultAsync(pa => pa.Name == MATERIAL);

            return attr?.Id ?? 0;
        }

        private int NormalizePage(int page) => page < 0 ? 0 : page;

        private int NormalizePageSize(int pageSize) => pageSize < 10 ? 10 : pageSize;

        private async Task<IQueryable<ProductEntity>> BuildProductQueryAsync(
            SearchParamsModel searchParams,
            bool applyPriceFilter = true,
            bool applyBrandFilter = true,
            bool applyMaterialFilter = true)
        {
            var query = _dbContext.Products
                .Include(p => p.Brand)
                .Include(p => p.Images)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchParams.SearchString))
            {
                var lower = searchParams.SearchString.ToLower();

                query = query.Where(p =>
                    (p.Title != null && p.Title.ToLower().Contains(lower)) ||
                    (p.Description != null && p.Description.ToLower().Contains(lower)) ||
                    (p.Brand != null && p.Brand.Name.ToLower().Contains(lower)) ||
                    _dbContext.Categories.Any(c =>
                        c.Id == p.CategoryId &&
                        c.Name != null &&
                        c.Name.ToLower().Contains(lower)) ||
                    _dbContext.ProductAttributeValues.Any(pav =>
                        pav.ProductId == p.Id &&
                        pav.Value != null &&
                        pav.Value.ToLower().Contains(lower))
                );
            }

            if (applyPriceFilter)
            {
                if (searchParams.MinPrice.HasValue)
                    query = query.Where(p => p.Price >= searchParams.MinPrice.Value);

                if (searchParams.MaxPrice.HasValue)
                    query = query.Where(p => p.Price <= searchParams.MaxPrice.Value);
            }

            if (applyBrandFilter && searchParams.SelectedBrands?.Any() == true)
            {
                query = query.Where(p =>
                    p.Brand != null &&
                    searchParams.SelectedBrands.Contains(p.Brand.Name));
            }

            if (applyMaterialFilter && searchParams.SelectedMaterials?.Any() == true)
            {
                var materialAttrId = await GetMaterialAttrIdAsync();

                if (materialAttrId != 0)
                {
                    query = query.Where(p =>
                        _dbContext.ProductAttributeValues.Any(pav =>
                            pav.ProductId == p.Id &&
                            pav.AttributeId == materialAttrId &&
                            searchParams.SelectedMaterials.Contains(pav.Value)));
                }
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
                _ => query.OrderByDescending(p => p.Id)
            };
        }
    }
}
