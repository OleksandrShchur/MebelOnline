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

            builder.Property(c => c.ImageUrl)
                .HasMaxLength(500)
                .IsRequired(false);

            builder.HasIndex(c => c.Name)
                .IsUnique()
                .HasDatabaseName("UX_Categories_Name");

            builder.Property(c => c.ParentCategoryId)
                .IsRequired(false);

            builder.Property(c => c.HasProducts)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasIndex(c => c.ParentCategoryId)
                .HasDatabaseName("IX_Categories_ParentCategoryId");

            builder.HasOne(c => c.ParentCategory)
                .WithMany()
                .HasForeignKey(c => c.ParentCategoryId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
