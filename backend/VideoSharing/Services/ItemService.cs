using Azure.Data.Tables;
using VideoSharing.Entities;
using VideoSharing.Models;

namespace VideoSharing.Services
{
    public class ItemService : IItemService
    {
        private const string TableName = "Items";
        private readonly IConfiguration _configuration;
        private readonly IItemReactionService _itemReactionService;
        public ItemService(IConfiguration configuration, IItemReactionService itemReactionService)
        {
            _configuration = configuration;
            _itemReactionService = itemReactionService;
        }

        private async Task<TableClient> GetTableClient()
        {
            var serviceClient = new TableServiceClient(_configuration["StorageConnectionString"]);
            var tableClient = serviceClient.GetTableClient(TableName);
            await tableClient.CreateIfNotExistsAsync();
            return tableClient;
        }

        public async Task<ItemEntity> UpsertEntityAsync(ItemEntity entity)
        {
            var tableClient = await GetTableClient();
            await tableClient.UpsertEntityAsync(entity);
            return entity;
        }

        public async Task<List<ItemModel>> GetEntitiesAsync()
        {
            var result = new List<ItemModel>();
            var tableClient = await GetTableClient();
            var items = tableClient.QueryAsync<ItemEntity>();
            await foreach (var item in items)
            {
                var model = new ItemModel();
                model.Title = item.Title;
                model.VideoUrl = item.VideoUrl;
                model.Description = item.Description;
                model.Id = item.Id;
                model.SharedBy = item.SharedBy;

                if (!string.IsNullOrEmpty(item.Id))
                {
                    var reactions = await _itemReactionService.GetEntitiesAsync(item.Id);
                    model.ItemReactions = reactions;
                }                

                result.Add(model);
            }
            return result;
        }
    }
}
