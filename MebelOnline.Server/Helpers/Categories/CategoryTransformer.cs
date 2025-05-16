using MebelOnline.Server.Models.Categories;

namespace MebelOnline.Server.Helpers.Categories
{
    public static class CategoryTransformer
    {
        public static IList<CategorySidebarRevertedModel> ConvertHierarchy(IList<CategorySidebarModel> categories)
        {
            var roots = new List<CategorySidebarRevertedModel>();

            foreach (var firstLevel in categories)
            {
                if (firstLevel.ParentCategory.ParentCategory == null) // second level is max
                {
                    var root = roots.Where(x => x.Id == firstLevel.ParentCategory.Id)
                        .FirstOrDefault();

                    if (root != null) // root already exists
                    {
                        root.ChildrenCategories.Add(new CategorySidebarRevertedModel
                        {
                            Id = firstLevel.Id,
                            Name = firstLevel.Name,
                            ChildrenCategories = null
                        });
                    }
                    else // add new root element
                    {
                        roots.Add(new CategorySidebarRevertedModel
                        {
                            Id = firstLevel.ParentCategory.Id,
                            Name = firstLevel.ParentCategory.Name,
                            ChildrenCategories = new List<CategorySidebarRevertedModel>
                            {
                                new CategorySidebarRevertedModel
                                {
                                    Id = firstLevel.Id,
                                    Name = firstLevel.Name,
                                    ChildrenCategories = null
                                }
                            }
                        });
                    }
                }
                else // third level is max
                {
                    var root = roots.FirstOrDefault(x => x.Id == firstLevel.ParentCategory.ParentCategory.Id);

                    if (root != null) // root exists
                    {
                        var secondLevel = root.ChildrenCategories
                            .FirstOrDefault(x => x.Id == firstLevel.ParentCategory.Id);

                        if (secondLevel != null)
                        {
                            secondLevel.ChildrenCategories.Add(new CategorySidebarRevertedModel
                            {
                                Id = firstLevel.Id,
                                Name = firstLevel.Name,
                                ChildrenCategories = null
                            });

                            var index = root.ChildrenCategories.IndexOf(secondLevel);

                            root.ChildrenCategories[index] = secondLevel;
                        }
                        else
                        {
                            secondLevel = new CategorySidebarRevertedModel
                            {
                                Id = firstLevel.ParentCategory.Id,
                                Name = firstLevel.ParentCategory.Name,
                                ChildrenCategories = new List<CategorySidebarRevertedModel>
                                {
                                    new CategorySidebarRevertedModel
                                    {
                                        Id = firstLevel.Id,
                                        Name = firstLevel.Name,
                                        ChildrenCategories = null
                                    }
                                }
                            };

                            root.ChildrenCategories.Add(secondLevel);
                        }
                    }
                    else
                    {
                        roots.Add(new CategorySidebarRevertedModel
                        {
                            Id = firstLevel.ParentCategory.ParentCategory.Id,
                            Name = firstLevel.ParentCategory.ParentCategory.Name,
                            ChildrenCategories = new List<CategorySidebarRevertedModel>
                            {
                                new CategorySidebarRevertedModel
                                {
                                    Id = firstLevel.ParentCategory.Id,
                                    Name = firstLevel.ParentCategory.Name,
                                    ChildrenCategories = new List<CategorySidebarRevertedModel>
                                    {
                                        new CategorySidebarRevertedModel
                                        {
                                            Id = firstLevel.Id,
                                            Name = firstLevel.Name,
                                            ChildrenCategories = null
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            }

            return roots;
        }
    }
}
