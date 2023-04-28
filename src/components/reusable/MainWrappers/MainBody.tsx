import React from "react";
import { ThemeProvider } from "@mui/system";
import { Paper } from "@mui/material";

import theme from "../../../theme";

const MainBody = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        square
        elevation={0}
        className="main-body"
        sx={{
          bgcolor: theme.palette.background.default,
          px: "16px",
          flexGrow: 1,
          position: "relative",
        }}
      >
        {children}
      </Paper>
    </ThemeProvider>
  );
};
export default MainBody;
