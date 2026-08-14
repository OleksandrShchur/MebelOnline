using System.Text;
using Microsoft.Data.SqlClient;

namespace MebelOnline.Server.Tests.Infrastructure
{
    public static class SqlScriptRunner
    {
        public static async Task ApplyUpScriptsAsync(string connectionString, CancellationToken cancellationToken = default)
        {
            var upDir = Path.Combine(AppContext.BaseDirectory, "Scripts", "Up");
            var files = Directory.GetFiles(upDir, "*.sql")
                .OrderBy(f => Path.GetFileName(f), StringComparer.OrdinalIgnoreCase)
                .ToArray();

            if (files.Length == 0)
            {
                throw new DirectoryNotFoundException($"No SQL Up scripts found in {upDir}");
            }

            await using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync(cancellationToken);

            foreach (var file in files)
            {
                var sql = await File.ReadAllTextAsync(file, Encoding.UTF8, cancellationToken);
                await using var command = connection.CreateCommand();
                command.CommandText = sql;
                command.CommandTimeout = 60;
                await command.ExecuteNonQueryAsync(cancellationToken);
            }
        }
    }
}
