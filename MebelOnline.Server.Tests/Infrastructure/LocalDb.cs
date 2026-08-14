using Microsoft.Data.SqlClient;

namespace MebelOnline.Server.Tests.Infrastructure
{
    public static class LocalDb
    {
        public const string MasterConnectionString =
            @"Server=(localdb)\MSSQLLocalDB;Database=master;Trusted_Connection=True;TrustServerCertificate=True;Connect Timeout=5";

        public const string TestDatabaseName = "MebelOnline_PhaseBC_Test";

        public static string TestConnectionString =>
            $@"Server=(localdb)\MSSQLLocalDB;Database={TestDatabaseName};Trusted_Connection=True;TrustServerCertificate=True;Connect Timeout=5";

        public static bool IsAvailable { get; } = Probe();

        private static bool Probe()
        {
            try
            {
                using var connection = new SqlConnection(MasterConnectionString);
                connection.Open();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
