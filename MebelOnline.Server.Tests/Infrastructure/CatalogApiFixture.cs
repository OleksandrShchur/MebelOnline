using Microsoft.Data.SqlClient;

namespace MebelOnline.Server.Tests.Infrastructure
{
    public sealed class CatalogApiFixture : IAsyncLifetime
    {
        public CatalogWebApplicationFactory Factory { get; private set; } = null!;
        public HttpClient Client { get; private set; } = null!;
        public string ConnectionString => LocalDb.TestConnectionString;

        public async Task InitializeAsync()
        {
            if (!LocalDb.IsAvailable)
            {
                return;
            }

            await RecreateDatabaseAsync();
            await SqlScriptRunner.ApplyUpScriptsAsync(ConnectionString);

            Factory = new CatalogWebApplicationFactory(ConnectionString);
            Client = Factory.CreateClient();
        }

        public async Task DisposeAsync()
        {
            Client?.Dispose();
            if (Factory != null)
            {
                await Factory.DisposeAsync();
            }
        }

        private static async Task RecreateDatabaseAsync()
        {
            await using var connection = new SqlConnection(LocalDb.MasterConnectionString);
            await connection.OpenAsync();
            await using var command = connection.CreateCommand();
            command.CommandText = $@"
IF DB_ID(N'{LocalDb.TestDatabaseName}') IS NOT NULL
BEGIN
    ALTER DATABASE [{LocalDb.TestDatabaseName}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [{LocalDb.TestDatabaseName}];
END
CREATE DATABASE [{LocalDb.TestDatabaseName}];";
            await command.ExecuteNonQueryAsync();
        }
    }

    [CollectionDefinition("CatalogApi")]
    public class CatalogApiCollection : ICollectionFixture<CatalogApiFixture>
    {
    }

    public sealed class LocalDbFactAttribute : FactAttribute
    {
        public LocalDbFactAttribute()
        {
            if (!LocalDb.IsAvailable)
            {
                Skip = "SQL Server LocalDB is not available.";
            }
        }
    }

    public sealed class LocalDbTheoryAttribute : TheoryAttribute
    {
        public LocalDbTheoryAttribute()
        {
            if (!LocalDb.IsAvailable)
            {
                Skip = "SQL Server LocalDB is not available.";
            }
        }
    }
}
