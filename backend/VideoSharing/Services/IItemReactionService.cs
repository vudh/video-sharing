using VideoSharing.Entities;

namespace VideoSharing.Services
{
    public interface IItemReactionService
    {
        Task<List<ItemReactionEntity>> GetEntitiesAsync(string itemId);
        Task<ItemReactionEntity> UpsertEntityAsync(ItemReactionEntity entity);
    }
}
