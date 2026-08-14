using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Db.EntityConfigurations
{
    internal class ProductAttributeValueEntityConfiguration : IEntityTypeConfiguration<ProductAttributeValueEntity>
    {
        public void Configure(EntityTypeBuilder<ProductAttributeValueEntity> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.Value)
                .HasMaxLength(100);

            builder.HasOne(p => p.Attribute)
                .WithMany()
                .HasForeignKey(p => p.AttributeId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
