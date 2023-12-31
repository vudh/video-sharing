import { httpService } from "services/http-service";
import { UrlConstant } from "shared/constants/url-constants";
import { GetVideosResponse } from "shared/models/responses/get-videos-response";
import { ShareVideoResponse } from "shared/models/responses/share-video-response";

class VideoSharingBusiness {
  public getVideos = async (): Promise<GetVideosResponse[]> => {
    const res: GetVideosResponse[] = await httpService.get(
      `${UrlConstant.GET_VIDEOS}`
    );
    res?.forEach((x) => {
      x.NumberOfLikes = x.ItemReactions?.filter((i) => i.IsLiked).length;
      x.NumberOfDislikes = x.ItemReactions?.length - x.NumberOfLikes;
    });
    return res;
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

  public itemReaction = async (payload): Promise<ShareVideoResponse> => {
    return httpService.post(`${UrlConstant.ITEM_REACTION}`, payload);
  };
}

export const videoSharingBusiness = new VideoSharingBusiness();
