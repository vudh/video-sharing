using Azure.Data.Tables;
using VideoSharing.Entities;

namespace VideoSharing.Services
{
    public class ItemReactionService : IItemReactionService
    {
        private const string TableName = "ItemReactions";
        private readonly IConfiguration _configuration;
        public ItemReactionService(IConfiguration configuration)
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

        public async Task<ItemReactionEntity> UpsertEntityAsync(ItemReactionEntity entity)
        {
            var tableClient = await GetTableClient();
            await tableClient.UpsertEntityAsync(entity);
            return entity;
        }

        public async Task<List<ItemReactionEntity>> GetEntitiesAsync(string itemId)
        {
            var result = new List<ItemReactionEntity>();
            var tableClient = await GetTableClient();
            var items = tableClient.QueryAsync<ItemReactionEntity>(x => x.ItemId == itemId);
            await foreach (var item in items)
            {
                result.Add(item);
            }
            return result;
        }
    }
}
