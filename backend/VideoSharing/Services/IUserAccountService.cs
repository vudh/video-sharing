using VideoSharing.Entities;

namespace VideoSharing.Services
{
    public interface IUserAccountService
    {
        Task<UserAccountEntity> GetEntityAsync(string id);
        Task<UserAccountEntity> UpsertEntityAsync(UserAccountEntity entity);
    }
}
