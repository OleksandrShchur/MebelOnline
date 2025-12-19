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
            var items = await query
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var mapped = _mapper
                .Map<IList<ProductEntity>, IList<ProductCardModel>>(items)
                .ToList();

            return new PagedResultModel<ProductCardModel>
            {
                Items = mapped,
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
            var minPrice = await queryForPrice.AnyAsync() ? await queryForPrice.MinAsync(p => p.Price) : 0;
            var maxPrice = await queryForPrice.AnyAsync() ? await queryForPrice.MaxAsync(p => p.Price) : 0;

            var queryForBrands = await BuildProductQueryAsync(
                searchParams,
                applyBrandFilter: false,
                applyPriceFilter: searchParams.SelectedBrands != null);

            var brands = await queryForBrands
                .Where(p => p.Brand != null)
                .Select(p => p.Brand.Name)
                .Distinct()
                .OrderBy(x => x)
                .ToListAsync();

            var queryForMaterials = await BuildProductQueryAsync(
                searchParams,
                applyMaterialFilter: false,
                applyPriceFilter: searchParams.SelectedMaterials != null);

            var materials = await _dbContext.ProductAttributeValues
                .Where(pav =>
                    pav.AttributeId == materialAttrId &&
                    queryForMaterials.Any(p => p.Id == pav.ProductId))
                .Select(pav => pav.Value)
                .Distinct()
                .OrderBy(x => x)
                .ToListAsync();

            return new SearchSidebarModel
            {
                MinPrice = minPrice,
                MaxPrice = maxPrice,
                Brands = brands,
                Materials = materials
            };
        }

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

                // CATEGORY RESOLUTION (2–3 LEVEL TREE)
                var matchedCategoryIds = await _dbContext.Categories
                    .Where(c => c.Name != null && c.Name.ToLower().Contains(lower))
                    .Select(c => c.Id)
                    .ToListAsync();

                var childCategoryIds = await _dbContext.Categories
                    .Where(c => c.ParentCategoryId != null && matchedCategoryIds.Contains(c.ParentCategoryId.Value))
                    .Select(c => c.Id)
                    .ToListAsync();

                var grandChildCategoryIds = await _dbContext.Categories
                    .Where(c => c.ParentCategoryId != null && childCategoryIds.Contains(c.ParentCategoryId.Value))
                    .Select(c => c.Id)
                    .ToListAsync();

                var allCategoryIds = matchedCategoryIds
                    .Concat(childCategoryIds)
                    .Concat(grandChildCategoryIds)
                    .Distinct()
                    .ToList();

                query = query.Where(p =>
                    (p.Title != null && p.Title.ToLower().Contains(lower)) ||
                    (p.Description != null && p.Description.ToLower().Contains(lower)) ||
                    (p.Brand != null && p.Brand.Name.ToLower().Contains(lower)) ||
                    allCategoryIds.Contains(p.CategoryId) ||
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

        private async Task<int> GetMaterialAttrIdAsync()
        {
            var attr = await _dbContext.ProductAttributes
                .FirstOrDefaultAsync(pa => pa.Name == MATERIAL);

            return attr?.Id ?? 0;
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

        private int NormalizePage(int page) => page < 0 ? 0 : page;
        private int NormalizePageSize(int pageSize) => pageSize < 10 ? 10 : pageSize;
    }
}
