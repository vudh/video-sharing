import { userBusiness } from "business/user-business";
import { videoSharingBusiness } from "business/video-sharing-business";
import { Instance, cast, flow, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { LoggingLevel } from "shared/enums/logging-level";
import { LoggingHelper } from "shared/helpers/logging-helper";
import { GetVideosResponse } from "shared/models/responses/get-videos-response";
import { LoginResponse } from "shared/models/responses/login-response";
import { ShareVideoResponse } from "shared/models/responses/share-video-response";

const RootModel = types
  .model({
    userName: types.maybeNull(types.string),
    userId: types.maybeNull(types.string),
    items: types.maybeNull(types.frozen([])),
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
    login: flow(function* (email: string, password: string) {
      try {
        self.setUserId("");

        const result: LoginResponse = yield userBusiness.login(email, password);
        if (result?.Success) {
          self.setUserId(email);
          self.setUserName(result?.UserName || "");
        }
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
        const result: GetVideosResponse[] =
          yield videoSharingBusiness.getVideos();
        self.setItems(result);
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
