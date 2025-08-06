using MebelOnline.Core.Enums;

namespace MebelOnline.Core.Models.Common
{
    public class SearchParamsModel
    {
        public string? SearchString { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public SortBy SortBy { get; set; } = SortBy.Ascending;
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string? BrandName { get; set; }
        public string? Material { get; set; }
    }
}
