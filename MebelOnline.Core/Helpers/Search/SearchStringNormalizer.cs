namespace MebelOnline.Core.Helpers.Search
{
    public static class SearchStringNormalizer
    {
        public static string? Normalize(string? value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return null;
            }

            var trimmed = value.Trim();
            return trimmed.Length == 0 ? null : trimmed;
        }
    }
}
