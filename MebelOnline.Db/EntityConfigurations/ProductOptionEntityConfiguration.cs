using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Db.EntityConfigurations
{
    internal class ProductOptionEntityConfiguration : IEntityTypeConfiguration<ProductOptionEntity>
    {
        public void Configure(EntityTypeBuilder<ProductOptionEntity> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.ProductId)
                .IsRequired();

            builder.Property(p => p.ColorName)
                .HasMaxLength(100);

            builder.Property(p => p.Material)
                .HasMaxLength(100);

            builder.Property(p => p.ImageUrl)
                .HasMaxLength(500);
        }
    }
}
