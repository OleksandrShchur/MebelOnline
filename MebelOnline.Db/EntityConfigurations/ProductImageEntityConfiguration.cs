using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Db.EntityConfigurations
{
    internal class ProductImageEntityConfiguration : IEntityTypeConfiguration<ProductImageEntity>
    {
        public void Configure(EntityTypeBuilder<ProductImageEntity> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Url)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(p => p.IsPrimary)
                .IsRequired();

            builder.Property(p => p.ProductId)
                .IsRequired();
        }
    }
}
