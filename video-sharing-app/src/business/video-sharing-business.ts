import { httpService } from "services/http-service";
import { UrlConstant } from "shared/constants/url-constants";
import { GetVideosResponse } from "shared/models/responses/get-videos-response";
import { ShareVideoResponse } from "shared/models/responses/share-video-response";

class VideoSharingBusiness {
  public getVideos = async (): Promise<GetVideosResponse[]> => {
    return httpService.get(`${UrlConstant.GET_VIDEOS}`);
  };

  public shareVideo = async (
    url: string,
    sharedBy: string,
    title: string,
    desc: string
  ): Promise<ShareVideoResponse> => {
    const req = {
      SharedBy: sharedBy,
      Title: title,
      VideoUrl: url,
      Description: desc,
    };
    return httpService.post(`${UrlConstant.SHARE_VIDEO}`, req);
  };
}

export const videoSharingBusiness = new VideoSharingBusiness();
