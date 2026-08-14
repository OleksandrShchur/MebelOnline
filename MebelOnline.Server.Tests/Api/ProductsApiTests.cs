using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using MebelOnline.Server.Tests.Infrastructure;

namespace MebelOnline.Server.Tests.Api
{
    [Collection("CatalogApi")]
    public class ProductsApiTests
    {
        private readonly CatalogApiFixture _fixture;
        private static readonly JsonSerializerOptions JsonOptions = new() { PropertyNameCaseInsensitive = true };

        public ProductsApiTests(CatalogApiFixture fixture)
        {
            _fixture = fixture;
        }

        [LocalDbFact]
        public async Task Latest_ReturnsNewestIdsFirst_NotEntities()
        {
            var response = await _fixture.Client.GetAsync("/api/products/latest");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var items = doc.RootElement.EnumerateArray().ToList();

            Assert.Equal(12, items.Count);
            Assert.Equal(32, items[0].GetProperty("id").GetInt32());
            Assert.True(items[0].GetProperty("id").GetInt32() > items[^1].GetProperty("id").GetInt32());
            Assert.True(items[0].TryGetProperty("title", out _));
            Assert.True(items[0].TryGetProperty("imageUrl", out _));
            Assert.False(items[0].TryGetProperty("options", out _));
            Assert.False(items[0].TryGetProperty("passwordHash", out _));
        }

        [LocalDbFact]
        public async Task Latest_ProductWithoutImages_DoesNotFail()
        {
            var response = await _fixture.Client.GetAsync("/api/products/latest");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var withoutImage = doc.RootElement.EnumerateArray().First(e => e.GetProperty("id").GetInt32() == 32);
            Assert.Equal(JsonValueKind.Null, withoutImage.GetProperty("imageUrl").ValueKind);
        }

        [LocalDbFact]
        public async Task GetById_ReturnsDetailsWithOptionsAttributesNoteCategory()
        {
            var response = await _fixture.Client.GetAsync("/api/products/25");
            response.EnsureSuccessStatusCode();

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var root = doc.RootElement;

            Assert.Equal("Диван прямий «Орлеан»", root.GetProperty("title").GetString());
            Assert.False(string.IsNullOrWhiteSpace(root.GetProperty("note").GetString()));
            Assert.Equal("Blest", root.GetProperty("brand").GetProperty("name").GetString());
            Assert.Equal(30, root.GetProperty("category").GetProperty("id").GetInt32());
            Assert.True(root.GetProperty("frontOptions").GetArrayLength() >= 1);
            Assert.True(root.GetProperty("frameOptions").GetArrayLength() >= 1);
            Assert.True(root.GetProperty("images").GetArrayLength() > 1);
            Assert.Contains(root.GetProperty("attributes").EnumerateArray(), a => a.GetProperty("key").GetString() == "Матеріал");
            Assert.False(root.TryGetProperty("passwordHash", out _));
        }

        [LocalDbFact]
        public async Task GetById_Missing_Returns404ProblemDetails()
        {
            var response = await _fixture.Client.GetAsync("/api/products/99999");

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            Assert.Contains("application/problem+json", response.Content.Headers.ContentType?.MediaType + response.Content.Headers.ContentType?.ToString());

            var problem = await response.Content.ReadFromJsonAsync<JsonElement>(JsonOptions);
            Assert.Equal(404, problem.GetProperty("status").GetInt32());
            Assert.False(problem.TryGetProperty("id", out _));
        }

        [LocalDbFact]
        public async Task GetById_Zero_Returns400()
        {
            var response = await _fixture.Client.GetAsync("/api/products/0");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
