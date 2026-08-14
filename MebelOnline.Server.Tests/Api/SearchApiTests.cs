using System.Net;
using System.Text.Json;
using MebelOnline.Server.Tests.Infrastructure;

namespace MebelOnline.Server.Tests.Api
{
    [Collection("CatalogApi")]
    public class SearchApiTests
    {
        private readonly CatalogApiFixture _fixture;

        public SearchApiTests(CatalogApiFixture fixture)
        {
            _fixture = fixture;
        }

        [LocalDbFact]
        public async Task DefaultPaging_IsPage0Size12()
        {
            var response = await _fixture.Client.GetAsync("/api/search");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var root = doc.RootElement;

            Assert.Equal(0, root.GetProperty("page").GetInt32());
            Assert.Equal(12, root.GetProperty("pageSize").GetInt32());
            Assert.Equal(32, root.GetProperty("totalCount").GetInt32());
            Assert.Equal(12, root.GetProperty("items").GetArrayLength());
            Assert.False(root.GetProperty("items")[0].TryGetProperty("images", out _));
        }

        [LocalDbFact]
        public async Task Pagination_SecondPage_IsStable()
        {
            var page0 = await GetIds("/api/search?page=0&pageSize=12&sortBy=Name");
            var page1 = await GetIds("/api/search?page=1&pageSize=12&sortBy=Name");
            var page2 = await GetIds("/api/search?page=2&pageSize=12&sortBy=Name");

            Assert.Equal(12, page0.Count);
            Assert.Equal(12, page1.Count);
            Assert.Equal(8, page2.Count);
            Assert.Empty(page0.Intersect(page1));
            Assert.Empty(page1.Intersect(page2));
        }

        [LocalDbFact]
        public async Task Sort_PriceAscending_UsesIdTieBreak()
        {
            var response = await _fixture.Client.GetAsync("/api/search?sortBy=Ascending&page=0&pageSize=48");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var items = doc.RootElement.GetProperty("items").EnumerateArray().ToList();

            for (var i = 1; i < items.Count; i++)
            {
                var prevPrice = items[i - 1].GetProperty("price").GetDecimal();
                var price = items[i].GetProperty("price").GetDecimal();
                Assert.True(prevPrice <= price);
                if (prevPrice == price)
                {
                    Assert.True(items[i - 1].GetProperty("id").GetInt32() < items[i].GetProperty("id").GetInt32());
                }
            }

            var nineNine = items.Where(i => i.GetProperty("price").GetDecimal() == 9999m).Select(i => i.GetProperty("id").GetInt32()).ToList();
            Assert.Equal(new[] { 10, 15, 32 }, nineNine);
        }

        [LocalDbFact]
        public async Task CategoryFilter_IncludesDescendants()
        {
            var sofas = await GetIds("/api/search?categoryId=10&page=0&pageSize=48");
            var straight = await GetIds("/api/search?categoryId=30&page=0&pageSize=48");
            var niche = await GetIds("/api/search?categoryId=34&page=0&pageSize=48");

            Assert.Equal(new[] { 25, 26, 27, 28, 29 }, sofas.OrderBy(id => id));
            Assert.Equal(new[] { 25, 26, 27 }, straight.OrderBy(id => id));
            Assert.Equal(new[] { 27 }, niche);
            Assert.DoesNotContain(1, sofas);
        }

        [LocalDbFact]
        public async Task Search_ByTitleBrandOptionAttribute()
        {
            Assert.Contains(25, await GetIds($"/api/search?searchString={Uri.EscapeDataString("Орлеан")}&pageSize=48"));
            Assert.Contains(25, await GetIds($"/api/search?searchString={Uri.EscapeDataString("Blest")}&pageSize=48"));
            Assert.Contains(25, await GetIds($"/api/search?searchString={Uri.EscapeDataString("Велюр")}&pageSize=48"));
            Assert.Contains(1, await GetIds($"/api/search?searchString={Uri.EscapeDataString("графіт")}&pageSize=48"));
        }

        [LocalDbFact]
        public async Task Search_Whitespace_ReturnsAll()
        {
            var response = await _fixture.Client.GetAsync("/api/search?searchString=%20%20&pageSize=48");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            Assert.Equal(32, doc.RootElement.GetProperty("totalCount").GetInt32());
        }

        [LocalDbFact]
        public async Task Search_NoResults()
        {
            var response = await _fixture.Client.GetAsync("/api/search?searchString=zzzznonexistent");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            Assert.Equal(0, doc.RootElement.GetProperty("totalCount").GetInt32());
            Assert.Equal(0, doc.RootElement.GetProperty("items").GetArrayLength());
        }

        [LocalDbFact]
        public async Task MaterialFilter_UsesUkrainianAttributeName()
        {
            var ids = await GetIds($"/api/search?selectedMaterials={Uri.EscapeDataString("Велюр")}&pageSize=48");
            Assert.Contains(25, ids);
            Assert.Contains(26, ids);
            Assert.DoesNotContain(1, ids);
        }

        [LocalDbTheory]
        [InlineData("/api/search?page=-1")]
        [InlineData("/api/search?pageSize=0")]
        [InlineData("/api/search?pageSize=49")]
        [InlineData("/api/search?pageSize=500")]
        [InlineData("/api/search?categoryId=0")]
        public async Task InvalidPaging_Returns400ProblemDetails(string url)
        {
            var response = await _fixture.Client.GetAsync(url);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            Assert.Contains("problem+json", response.Content.Headers.ContentType?.ToString());
        }

        [LocalDbFact]
        public async Task SearchStringTooLong_Returns400()
        {
            var value = new string('а', 101);
            var response = await _fixture.Client.GetAsync($"/api/search?searchString={Uri.EscapeDataString(value)}");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [LocalDbFact]
        public async Task UsersAreNotExposed()
        {
            var json = await _fixture.Client.GetStringAsync("/api/search?pageSize=12");
            Assert.DoesNotContain("passwordHash", json, StringComparison.OrdinalIgnoreCase);
            Assert.DoesNotContain("/api/users", json, StringComparison.OrdinalIgnoreCase);
        }

        private async Task<List<int>> GetIds(string url)
        {
            var response = await _fixture.Client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            return doc.RootElement.GetProperty("items").EnumerateArray().Select(e => e.GetProperty("id").GetInt32()).ToList();
        }
    }
}
