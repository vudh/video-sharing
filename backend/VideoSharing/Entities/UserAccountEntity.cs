using Azure;
using Azure.Data.Tables;

namespace VideoSharing.Entities
{
    public class UserAccountEntity : ITableEntity
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }
}
