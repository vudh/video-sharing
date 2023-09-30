import React, { useEffect } from "react";
import MainNavbar from "components/layout/nav-bar";
import VideoList from "components/video-list/video-list";
import { Stack } from "@mui/material";
import { useStores } from "stores/root-store";

function App() {
  const rootStore = useStores();

  useEffect(() => {
    rootStore.getVideos();
  }, []);

  return (
    <Stack sx={{ height: "100%" }}>
      <MainNavbar />
      <VideoList />
    </Stack>
  );
}

export default App;
