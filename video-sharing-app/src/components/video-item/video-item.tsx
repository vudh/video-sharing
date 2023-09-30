import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import { VideoItemProps } from "./video-item-props";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useStores } from "stores/root-store";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function VideoItem({ item }: VideoItemProps) {
  const rootStore = useStores();

  const isVoted =
    item.ItemReactions?.find((x) => x.UserId == rootStore.userId) !== undefined;
  const isUpVoted =
    item.ItemReactions?.find(
      (x) => x.UserId == rootStore.userId && x.IsLiked
    ) !== undefined;

  return (
    <Card>
      <CardContent>
        <Stack direction={"row"} spacing={1}>
          <ReactPlayer url={item.VideoUrl} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
              {item.Title}
            </Typography>
            <Stack
              direction={"row"}
              spacing={1}
              style={{ alignItems: "center" }}
            >
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Shared by: {item.SharedBy}
              </Typography>
              {!isVoted ? (
                <Stack direction={"row"}>
                  <IconButton aria-label="upvote" size="large">
                    <ThumbUpOffAltIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="downvote" size="large">
                    <ThumbDownOffAltIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              ) : isUpVoted ? (
                <ThumbUpIcon />
              ) : (
                <ThumbDownIcon />
              )}
            </Stack>

            <Stack direction={"row"}>
              {item.NumberOfLikes}
              <ThumbUpOffAltIcon style={{ marginRight: 8 }} />
              {item.NumberOfDislikes}
              <ThumbDownOffAltIcon />
            </Stack>
            <Typography variant="body2">
              Description:
              <br />
              {item.Description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
