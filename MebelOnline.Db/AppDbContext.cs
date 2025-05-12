using System.Reflection;
using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Db
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
