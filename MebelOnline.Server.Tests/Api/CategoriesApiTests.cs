using System.Net;
using System.Text.Json;
using MebelOnline.Server.Tests.Infrastructure;

namespace MebelOnline.Server.Tests.Api
{
    [Collection("CatalogApi")]
    public class CategoriesApiTests
    {
        private readonly CatalogApiFixture _fixture;

        public CategoriesApiTests(CatalogApiFixture fixture)
        {
            _fixture = fixture;
        }

        [LocalDbFact]
        public async Task Catalog_ReturnsLandingTopLevel()
        {
            var response = await _fixture.Client.GetAsync("/api/categories/catalog");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var names = doc.RootElement.EnumerateArray().Select(e => e.GetProperty("name").GetString()).ToList();

            Assert.Contains("Кухні", names);
            Assert.Contains("Дивани", names);
            Assert.Contains("Меблі для ванни", names);
            Assert.DoesNotContain("Electronics", names);
            Assert.DoesNotContain("Fashion", names);
        }

        [LocalDbFact]
        public async Task GetById_ReturnsDtoWithParentAndChildren()
        {
            var response = await _fixture.Client.GetAsync("/api/categories/34");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var root = doc.RootElement;

            Assert.Equal("Прямі дивани з нішею", root.GetProperty("name").GetString());
            Assert.Equal(30, root.GetProperty("parent").GetProperty("id").GetInt32());
            Assert.Equal(10, root.GetProperty("parent").GetProperty("parent").GetProperty("id").GetInt32());
            Assert.Equal(JsonValueKind.Array, root.GetProperty("children").ValueKind);
        }

        [LocalDbFact]
        public async Task GetById_Missing_Returns404ProblemDetails()
        {
            var response = await _fixture.Client.GetAsync("/api/categories/99999");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            Assert.Contains("problem+json", response.Content.Headers.ContentType?.ToString());
        }

        [LocalDbFact]
        public async Task Breadcrumbs_UseCatalogIdUrls()
        {
            var response = await _fixture.Client.GetAsync("/api/categories/breadcrumbs/25");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var urls = doc.RootElement.EnumerateArray().Select(e => e.GetProperty("url").GetString()).ToList();

            Assert.Contains("/", urls);
            Assert.Contains("/catalog", urls);
            Assert.Contains(urls, u => u != null && u.StartsWith("/catalog/", StringComparison.Ordinal));
            Assert.Contains("/product/25", urls);
            Assert.DoesNotContain(urls, u => u != null && u.Contains("/search?"));
        }

        [LocalDbFact]
        public async Task Breadcrumbs_MissingProduct_Returns404()
        {
            var response = await _fixture.Client.GetAsync("/api/categories/breadcrumbs/99999");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [LocalDbFact]
        public async Task Hierarchy_DoesNotExposeUsers()
        {
            var response = await _fixture.Client.GetAsync("/api/categories/all");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            Assert.DoesNotContain("passwordHash", json, StringComparison.OrdinalIgnoreCase);
        }
    }
}
