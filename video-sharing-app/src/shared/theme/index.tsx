import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
//
import { ContainerProps } from "shared/models/container-props";
import typography from "./typography";

export const ThemeConfig: React.FC<ContainerProps> = ({ children }) => {
  const theme = createTheme({
    typography,
    components: {},
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
