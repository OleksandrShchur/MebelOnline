using Microsoft.Data.SqlClient;
using MebelOnline.Server.Tests.Infrastructure;

namespace MebelOnline.Server.Tests.Api
{
    [Collection("CatalogApi")]
    public class SchemaConstraintTests
    {
        private readonly CatalogApiFixture _fixture;

        public SchemaConstraintTests(CatalogApiFixture fixture)
        {
            _fixture = fixture;
        }

        [LocalDbFact]
        public async Task ProductAttributeValues_IdIsIdentity()
        {
            await using var connection = new SqlConnection(_fixture.ConnectionString);
            await connection.OpenAsync();
            await using var command = connection.CreateCommand();
            command.CommandText = @"
SELECT COUNT(*)
FROM sys.identity_columns
WHERE object_id = OBJECT_ID(N'dbo.ProductAttributeValues') AND name = N'Id'";
            var count = (int)(await command.ExecuteScalarAsync() ?? 0);
            Assert.Equal(1, count);
        }

        [LocalDbFact]
        public async Task Products_CategoryIdForeignKey_RejectsUnknownCategory()
        {
            await using var connection = new SqlConnection(_fixture.ConnectionString);
            await connection.OpenAsync();
            await using var command = connection.CreateCommand();
            command.CommandText = @"
INSERT INTO dbo.Products (Title, Description, Price, CategoryId)
VALUES (N'Invalid FK product', N'test', 1, 99999);";

            var ex = await Assert.ThrowsAsync<SqlException>(() => command.ExecuteNonQueryAsync());
            Assert.Contains("FK_Products_Categories", ex.Message);
        }

        [LocalDbFact]
        public async Task ProductOptions_HaveBothMaterialAndOptionType()
        {
            await using var connection = new SqlConnection(_fixture.ConnectionString);
            await connection.OpenAsync();
            await using var command = connection.CreateCommand();
            command.CommandText = @"
SELECT COL_LENGTH('dbo.ProductOptions', 'Material'), COL_LENGTH('dbo.ProductOptions', 'OptionType'), COL_LENGTH('dbo.Products', 'Note');";
            await using var reader = await command.ExecuteReaderAsync();
            Assert.True(await reader.ReadAsync());
            Assert.False(reader.IsDBNull(0));
            Assert.False(reader.IsDBNull(1));
            Assert.False(reader.IsDBNull(2));
        }

        [LocalDbFact]
        public async Task UsersTable_ExistsAndIsEmpty()
        {
            await using var connection = new SqlConnection(_fixture.ConnectionString);
            await connection.OpenAsync();
            await using var command = connection.CreateCommand();
            command.CommandText = "SELECT COUNT(*) FROM dbo.Users";
            var count = (int)(await command.ExecuteScalarAsync() ?? -1);
            Assert.Equal(0, count);
        }
    }
}
