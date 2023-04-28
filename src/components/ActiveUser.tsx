import React from "react";
import { Avatar, Button, Chip, Stack } from "@mui/material";
import { useAuth } from "hooks/auth";
import { useNavigate } from "react-router-dom";
import { PROTECTED } from "routes/constants";

export const ActiveUser = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <>Loading ...</>;

  return (
    <Stack
      alignItems="center"
      spacing={1}
      sx={{
        width: "100%",
      }}
    >
      <Stack>
        <Avatar
          sx={{ width: 76, height: 76, cursor: "pointer" }}
          src={user?.avatar}
          onClick={() => navigate(`${PROTECTED}/profile/${user?.id}`)}
        />
      </Stack>
      <Stack>
        <Chip
          label={`@${user?.username}`}
          sx={{
            borderRadius: "6px",
          }}
        />
      </Stack>
      <Stack
        sx={{
          width: "90%",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(`${PROTECTED}/profile/${user?.id}`)}
        >
          Edit Profile
        </Button>
      </Stack>
    </Stack>
  );
};
