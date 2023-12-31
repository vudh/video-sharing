using Microsoft.AspNetCore.Mvc;
using VideoSharing.Entities;
using VideoSharing.Models;
using VideoSharing.Models.Responses;
using VideoSharing.Services;
using VideoSharing.Utils;

namespace VideoSharing.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserAccountController : ControllerBase
    {
        private readonly IUserAccountService _storageService;

        private readonly ILogger<UserAccountController> _logger;

        public UserAccountController(ILogger<UserAccountController> logger, IUserAccountService storageService)
        {
            _logger = logger;
            _storageService = storageService;
        }

        [HttpGet(Name = "Login")]
        public async Task<IActionResult> LoginAsync([FromQuery] string email, [FromQuery] string password)
        {
            var result = new LoginResponse();
            result.Success = true;

            var user = await _storageService.GetEntityAsync(email);
            if(user == null)
            {
                result.Message = "User not found!";
                result.Success = false;
            }
            else
            {
                string hash = PasswordHelper.HashPassword(password);
                if (user.Password != hash)
                {
                    result.Success = false;
                    result.Message = "Password doesn't match!";
                }
                result.UserName = user.Name;
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] UserAccountEntity entity)
        {
            var result = new RegisterUserResponse();

            entity.Id = entity.Id.ToLower();
            entity.Password = PasswordHelper.HashPassword(entity.Password);
            entity.PartitionKey = entity.Name;
            entity.RowKey = entity.Id;
            
            try
            {
                var found = await _storageService.GetEntityAsync(entity.Id);
                if(found == null)
                {
                    var createdEntity = await _storageService.UpsertEntityAsync(entity);
                    result.Success = true;
                    result.UserId = entity.Id;
                }
                else
                {
                    result.Success = false;
                    result.Message = $"User account has been existed. Please try again!";
                }
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }
    }
}