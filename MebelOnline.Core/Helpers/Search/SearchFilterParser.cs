namespace MebelOnline.Core.Helpers.Search
{
    public static class SearchFilterParser
    {
        public static IList<string> NormalizeList(IEnumerable<string>? values)
        {
            if (values == null)
            {
                return Array.Empty<string>();
            }

            return values
                .SelectMany(Split)
                .Select(v => v.Trim())
                .Where(v => v.Length > 0)
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToList();
        }

        private static IEnumerable<string> Split(string? value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return Array.Empty<string>();
            }

            return value.Contains(',')
                ? value.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                : new[] { value };
        }
    }
}
