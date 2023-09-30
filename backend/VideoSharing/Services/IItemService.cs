using VideoSharing.Entities;
using VideoSharing.Models;

namespace VideoSharing.Services
{
    public interface IItemService
    {
        Task<List<ItemModel>> GetEntitiesAsync();
        Task<ItemEntity> UpsertEntityAsync(ItemEntity entity);
    }
}
