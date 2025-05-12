using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Db.EntityConfigurations
{
    internal class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.PasswordHash)
                .IsRequired()
                .HasMaxLength(255); // adjust the length based on your hashing algorithm

            builder.HasIndex(u => u.PasswordHash)
                .IsUnique();
        }
    }
}
