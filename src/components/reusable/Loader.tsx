import React from "react";
import { Stack, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" size="3rem" />
    </Stack>
  );
};
