export interface GetVideosResponse {
  Id?: string;
  Title?: string;
  SharedBy?: string;
  VideoUrl?: string;
  Description?: string;
  ItemReactions: ItemReaction[];
}

interface ItemReaction {
  UserId: string;
  IsLiked: boolean;
}
