using MebelOnline.Core.Models.Categories;

namespace MebelOnline.Core.Helpers.Categories
{
    public static class CategoryTransformer
    {
        public static IList<CategoryRevertedModel> ConvertHierarchy(IList<CategoryModel> categories)
        {
            var roots = new Dictionary<int, CategoryRevertedModel>();

            foreach (var firstLevel in categories)
            {
                var parent = firstLevel.ParentCategory;
                var grandparent = parent?.ParentCategory;

                if (grandparent == null)
                {
                    // Handle second level structure
                    if (!roots.TryGetValue(parent.Id, out var root))
                    {
                        root = new CategoryRevertedModel
                        {
                            Id = parent.Id,
                            Name = parent.Name,
                            ChildrenCategories = new List<CategoryRevertedModel>()
                        };
                        roots[parent.Id] = root;
                    }

                    root.ChildrenCategories.Add(new CategoryRevertedModel
                    {
                        Id = firstLevel.Id,
                        Name = firstLevel.Name
                    });
                }
                else
                {
                    // Handle third level structure
                    if (!roots.TryGetValue(grandparent.Id, out var root))
                    {
                        root = new CategoryRevertedModel
                        {
                            Id = grandparent.Id,
                            Name = grandparent.Name,
                            ChildrenCategories = new List<CategoryRevertedModel>()
                        };
                        roots[grandparent.Id] = root;
                    }

                    var secondLevel = root.ChildrenCategories.FirstOrDefault(x => x.Id == parent.Id);
                    if (secondLevel == null)
                    {
                        secondLevel = new CategoryRevertedModel
                        {
                            Id = parent.Id,
                            Name = parent.Name,
                            ChildrenCategories = new List<CategoryRevertedModel>()
                        };
                        root.ChildrenCategories.Add(secondLevel);
                    }

                    secondLevel.ChildrenCategories.Add(new CategoryRevertedModel
                    {
                        Id = firstLevel.Id,
                        Name = firstLevel.Name
                    });
                }
            }

            return roots.Values.ToList();
        }
    }
}
