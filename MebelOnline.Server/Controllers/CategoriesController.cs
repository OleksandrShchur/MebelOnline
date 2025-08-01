﻿using MebelOnline.Core.Models.Categories;
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
        public async Task<IEnumerable<CategoryRevertedModel>> GetAll()
        {
            var categories = await _categoryService.GetCategoriesHierarchyAsync();

            return categories;
        }

        [HttpGet]
        [Route("breadcrumbs/{productId:int}")]
        public async Task<IEnumerable<CategoryBreadcrumbModel>> GetBreadcrubmsForProduct([FromRoute] int productId)
        {
            var breadcrumbs = await _categoryService.GetBreadcrumbsAsync(productId);

            return breadcrumbs;
        }

        [HttpGet]
        [Route("catalog")]
        public async Task<IEnumerable<CategoryCatalogModel>> GetCatalog()
        {
            var catalog = await _categoryService.GetCatalogAsync();

            return catalog;
        }
    }
}
