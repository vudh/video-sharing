import React, { useState } from "react";
import { AppLogo, MainNavbarRoot, MainToolbar } from "./styles";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useStores } from "stores/root-store";
import AlertDialog from "components/common/alert-dialog";
import { observer } from "mobx-react-lite";
import ShareVideoDialog from "components/share-video-dialog/share-video-dialog";

export const MainNavbar = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openShareVideo, setOpenShareVideo] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const rootStore = useStores();

  const onLoginClicked = async (event) => {
    event.preventDefault();

    const res = await rootStore.login(email, password);
    const msg = res ? res.Message : "An error has been occured!";
    if (msg) {
      setOpenAlert(true);
      setAlertContent(msg);
    }
  };

  const onShareVideoSaved = async (values) => {
    const res = await rootStore.shareVideo(
      values.url,
      values.title,
      values.desc
    );
    const msg = res ? res.Message : "An error has been occured!";
    if (msg) {
      setOpenAlert(true);
      setAlertContent(msg);
    } else {
      setOpenShareVideo(false);
    }
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    rootStore.setUserId("");
  };

  return (
    <>
      <MainNavbarRoot>
        <MainToolbar disableGutters>
          <AppLogo alt="Logo" src={"./images/logo.svg"} />
          <Typography sx={{ ml: 1 }} variant="h3">
            Funny Videos
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {rootStore.userId ? (
            <Stack direction={"row"} spacing={1}>
              <Typography variant="h6">Welcome</Typography>
              <Typography variant="h6">{rootStore.userId}</Typography>
              <Button
                variant="contained"
                onClick={() => setOpenShareVideo(true)}
              >
                Share a movie
              </Button>
              <Button variant="outlined" onClick={onLogout}>
                Logout
              </Button>
            </Stack>
          ) : (
            <Stack direction={"row"} spacing={1}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" onClick={onLoginClicked}>
                Login
              </Button>
              <Button variant="outlined">Register</Button>
            </Stack>
          )}
        </MainToolbar>
      </MainNavbarRoot>
      <AlertDialog
        content={alertContent}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
      />
      <ShareVideoDialog
        open={openShareVideo}
        onClose={() => setOpenShareVideo(false)}
        onSave={onShareVideoSaved}
      />
    </>
  );
});
