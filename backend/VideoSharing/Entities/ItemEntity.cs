using Azure;
using Azure.Data.Tables;

namespace VideoSharing.Entities
{
    public class ItemEntity : ITableEntity
    {
        public string? Id { get; set; }
        public string SharedBy { get; set; }
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public string Description { get; set; }
        public string? PartitionKey { get; set; }
        public string? RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }
}
