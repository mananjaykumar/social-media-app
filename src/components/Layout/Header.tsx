import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Typography, CircularProgress } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { LOGIN, ROOT } from "../../routes/constants";
import theme from "../../theme";
import {
  // useAuth,
  useLogout,
} from "hooks/auth";

export const Header = ({ user }: { user: any }) => {
  // const { user, isLoading } = useAuth();
  const { logout, isLoading: isLoadingLogout } = useLogout();
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
      }}
    >
      <Stack
        role="presentation"
        direction="row"
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: "100%",
          height: "fit-content",
          padding: "20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.hover,
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
          }}
          onClick={() => navigate(ROOT)}
        >
          Home
        </Typography>
        <Button
          sx={{
            backgroundColor: theme.palette.primary.light,
            "&:hover": {
              backgroundColor: theme.palette.primary.hover,
            },
          }}
          startIcon={
            isLoadingLogout ? (
              <CircularProgress size="1.3rem" />
            ) : (
              <LoginIcon sx={{ mr: 0.5 }} />
            )
          }
          onClick={() => {
            if (!user) {
              navigate(LOGIN);
            } else {
              logout();
            }
          }}
        >
          {user ? "Logout" : "Login / Register"}
        </Button>
      </Stack>
    </Stack>
  );
};
