import { httpService } from "services/http-service";
import { UrlConstant } from "shared/constants/url-constants";
import { LoginResponse } from "shared/models/responses/login-response";
import { RegisterUserResponse } from "shared/models/responses/register-user-response";

class UserBusiness {
  public login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    return httpService.get(
      `${UrlConstant.LOGIN}?email=${email}&password=${password}`
    );
  };

  public registerNewUser = async (
    email: string,
    name: string,
    password: string
  ): Promise<RegisterUserResponse> => {
    const req = {
      Id: email,
      Name: name,
      Password: password,
    };
    return httpService.post(`${UrlConstant.CREATE_USER}`, req);
  };
}

export const userBusiness = new UserBusiness();
