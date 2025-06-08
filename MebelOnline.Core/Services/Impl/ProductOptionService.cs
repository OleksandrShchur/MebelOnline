using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MebelOnline.Core.Mappings;
using MebelOnline.Core.Models.ProductOptions;
using MebelOnline.Db;
using MebelOnline.Db.Entities;
using MebelOnline.Db.Enums;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class ProductOptionService : IProductOptionService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<ProductOptionEntity, ProductOptionModel> _mapper;

        public ProductOptionService(AppDbContext dbContext, 
            IMappingService<ProductOptionEntity, ProductOptionModel> mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductOptionModel>> GetForProductByOptionTypeAsync(int productId, ProductOptionTypeEnum type)
        {
            var options = await _dbContext.ProductOptions
                .Where(p => p.ProductId == productId && p.OptionType == type)
                .ToListAsync();

            var mappedOptions = _mapper.MapList(options);

            return mappedOptions;
        }
    }
}
