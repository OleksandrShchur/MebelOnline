using System.ComponentModel.DataAnnotations;
using MebelOnline.Core.Helpers.Search;
using MebelOnline.Core.Models.Search;

namespace MebelOnline.Core.Tests.Search
{
    public class SearchStringNormalizerTests
    {
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        [InlineData("\t")]
        public void Normalize_Whitespace_ReturnsNull(string? value)
        {
            Assert.Null(SearchStringNormalizer.Normalize(value));
        }

        [Fact]
        public void Normalize_TrimsValue()
        {
            Assert.Equal("диван", SearchStringNormalizer.Normalize("  диван  "));
        }
    }

    public class SearchFilterParserTests
    {
        [Fact]
        public void NormalizeList_Null_ReturnsEmpty()
        {
            Assert.Empty(SearchFilterParser.NormalizeList(null));
        }

        [Fact]
        public void NormalizeList_SplitsCommaSeparatedAndDropsBlanks()
        {
            var result = SearchFilterParser.NormalizeList(new[] { "Велюр, ДСП", "  ", "Дуб" });

            Assert.Equal(3, result.Count);
            Assert.Contains("Велюр", result);
            Assert.Contains("ДСП", result);
            Assert.Contains("Дуб", result);
        }

        [Fact]
        public void NormalizeList_DedupesCaseInsensitive()
        {
            var result = SearchFilterParser.NormalizeList(new[] { "Blest", "blest" });
            Assert.Single(result);
        }
    }

    public class SearchParamsValidationTests
    {
        [Fact]
        public void Defaults_AreZeroBasedPageAndSize12()
        {
            var model = new SearchParamsModel();
            Assert.Equal(0, model.Page);
            Assert.Equal(12, model.PageSize);
        }

        [Fact]
        public void PageNegative_IsInvalid()
        {
            var errors = Validate(new SearchParamsModel { Page = -1 });
            Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SearchParamsModel.Page)));
        }

        [Theory]
        [InlineData(0)]
        [InlineData(49)]
        [InlineData(500)]
        public void PageSizeOutOfRange_IsInvalid(int pageSize)
        {
            var errors = Validate(new SearchParamsModel { PageSize = pageSize });
            Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SearchParamsModel.PageSize)));
        }

        [Fact]
        public void SearchStringOver100_IsInvalid()
        {
            var errors = Validate(new SearchParamsModel { SearchString = new string('а', 101) });
            Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SearchParamsModel.SearchString)));
        }

        [Fact]
        public void SearchString100_IsValid()
        {
            var errors = Validate(new SearchParamsModel { SearchString = new string('а', 100) });
            Assert.DoesNotContain(errors, e => e.MemberNames.Contains(nameof(SearchParamsModel.SearchString)));
        }

        [Fact]
        public void CategoryIdZero_IsInvalid()
        {
            var errors = Validate(new SearchParamsModel { CategoryId = 0 });
            Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SearchParamsModel.CategoryId)));
        }

        [Fact]
        public void ValidPaging_Passes()
        {
            var errors = Validate(new SearchParamsModel { Page = 0, PageSize = 12, CategoryId = 10 });
            Assert.Empty(errors);
        }

        private static List<ValidationResult> Validate(SearchParamsModel model)
        {
            var results = new List<ValidationResult>();
            Validator.TryValidateObject(model, new ValidationContext(model), results, validateAllProperties: true);
            return results;
        }
    }
}
