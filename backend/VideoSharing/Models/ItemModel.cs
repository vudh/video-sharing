using VideoSharing.Entities;

namespace VideoSharing.Models
{
    public class ItemModel
    {
        public string? Id { get; set; }
        public string SharedBy { get; set; }
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public string Description { get; set; }
        public List<ItemReactionEntity> ItemReactions { get; set; }
    }
}
