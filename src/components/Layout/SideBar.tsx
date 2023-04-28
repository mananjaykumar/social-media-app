import React from "react";
import { Button, Divider, Stack } from "@mui/material";
import theme from "theme";
import { ActiveUser } from "components/ActiveUser";
import { USERS } from "routes/constants";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      <Stack>
        <ActiveUser />
      </Stack>
      <Stack>
        <Divider />
      </Stack>
      <Stack alignItems="center">
        <Button
          variant="outlined"
          sx={{
            width: "fit-content",
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
          onClick={() => navigate(USERS)}
        >
          All Users
        </Button>
      </Stack>
    </Stack>
  );
};
