using System.Reflection;
using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Db
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<BrandEntity> Brands { get; set; }
        public DbSet<ProductAttributeEntity> ProductAttributes { get; set; }
        public DbSet<ProductAttributeValueEntity> ProductAttributeValues { get; set; }
        public DbSet<ProductImageEntity> ProductImages { get; set; }
        public DbSet<ProductOptionEntity> ProductOptions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
