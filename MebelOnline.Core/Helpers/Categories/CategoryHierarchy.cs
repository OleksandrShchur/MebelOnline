namespace MebelOnline.Core.Helpers.Categories
{
    public static class CategoryHierarchy
    {
        public static IReadOnlyList<int> GetSelfAndDescendantIds(
            int categoryId,
            IReadOnlyList<(int Id, int? ParentId)> categories)
        {
            var ids = new HashSet<int> { categoryId };
            var added = true;

            while (added)
            {
                added = false;
                foreach (var (id, parentId) in categories)
                {
                    if (parentId.HasValue && ids.Contains(parentId.Value) && ids.Add(id))
                    {
                        added = true;
                    }
                }
            }

            return ids.OrderBy(id => id).ToList();
        }
    }
}
