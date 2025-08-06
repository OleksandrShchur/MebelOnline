using MebelOnline.Core.Enums;
using MebelOnline.Core.Mappings;
using MebelOnline.Core.Models.Common;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db;
using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<ProductEntity, ProductCardModel> _productCardMapper;
        private readonly IMappingService<ProductEntity, ProductDetailsModel> _productDetailsMapper;

        public ProductService(AppDbContext dbContext, IMappingService<ProductEntity, ProductCardModel> productCardMapper,
            IMappingService<ProductEntity, ProductDetailsModel> productDetailsMapper)
        {
            _dbContext = dbContext;
            _productCardMapper = productCardMapper;
            _productDetailsMapper = productDetailsMapper;
        }

        public async Task<IEnumerable<ProductCardModel>> GetLatestProductsAsync()
        {
            var entities = await _dbContext.Products
                .Include(p => p.Images)
                .OrderBy(p => p.Id)
                .Take(12) // TODO: remove magic number
                .ToListAsync();

            var mappedModels = _productCardMapper.MapList(entities);

            return mappedModels;
        }

        public async Task<ProductDetailsModel> GetProductDetailsByIdAsync(int productId)
        {
            var entity = await _dbContext.Products
                .Include(p => p.Brand)
                .Include(p => p.Options)
                .Include(p => p.Attributes)
                    .ThenInclude(pa => pa.Attribute)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == productId);

            var mappedProduct = _productDetailsMapper.Map(entity);

            return mappedProduct;
        }

        public async Task<PagedResultModel<ProductCardModel>> GetProductsBySearchParams(SearchParamsModel searchParams)
        {
            var page = searchParams.Page < 1 
                ? 1 
                : searchParams.Page;
            var pageSize = searchParams.PageSize < 10
                ? 10
                : searchParams.PageSize;

            var query = _dbContext.Products
                .Include(p => p.Brand)
                .Include(p => p.Images)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchParams.SearchString))
            {
                query = query.Where(p => p.Title.Contains(searchParams.SearchString) ||
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
                query = query.Where(p => p.Brand != null &&
                                      p.Brand.Name.Contains(searchParams.BrandName));
            }

            switch (searchParams.SortBy)
            {
                case SortBy.Ascending:
                    query = query.OrderBy(p => p.Price);
                    break;
                case SortBy.Descending:
                    query = query.OrderByDescending(p => p.Price);
                    break;
                case SortBy.Name:
                    query = query.OrderBy(p => p.Title);
                    break;
                default:
                    query = query.OrderBy(p => p.Id);
                    break;
            }

            var totalCount = await query.CountAsync();

            // Pagination
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var mappedResult = _productCardMapper.MapList(items)
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
    }
}
