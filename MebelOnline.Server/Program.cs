using Microsoft.EntityFrameworkCore;
using MebelOnline.Db;
using MebelOnline.Db.Entities;
using MebelOnline.Core.Mappings;
using MebelOnline.Core.Models.Categories;
using MebelOnline.Core.Mappings.CategoryMappings;
using MebelOnline.Core.Models.Products;
using MebelOnline.Core.Mappings.ProductMappings;
using MebelOnline.Core.Services;
using MebelOnline.Core.Services.Impl;
using MebelOnline.Core.Mappings.Config;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();

// Register mappers
builder.Services.AddSingleton<IMappingService<CategoryEntity, CategoryModel>, CategoryModelMapper>();
builder.Services.AddSingleton<IMappingService<ProductEntity, ProductCardModel>, ProductCardModelMapper>();
builder.Services.AddSingleton<IMappingService<ProductEntity, ProductDetailsModel>, ProductDetailsModelMapper>();
builder.Services.AddSingleton<IMappingService<CategoryEntity, CategoryBreadcrumbModel>, CategoryBreadcrumbMapper>();
builder.Services.AddSingleton<IMappingService<CategoryEntity, CategoryCatalogModel>, CategoryCatalogModelMapper>();

builder.Services.AddSingleton<IMapper, Mapper>();

// Register services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ISearchService, SearchService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "MebelOnline API",
        Version = "v1",
        Description = "API documentation for MebelOnline."
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MebelOnline API v1");
        c.RoutePrefix = "swagger";
    });
}

if (!app.Environment.IsEnvironment("Testing"))
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

public partial class Program
{
}
