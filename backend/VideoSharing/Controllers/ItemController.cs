using Microsoft.AspNetCore.Mvc;
using VideoSharing.Entities;
using VideoSharing.Models.Responses;
using VideoSharing.Services;

namespace VideoSharing.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _storageService;

        private readonly ILogger<ItemController> _logger;

        public ItemController(ILogger<ItemController> logger, IItemService storageService)
        {
            _logger = logger;
            _storageService = storageService;
        }

        [HttpGet(Name = "GetItems")]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await _storageService.GetEntitiesAsync());
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ItemEntity entity)
        {
            var result = new ShareVideoResponse();
            entity.PartitionKey = entity.SharedBy;
            string Id = Guid.NewGuid().ToString();
            entity.Id = Id;
            entity.RowKey = Id;

            try 
            {
                var createdEntity = await _storageService.UpsertEntityAsync(entity);
                result.Success = true;
                result.ItemId = entity.Id;
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            
            return Ok(result);
        }
    }
}