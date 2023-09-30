using Azure.Data.Tables;
using VideoSharing.Entities;

namespace VideoSharing.Services
{
    public class UserAccountService:IUserAccountService
    {
        private const string TableName = "Users";
        private readonly IConfiguration _configuration;
        public UserAccountService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private async Task<TableClient> GetTableClient()
        {
            var serviceClient = new TableServiceClient(_configuration["StorageConnectionString"]);
            var tableClient = serviceClient.GetTableClient(TableName);
            await tableClient.CreateIfNotExistsAsync();
            return tableClient;
        }

        public async Task<UserAccountEntity> UpsertEntityAsync(UserAccountEntity entity)
        {
            var tableClient = await GetTableClient();
            await tableClient.UpsertEntityAsync(entity);
            return entity;
        }

        public async Task<UserAccountEntity> GetEntityAsync(string id)
        {
            var tableClient = await GetTableClient();
            var item = tableClient.Query<UserAccountEntity>(x => x.Id == id).FirstOrDefault();
            return item;
        }
    }
}
