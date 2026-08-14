using MebelOnline.Core.Mappings.ProductMappings;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db.Entities;
using MebelOnline.Db.Enums;

namespace MebelOnline.Core.Tests.Mappings
{
    public class ProductCardModelMapperTests
    {
        private readonly ProductCardModelMapper _mapper = new();

        [Fact]
        public void Map_NullSource_ReturnsNull()
        {
            Assert.Null(_mapper.Map(null!));
        }

        [Fact]
        public void Map_MissingPrimaryImage_DoesNotThrow_UsesFirstImage()
        {
            var entity = CreateProduct();
            entity.Images = new List<ProductImageEntity>
            {
                new() { Url = "https://example.com/secondary.jpg", IsPrimary = false }
            };

            var card = _mapper.Map(entity);

            Assert.Equal("https://example.com/secondary.jpg", card.ImageUrl);
        }

        [Fact]
        public void Map_NoImages_SetsNullImageUrl()
        {
            var entity = CreateProduct();
            entity.Images = new List<ProductImageEntity>();

            var card = _mapper.Map(entity);

            Assert.NotNull(card);
            Assert.Null(card.ImageUrl);
        }

        [Fact]
        public void Map_NullImagesCollection_SetsNullImageUrl()
        {
            var entity = CreateProduct();
            entity.Images = null!;

            var card = _mapper.Map(entity);

            Assert.Null(card.ImageUrl);
        }

        [Fact]
        public void Map_CardFieldsOnly()
        {
            var entity = CreateProduct();
            entity.Images = new List<ProductImageEntity>
            {
                new() { Url = "https://example.com/p.jpg", IsPrimary = true },
                new() { Url = "https://example.com/g.jpg", IsPrimary = false }
            };

            var card = _mapper.Map(entity);

            Assert.Equal(11, card.Id);
            Assert.Equal("Ліжко", card.Title);
            Assert.Equal(15999m, card.Price);
            Assert.Equal("https://example.com/p.jpg", card.ImageUrl);
            Assert.IsType<ProductCardModel>(card);
        }

        private static ProductEntity CreateProduct() => new()
        {
            Id = 11,
            Title = "Ліжко",
            Price = 15999m,
            OldPrice = 18999m
        };
    }

    public class ProductDetailsModelMapperTests
    {
        private readonly ProductDetailsModelMapper _mapper = new();

        [Fact]
        public void Map_NullSource_ReturnsNull()
        {
            Assert.Null(_mapper.Map(null!));
        }

        [Fact]
        public void Map_SplitsFrontAndFrame_IncludesMaterialNoteCategory()
        {
            var entity = new ProductEntity
            {
                Id = 25,
                Title = "Диван",
                Description = "Прямий диван",
                Price = 18999m,
                Note = "Тканина антикіготь",
                Brand = new BrandEntity { Name = "Blest", Description = "М'які меблі" },
                Category = new CategoryEntity { Id = 30, Name = "Прямі дивани" },
                Options = new List<ProductOptionEntity>
                {
                    new() { ColorName = "Сірий", Material = "Велюр", OptionType = ProductOptionTypeEnum.Front, ImageUrl = "f.jpg" },
                    new() { ColorName = "Горіх", Material = "ДСП", OptionType = ProductOptionTypeEnum.Frame, ImageUrl = "r.jpg" },
                    new() { ColorName = "Ignore", OptionType = ProductOptionTypeEnum.NotSpecified }
                },
                Images = new List<ProductImageEntity>
                {
                    new() { Url = "a.jpg", IsPrimary = true },
                    new() { Url = "b.jpg", IsPrimary = false }
                },
                Attributes = new List<ProductAttributeValueEntity>
                {
                    new()
                    {
                        Value = "Велюр",
                        Attribute = new ProductAttributeEntity { Name = "Матеріал" }
                    }
                }
            };

            var details = _mapper.Map(entity);

            Assert.Equal("Тканина антикіготь", details.Note);
            Assert.Equal("Blest", details.Brand?.Name);
            Assert.Equal(30, details.Category?.Id);
            Assert.Equal("Прямі дивани", details.Category?.Name);
            Assert.Single(details.FrontOptions);
            Assert.Equal("Велюр", details.FrontOptions[0].Material);
            Assert.Single(details.FrameOptions);
            Assert.Equal("ДСП", details.FrameOptions[0].Material);
            Assert.Equal(2, details.Images.Count);
            Assert.Equal("Матеріал", details.Attributes[0].Key);
        }

        [Fact]
        public void Map_MissingBrandAndAttributeNavigation_DoesNotThrow()
        {
            var entity = new ProductEntity
            {
                Id = 1,
                Title = "Test",
                Price = 1m,
                Options = null!,
                Images = null!,
                Attributes = new List<ProductAttributeValueEntity>
                {
                    new() { Value = "x", Attribute = null! }
                }
            };

            var details = _mapper.Map(entity);

            Assert.Null(details.Brand);
            Assert.Empty(details.Attributes);
            Assert.Empty(details.FrontOptions);
            Assert.Empty(details.Images);
        }
    }
}
