using MebelOnline.Core.Enums;
using MebelOnline.Core.Helpers.Categories;
using MebelOnline.Core.Helpers.Search;
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
        private const string MaterialAttributeName = "Матеріал";
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public SearchService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PagedResultModel<ProductCardModel>> GetProductsBySearchParamsAsync(
            SearchParamsModel searchParams,
            CancellationToken cancellationToken = default)
        {
            var page = NormalizePage(searchParams.Page);
            var pageSize = NormalizePageSize(searchParams.PageSize);

            var query = await BuildProductQueryAsync(searchParams, cancellationToken: cancellationToken);
            query = ApplySorting(query, searchParams.SortBy);

            var totalCount = await query.CountAsync(cancellationToken);
            var items = await query
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            var mapped = _mapper
                .Map<IList<ProductEntity>, IList<ProductCardModel>>(items)
                .ToList();

            return new PagedResultModel<ProductCardModel>
            {
                Items = mapped,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = pageSize == 0 ? 0 : (int)Math.Ceiling((double)totalCount / pageSize)
            };
        }

        public async Task<SearchSidebarModel> GetSearchSidebarParamsAsync(
            SearchParamsModel searchParams,
            CancellationToken cancellationToken = default)
        {
            var materialAttrId = await GetMaterialAttrIdAsync(cancellationToken);

            var queryForPrice = await BuildProductQueryAsync(searchParams, applyPriceFilter: false, cancellationToken: cancellationToken);
            var minPrice = await queryForPrice.AnyAsync(cancellationToken)
                ? await queryForPrice.MinAsync(p => p.Price, cancellationToken)
                : 0;
            var maxPrice = await queryForPrice.AnyAsync(cancellationToken)
                ? await queryForPrice.MaxAsync(p => p.Price, cancellationToken)
                : 0;

            var queryForBrands = await BuildProductQueryAsync(
                searchParams,
                applyBrandFilter: false,
                applyPriceFilter: searchParams.SelectedBrands != null,
                cancellationToken: cancellationToken);

            var brands = await queryForBrands
                .Where(p => p.Brand != null)
                .Select(p => p.Brand.Name)
                .Distinct()
                .OrderBy(x => x)
                .ToListAsync(cancellationToken);

            var queryForMaterials = await BuildProductQueryAsync(
                searchParams,
                applyMaterialFilter: false,
                applyPriceFilter: searchParams.SelectedMaterials != null,
                cancellationToken: cancellationToken);

            var materials = materialAttrId == 0
                ? new List<string>()
                : await _dbContext.ProductAttributeValues
                    .AsNoTracking()
                    .Where(pav =>
                        pav.AttributeId == materialAttrId &&
                        queryForMaterials.Any(p => p.Id == pav.ProductId))
                    .Select(pav => pav.Value)
                    .Where(v => v != null)
                    .Distinct()
                    .OrderBy(x => x)
                    .ToListAsync(cancellationToken);

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
            bool applyMaterialFilter = true,
            CancellationToken cancellationToken = default)
        {
            var query = _dbContext.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .AsQueryable();

            var searchText = SearchStringNormalizer.Normalize(searchParams.SearchString);
            if (searchText != null)
            {
                var lower = searchText.ToLower();

                var matchedCategoryIds = await _dbContext.Categories
                    .AsNoTracking()
                    .Where(c => c.Name != null && c.Name.ToLower().Contains(lower))
                    .Select(c => c.Id)
                    .ToListAsync(cancellationToken);

                var childCategoryIds = await _dbContext.Categories
                    .AsNoTracking()
                    .Where(c => c.ParentCategoryId != null && matchedCategoryIds.Contains(c.ParentCategoryId.Value))
                    .Select(c => c.Id)
                    .ToListAsync(cancellationToken);

                var grandChildCategoryIds = await _dbContext.Categories
                    .AsNoTracking()
                    .Where(c => c.ParentCategoryId != null && childCategoryIds.Contains(c.ParentCategoryId.Value))
                    .Select(c => c.Id)
                    .ToListAsync(cancellationToken);

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
                        pav.Value.ToLower().Contains(lower)) ||
                    _dbContext.ProductOptions.Any(o =>
                        o.ProductId == p.Id &&
                        ((o.ColorName != null && o.ColorName.ToLower().Contains(lower)) ||
                         (o.Material != null && o.Material.ToLower().Contains(lower))))
                );
            }

            if (searchParams.CategoryId.HasValue)
            {
                var categoryIds = await ResolveCategoryAndDescendantIdsAsync(searchParams.CategoryId.Value, cancellationToken);
                query = query.Where(p => categoryIds.Contains(p.CategoryId));
            }

            if (applyPriceFilter)
            {
                if (searchParams.MinPrice.HasValue)
                    query = query.Where(p => p.Price >= searchParams.MinPrice.Value);

                if (searchParams.MaxPrice.HasValue)
                    query = query.Where(p => p.Price <= searchParams.MaxPrice.Value);
            }

            var brands = applyBrandFilter ? SearchFilterParser.NormalizeList(searchParams.SelectedBrands) : Array.Empty<string>();
            if (brands.Count > 0)
            {
                query = query.Where(p =>
                    p.Brand != null &&
                    brands.Contains(p.Brand.Name));
            }

            var materials = applyMaterialFilter ? SearchFilterParser.NormalizeList(searchParams.SelectedMaterials) : Array.Empty<string>();
            if (materials.Count > 0)
            {
                var materialAttrId = await GetMaterialAttrIdAsync(cancellationToken);

                if (materialAttrId != 0)
                {
                    query = query.Where(p =>
                        _dbContext.ProductAttributeValues.Any(pav =>
                            pav.ProductId == p.Id &&
                            pav.AttributeId == materialAttrId &&
                            materials.Contains(pav.Value)));
                }
            }

            return query;
        }

        private async Task<List<int>> ResolveCategoryAndDescendantIdsAsync(int categoryId, CancellationToken cancellationToken)
        {
            var categories = await _dbContext.Categories
                .AsNoTracking()
                .Select(c => new { c.Id, c.ParentCategoryId })
                .ToListAsync(cancellationToken);

            var pairs = categories
                .Select(c => (c.Id, c.ParentCategoryId))
                .ToList();

            return CategoryHierarchy.GetSelfAndDescendantIds(categoryId, pairs).ToList();
        }

        private async Task<int> GetMaterialAttrIdAsync(CancellationToken cancellationToken)
        {
            var attr = await _dbContext.ProductAttributes
                .AsNoTracking()
                .FirstOrDefaultAsync(pa => pa.Name == MaterialAttributeName, cancellationToken);

            return attr?.Id ?? 0;
        }

        private static IQueryable<ProductEntity> ApplySorting(IQueryable<ProductEntity> query, SortBy sortBy)
        {
            return sortBy switch
            {
                SortBy.Ascending => query.OrderBy(p => p.Price).ThenBy(p => p.Id),
                SortBy.Descending => query.OrderByDescending(p => p.Price).ThenBy(p => p.Id),
                SortBy.Name => query.OrderBy(p => p.Title).ThenBy(p => p.Id),
                _ => query.OrderByDescending(p => p.Id)
            };
        }

        private static int NormalizePage(int page) => page < 0 ? 0 : page;

        private static int NormalizePageSize(int pageSize)
        {
            if (pageSize < 1)
            {
                return SearchLimits.DefaultPageSize;
            }

            return pageSize > SearchLimits.MaxPageSize ? SearchLimits.MaxPageSize : pageSize;
        }
    }
}
