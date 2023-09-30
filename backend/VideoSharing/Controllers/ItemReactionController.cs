using Microsoft.AspNetCore.Mvc;
using VideoSharing.Entities;
using VideoSharing.Models.Responses;
using VideoSharing.Services;

namespace VideoSharing.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemReactionController : ControllerBase
    {
        private readonly IItemReactionService _storageService;

        private readonly ILogger<ItemController> _logger;

        public ItemReactionController(ILogger<ItemController> logger, IItemReactionService storageService)
        {
            _logger = logger;
            _storageService = storageService;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ItemReactionEntity entity)
        {
            var result = new BaseResponse();
            entity.PartitionKey = entity.UserId;
            string Id = Guid.NewGuid().ToString();
            entity.RowKey = Id;

            try 
            {
                var createdEntity = await _storageService.UpsertEntityAsync(entity);
                result.Success = true;
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