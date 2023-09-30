import { CircularProgress } from "@mui/material";
import VideoItem from "components/video-item/video-item";
import { observer } from "mobx-react-lite";
import { useStores } from "stores/root-store";
import { IndicatorBoxContainer, VideoListWrapper } from "./styles";

const VideoList = observer(() => {
  const rootStore = useStores();

  if (rootStore.isLoading)
    return (
      <IndicatorBoxContainer>
        <CircularProgress />
      </IndicatorBoxContainer>
    );

  const onItemReaction = async (values) => {
    const res = await rootStore.itemReaction(values);
    if (res) rootStore.getVideos();
  };

  return (
    <VideoListWrapper spacing={1}>
      {rootStore.items?.map((x) => (
        <VideoItem key={x["Id"]} item={x} onItemReaction={onItemReaction} />
      ))}
    </VideoListWrapper>
  );
});

export default VideoList;
