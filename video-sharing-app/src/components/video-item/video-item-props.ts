import { GetVideosResponse } from "shared/models/responses/get-videos-response";

export interface VideoItemProps {
  item: GetVideosResponse;
  onItemReaction: (values: any) => void;
}
