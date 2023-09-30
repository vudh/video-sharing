import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

export const VideoListWrapper = styled(Stack)(({ theme }) => ({
  flex: 1,
  paddingTop: 64,
  paddingLeft: 16,
  paddingRight: 16,
}));

export const IndicatorBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
  width: "100%",
  height: "100%",
}));
