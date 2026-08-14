using System.ComponentModel.DataAnnotations;
using MebelOnline.Core.Enums;
using MebelOnline.Core.Helpers.Search;

namespace MebelOnline.Core.Models.Search
{
    public class SearchParamsModel
    {
        [MaxLength(SearchLimits.MaxSearchLength)]
        public string? SearchString { get; set; }

        [Range(0, int.MaxValue)]
        public int Page { get; set; } = SearchLimits.DefaultPage;

        [Range(1, SearchLimits.MaxPageSize)]
        public int PageSize { get; set; } = SearchLimits.DefaultPageSize;

        public SortBy SortBy { get; set; } = SortBy.Ascending;

        public decimal? MinPrice { get; set; }

        public decimal? MaxPrice { get; set; }

        public List<string>? SelectedBrands { get; set; }

        public List<string>? SelectedMaterials { get; set; }

        [Range(1, int.MaxValue)]
        public int? CategoryId { get; set; }
    }
}
