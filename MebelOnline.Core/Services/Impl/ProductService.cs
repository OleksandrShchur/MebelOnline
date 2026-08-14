using MebelOnline.Core.Helpers.Search;
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

        public async Task<IEnumerable<ProductCardModel>> GetLatestProductsAsync(CancellationToken cancellationToken = default)
        {
            var entities = await _dbContext.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .OrderByDescending(p => p.Id)
                .Take(SearchLimits.LatestProductsCount)
                .ToListAsync(cancellationToken);

            return _mapper.Map<IList<ProductEntity>, IList<ProductCardModel>>(entities);
        }

        public async Task<ProductDetailsModel?> GetProductDetailsByIdAsync(int productId, CancellationToken cancellationToken = default)
        {
            var entity = await _dbContext.Products
                .AsNoTracking()
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.Options)
                .Include(p => p.Attributes)
                    .ThenInclude(pa => pa.Attribute)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);

            if (entity == null)
            {
                return null;
            }

            return _mapper.Map<ProductEntity, ProductDetailsModel>(entity);
        }
    }
}
