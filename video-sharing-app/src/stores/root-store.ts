import { userBusiness } from "business/user-business";
import { videoSharingBusiness } from "business/video-sharing-business";
import { Instance, cast, flow, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { AppConstant } from "shared/constants/app-constants";
import { LoggingLevel } from "shared/enums/logging-level";
import { LoggingHelper } from "shared/helpers/logging-helper";
import { BaseResponse } from "shared/models/responses/base-response";
import { GetVideosResponse } from "shared/models/responses/get-videos-response";
import { LoginResponse } from "shared/models/responses/login-response";
import { RegisterUserResponse } from "shared/models/responses/register-user-response";
import { ShareVideoResponse } from "shared/models/responses/share-video-response";

const RootModel = types
  .model({
    isLoading: types.maybeNull(types.boolean),
    userName: types.maybeNull(types.string),
    userId: types.maybeNull(types.string),
    items: types.maybeNull(types.frozen<GetVideosResponse[]>()),
  })
  .actions((self) => ({
    setUserName(val: string) {
      self.userName = val;
    },
    setUserId(val: string) {
      self.userId = val;
    },
    setItems(val: any) {
      self.items = cast(val);
    },
  }))
  .actions((self) => ({
    logout: function () {
      self.isLoading = true;
      // perhaps do some request to server to logout the user but for this demo, just make it simple like this
      self.setUserId("");
      localStorage.removeItem(AppConstant.USER_ID);
      self.isLoading = false;
    },
    login: flow(function* (email: string, password: string) {
      try {
        self.isLoading = true;
        self.setUserId("");

        const result: LoginResponse = yield userBusiness.login(email, password);
        if (result?.Success) {
          localStorage.setItem(AppConstant.USER_ID, email);
          self.setUserId(email);
          self.setUserName(result?.UserName || "");
        }
        self.isLoading = false;
        return result;
      } catch (error) {
        LoggingHelper.writeLog(
          "root-store",
          "login",
          `${error ? JSON.stringify(error) : ""}`,
          LoggingLevel.Error
        );
      }
      return null;
    }),
    getVideos: flow(function* () {
      try {
        self.isLoading = true;

        const result: GetVideosResponse[] =
          yield videoSharingBusiness.getVideos();
        self.setItems(result);

        self.isLoading = false;
      } catch (error) {
        LoggingHelper.writeLog(
          "root-store",
          "getVideos",
          `${error ? JSON.stringify(error) : ""}`,
          LoggingLevel.Error
        );
      }
    }),
    shareVideo: flow(function* (url: string, title: string, desc: string) {
      try {
        const result: ShareVideoResponse =
          yield videoSharingBusiness.shareVideo(url, self.userId!, title, desc);

        return result;
      } catch (error) {
        LoggingHelper.writeLog(
          "root-store",
          "shareVideo",
          `${error ? JSON.stringify(error) : ""}`,
          LoggingLevel.Error
        );
      }
      return null;
    }),
    registerUser: flow(function* (
      email: string,
      name: string,
      password: string
    ) {
      try {
        const result: RegisterUserResponse = yield userBusiness.registerNewUser(
          email,
          name,
          password
        );

        return result;
      } catch (error) {
        LoggingHelper.writeLog(
          "root-store",
          "registerUser",
          `${error ? JSON.stringify(error) : ""}`,
          LoggingLevel.Error
        );
      }
      return null;
    }),
    itemReaction: flow(function* (payload: any) {
      try {
        const result: BaseResponse = yield videoSharingBusiness.itemReaction(
          payload
        );

        return result;
      } catch (error) {
        LoggingHelper.writeLog(
          "root-store",
          "itemReaction",
          `${error ? JSON.stringify(error) : ""}`,
          LoggingLevel.Error
        );
      }
      return null;
    }),
  }));

export const rootStore = RootModel.create();

export type RootInstance = Instance<typeof RootModel>;
export const RootStoreContext = createContext<null | RootInstance>(null);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStores = () => {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
};
