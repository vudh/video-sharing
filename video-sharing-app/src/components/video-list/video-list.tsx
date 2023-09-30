import { Stack } from "@mui/material";
import VideoItem from "components/video-item/video-item";
import { observer } from "mobx-react-lite";
import { useStores } from "stores/root-store";

const VideoList = observer(() => {
  const rootStore = useStores();

  return (
    <Stack
      spacing={1}
      style={{ flex: 1, paddingTop: 64, paddingLeft: 16, paddingRight: 16 }}
    >
      {rootStore.items?.map((x) => (
        <VideoItem key={x["Id"]} item={x} />
      ))}
    </Stack>
  );
});

export default VideoList;
