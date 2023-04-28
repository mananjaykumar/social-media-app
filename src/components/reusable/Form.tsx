import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { LOGIN, REGISTER } from "../../routes/constants";
import theme from "../../theme";

interface FormProps {
  title: string;
  isLoginForm: boolean;
  btnText: string;
  children: React.ReactNode;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Form = (props: FormProps) => {
  const {
    title,
    isLoginForm,
    btnText,
    children,
    handleSubmit,
    loading,
    disabled,
  } = props;
  return (
    <Paper
      elevation={2}
      sx={{
        width: "90%",
        maxWidth: "400px",
        margin: "150px auto 0px auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: "20px",
          borderRadius: "6px 6px 0px 0px",
        }}
      >
        <Typography
          sx={{ color: theme.palette.background.default, fontWeight: 600 }}
        >
          {title}
        </Typography>
      </Stack>
      <Stack
        spacing={3}
        sx={{
          padding: "20px",
        }}
      >
        {children}

        <Stack spacing={2}>
          {isLoginForm ? (
            <Link to={REGISTER}>Don't have an account ?</Link>
          ) : (
            <Link to={LOGIN}>Already have account ?</Link>
          )}
          <Button
            sx={{
              backgroundColor: theme.palette.primary.light,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: theme.palette.primary.hover,
              },
            }}
            onClick={handleSubmit}
            startIcon={loading && <CircularProgress size="1.5rem" />}
            disabled={loading || disabled}
          >
            {!loading ? btnText : "Loading..."}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
