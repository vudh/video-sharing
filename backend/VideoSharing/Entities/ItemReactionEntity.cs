using Azure;
using Azure.Data.Tables;

namespace VideoSharing.Entities
{
    public class ItemReactionEntity : ITableEntity
    {
        public string ItemId { get; set; }
        public string UserId { get; set; }
        public bool IsLiked { get; set; }
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }
}
