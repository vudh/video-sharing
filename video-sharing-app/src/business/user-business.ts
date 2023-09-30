import { httpService } from "services/http-service";
import { UrlConstant } from "shared/constants/url-constants";
import { LoginResponse } from "shared/models/responses/login-response";

class UserBusiness {
  public login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    return httpService.get(
      `${UrlConstant.LOGIN}?email=${email}&password=${password}`
    );
  };
}

export const userBusiness = new UserBusiness();
