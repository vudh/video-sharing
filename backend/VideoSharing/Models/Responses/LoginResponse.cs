using VideoSharing.Entities;

namespace VideoSharing.Models.Responses
{
    public class LoginResponse: BaseResponse
    {
        public string UserName { get; set; }
    }
}
