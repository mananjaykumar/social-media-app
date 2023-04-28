import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import theme from "../../theme";

export interface ISnackbar {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertMsg: string;
  severity: AlertColor;
  alertRef?: React.Ref<any>;
  timeout?: number | null;
  onClose?: () => void;
}

const variantIcon = {
  success: (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="34" height="34" rx="6" fill="#65B168" />
      <path
        d="M14.1685 19.8896L11.0589 16.78L10 17.8315L14.1685 22L23.1171 13.0515L22.0656 12L14.1685 19.8896Z"
        fill="#65B168"
      />
      <path
        d="M17 6C10.928 6 6 10.928 6 17C6 23.072 10.928 28 17 28C23.072 28 28 23.072 28 17C28 10.928 23.072 6 17 6ZM14.8 22.5L9.3 17L10.851 15.449L14.8 19.387L23.149 11.038L24.7 12.6L14.8 22.5Z"
        fill="white"
      />
    </svg>
  ),
  info: (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="34" height="34" rx="6" fill="#2E6ADD" />
      <path
        d="M17 6C10.928 6 6 10.928 6 17C6 23.072 10.928 28 17 28C23.072 28 28 23.072 28 17C28 10.928 23.072 6 17 6ZM18.1 22.5H15.9V15.9H18.1V22.5ZM18.1 13.7H15.9V11.5H18.1V13.7Z"
        fill="white"
      />
    </svg>
  ),
  error: (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="34" height="34" rx="6" fill="#FC5050" />
      <path
        d="M17 6C10.928 6 6 10.928 6 17C6 23.072 10.928 28 17 28C23.072 28 28 23.072 28 17C28 10.928 23.072 6 17 6ZM18.1 22.5H15.9V20.3H18.1V22.5ZM18.1 18.1H15.9V11.5H18.1V18.1Z"
        fill="white"
      />
    </svg>
  ),
  warning: (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="34" height="34" rx="6" fill="#FFA224" />
      <path
        d="M6 26H28L17 7L6 26ZM18 23H16V21H18V23ZM18 19H16V15H18V19Z"
        fill="white"
      />
    </svg>
  ),
};

const variantColor = {
  success: {
    light: theme.palette.success.light,
    main: theme.palette.success.main,
  },
  info: {
    light: theme.palette.info.light,
    main: theme.palette.info.main,
  },
  warning: {
    light: theme.palette.warning.light,
    main: theme.palette.warning.main,
  },
  error: {
    light: theme.palette.error.light,
    main: theme.palette.error.main,
  },
};

export const AlertSnackbar = (props: ISnackbar) => {
  const {
    open,
    setOpen,
    alertMsg,
    severity,
    alertRef,
    timeout = 3000,
    onClose,
  } = props;
  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    if (onClose) onClose();
    else setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={timeout}
      onClose={handleClose}
      sx={{ mb: "5%" }}
      action={action}
    >
      <MuiAlert
        elevation={0}
        ref={alertRef}
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        icon={variantIcon[severity]}
        sx={{
          display: "flex",
          alignItems: "center",
          "& .MuiAlert-action": {
            padding: "0px 0px 0px 50px",
          },
          backgroundColor: variantColor[severity].light,
          border: `1px solid ${variantColor[severity].main}`,
          width: "620px",
        }}
      >
        {alertMsg}
      </MuiAlert>
    </Snackbar>
  );
};
