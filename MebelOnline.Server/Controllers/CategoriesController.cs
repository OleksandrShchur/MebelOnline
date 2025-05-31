using MebelOnline.Core.Models.Categories;
using MebelOnline.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace MebelOnline.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService) 
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IEnumerable<CategorySidebarRevertedModel>> GetAll()
        {
            var categories = await _categoryService.GetCategoriesForSidebar();

            return categories;
        }
    }
}
