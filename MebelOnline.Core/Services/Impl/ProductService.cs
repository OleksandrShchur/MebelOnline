using MebelOnline.Core.Mappings.Config;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db;
using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ProductService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductCardModel>> GetLatestProductsAsync()
        {
            var entities = await _dbContext.Products
                .Include(p => p.Images)
                .OrderBy(p => p.Id)
                .Take(12) // TODO: remove magic number
                .ToListAsync();

            var mappedModels = _mapper.Map<IList<ProductEntity>, IList<ProductCardModel>>(entities);

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

            var mappedProduct = _mapper.Map<ProductEntity, ProductDetailsModel>(entity);

            return mappedProduct;
        }
    }
}
