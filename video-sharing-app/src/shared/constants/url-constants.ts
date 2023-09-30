export class UrlConstant {
  static readonly SERVER_URL: string = "https://localhost:7171";

  static readonly LOGIN: string = `${UrlConstant.SERVER_URL}/UserAccount`;
  static readonly CREATE_USER: string = `${UrlConstant.SERVER_URL}/UserAccount`;

  static readonly SHARE_VIDEO: string = `${UrlConstant.SERVER_URL}/Item`;
  static readonly GET_VIDEOS: string = `${UrlConstant.SERVER_URL}/Item`;
}
