using MebelOnline.Db;
using MebelOnline.Db.Entities;
using MebelOnline.Server.Mappings;
using MebelOnline.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<CategoryEntity, CategorySidebarModel> _mapper;
        public CategoriesController(AppDbContext dbContext, IMappingService<CategoryEntity, CategorySidebarModel> mapper) 
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IEnumerable<CategorySidebarModel>> GetAll()
        {
            var entities = await _dbContext.Categories
                            .Include(c => c.ParentCategory)
                                .ThenInclude(pc => pc.ParentCategory)
                            .Where(c => c.HasProducts)
                            .OrderBy(c => c.Id)
                            .ToListAsync();

            var mappedModels = _mapper.MapList(entities);

            return mappedModels;
        }
    }
}
