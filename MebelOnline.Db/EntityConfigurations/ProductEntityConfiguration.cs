using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MebelOnline.Db.EntityConfigurations
{
    internal class ProductEntityConfiguration : IEntityTypeConfiguration<ProductEntity>
    {
        public void Configure(EntityTypeBuilder<ProductEntity> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(p => p.Description)
                .HasMaxLength(4000);

            builder.Property(p => p.Price)
                .IsRequired();

            builder.Property(p => p.CategoryId)
                .IsRequired();

            builder.Property(p => p.BrandId)
                .IsRequired(false);

            builder.Property(p => p.Note)
                .IsRequired(false)
                .HasMaxLength(255);

            builder.HasOne(p => p.Brand)
                .WithMany()
                .HasForeignKey(p => p.BrandId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(p => p.Category)
                .WithMany()
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasIndex(p => p.CategoryId)
                .HasDatabaseName("IX_Products_CategoryId");

            builder.HasIndex(p => p.Title)
                .HasDatabaseName("IX_Products_Title");

            builder.HasMany(p => p.Options)
                .WithOne()
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(p => p.Images)
                .WithOne()
                .HasForeignKey(i => i.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(p => p.Attributes)
                .WithOne()
                .HasForeignKey(a => a.ProductId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
