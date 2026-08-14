using MebelOnline.Core.Helpers.Categories;
using MebelOnline.Core.Models.Categories;

namespace MebelOnline.Core.Tests.Categories
{
    public class CategoryHierarchyTests
    {
        [Fact]
        public void GetSelfAndDescendantIds_IncludesNestedLevels()
        {
            var tree = new List<(int Id, int? ParentId)>
            {
                (10, null),
                (30, 10),
                (31, 10),
                (34, 30),
                (35, 31),
                (1, null)
            };

            var ids = CategoryHierarchy.GetSelfAndDescendantIds(10, tree);

            Assert.Equal(new[] { 10, 30, 31, 34, 35 }, ids);
        }

        [Fact]
        public void GetSelfAndDescendantIds_LeafReturnsSelf()
        {
            var tree = new List<(int Id, int? ParentId)>
            {
                (10, null),
                (34, 30),
                (30, 10)
            };

            var ids = CategoryHierarchy.GetSelfAndDescendantIds(34, tree);
            Assert.Equal(new[] { 34 }, ids);
        }
    }

    public class CategoryTransformerTests
    {
        [Fact]
        public void ConvertToBreadcrumb_UsesCatalogIdUrls()
        {
            var category = new CategoryModel
            {
                Id = 34,
                Name = "Прямі дивани з нішею",
                ParentCategory = new CategoryModel
                {
                    Id = 30,
                    Name = "Прямі дивани",
                    ParentCategory = new CategoryModel
                    {
                        Id = 10,
                        Name = "Дивани"
                    }
                }
            };

            var crumbs = CategoryTransformer.ConvertToBreadcrumb(category);

            Assert.Equal("/", crumbs[0].Url);
            Assert.Equal("/catalog", crumbs[1].Url);
            Assert.Equal("/catalog/10", crumbs[2].Url);
            Assert.Equal("/catalog/30", crumbs[3].Url);
            Assert.Equal("/catalog/34", crumbs[4].Url);
            Assert.DoesNotContain(crumbs, c => c.Url != null && c.Url.Contains("/search?"));
        }

        [Fact]
        public void ConvertHierarchy_BuildsThreeLevels()
        {
            var leaves = new List<CategoryModel>
            {
                new()
                {
                    Id = 34,
                    Name = "Прямі дивани з нішею",
                    ParentCategory = new CategoryModel
                    {
                        Id = 30,
                        Name = "Прямі дивани",
                        ParentCategory = new CategoryModel { Id = 10, Name = "Дивани" }
                    }
                }
            };

            var roots = CategoryTransformer.ConvertHierarchy(leaves);
            var sofas = Assert.Single(roots);
            Assert.Equal(10, sofas.Id);
            var straight = Assert.Single(sofas.ChildrenCategories);
            Assert.Equal(30, straight.Id);
            Assert.Equal(34, Assert.Single(straight.ChildrenCategories).Id);
        }
    }
}
