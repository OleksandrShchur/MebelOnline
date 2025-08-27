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

var builder = WebApplication.CreateBuilder(args);

// Register mappers
builder.Services.AddSingleton<IMappingService<CategoryEntity, CategoryModel>, CategoryModelMapper>();
builder.Services.AddSingleton<IMappingService<ProductEntity, ProductCardModel>, ProductCardModelMapper>();
builder.Services.AddSingleton<IMappingService<ProductEntity, ProductDetailsModel>, ProductDetailsModelMapper>();
builder.Services.AddSingleton<IMappingService<CategoryEntity, CategoryBreadcrumbModel>, CategoryBreadcrumbMapper>();
builder.Services.AddSingleton<IMappingService<CategoryEntity, CategoryCatalogModel>, CategoryCatalogModelMapper>();

// Register services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ISearchService, SearchService>();

// Add services to the container.
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

// Configure SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Ensure the database is created (only if using Database First approach)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MebelOnline API v1");
        c.RoutePrefix = string.Empty; // Swagger will be at root URL ("/")
    });

    // Redirect root URL to Swagger
    app.Use(async (context, next) =>
    {
        if (context.Request.Path == "/")
        {
            context.Response.Redirect("/index.html");
        }
        else
        {
            await next();
        }
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
