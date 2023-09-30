import { styled } from "@mui/material/styles";
import { AppBar, Toolbar } from "@mui/material";

export const MainNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  color: "black",
  paddingRight: 8,
}));

export const MainToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  left: 0,
  px: 2,
}));

export const AppLogo = styled("img")(({ theme }) => ({
  height: 60,
  width: 60,
}));
