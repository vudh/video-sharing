import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";

export default function VideoItem({ item }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction={"row"} spacing={1}>
          <ReactPlayer url={item.VideoUrl} />
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {item.Title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Shared by: {item.SharedBy}
            </Typography>
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
