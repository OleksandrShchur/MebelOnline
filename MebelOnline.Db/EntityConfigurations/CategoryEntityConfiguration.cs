using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MebelOnline.Db.EntityConfigurations
{
    internal class CategoryEntityConfiguration : IEntityTypeConfiguration<CategoryEntity>
    {
        public void Configure(EntityTypeBuilder<CategoryEntity> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(c => c.Description)
                .HasMaxLength(500);

            builder.HasIndex(c => c.Name)
                .IsUnique();

            builder.Property(c => c.ParentCategoryId)
                .IsRequired(false);

            builder.Property(c => c.HasProducts)
                .IsRequired(true);
        }
    }
}
