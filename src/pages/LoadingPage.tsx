import React from "react";
import { Stack, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Typography style={{ color: "#000000", fontSize: 15 }} align="center">
        <i className="fa fa-spinner fa-spin"></i> Loading... Please wait!
      </Typography>
    </Stack>
  );
};

export default LoadingPage;
