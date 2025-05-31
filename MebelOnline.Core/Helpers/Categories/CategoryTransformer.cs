using MebelOnline.Core.Models.Categories;

namespace MebelOnline.Core.Helpers.Categories
{
    public static class CategoryTransformer
    {
        public static IList<CategorySidebarRevertedModel> ConvertHierarchy(IList<CategoryModel> categories)
        {
            var roots = new Dictionary<int, CategorySidebarRevertedModel>();

            foreach (var firstLevel in categories)
            {
                var parent = firstLevel.ParentCategory;
                var grandparent = parent?.ParentCategory;

                if (grandparent == null)
                {
                    // Handle second level structure
                    if (!roots.TryGetValue(parent.Id, out var root))
                    {
                        root = new CategorySidebarRevertedModel
                        {
                            Id = parent.Id,
                            Name = parent.Name,
                            ChildrenCategories = new List<CategorySidebarRevertedModel>()
                        };
                        roots[parent.Id] = root;
                    }

                    root.ChildrenCategories.Add(new CategorySidebarRevertedModel
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
                        root = new CategorySidebarRevertedModel
                        {
                            Id = grandparent.Id,
                            Name = grandparent.Name,
                            ChildrenCategories = new List<CategorySidebarRevertedModel>()
                        };
                        roots[grandparent.Id] = root;
                    }

                    var secondLevel = root.ChildrenCategories.FirstOrDefault(x => x.Id == parent.Id);
                    if (secondLevel == null)
                    {
                        secondLevel = new CategorySidebarRevertedModel
                        {
                            Id = parent.Id,
                            Name = parent.Name,
                            ChildrenCategories = new List<CategorySidebarRevertedModel>()
                        };
                        root.ChildrenCategories.Add(secondLevel);
                    }

                    secondLevel.ChildrenCategories.Add(new CategorySidebarRevertedModel
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
