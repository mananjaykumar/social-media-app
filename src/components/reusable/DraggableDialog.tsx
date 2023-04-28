import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
// import Draggable from "react-draggable";
import Draggable from "react-draggable";
import theme from "theme";
import { CircularProgress } from "@mui/material";

interface IDialog {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  handleApproval: () => void;
  approvalBtnText: string;
  loading: boolean;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export const DraggableDialog = (props: IDialog) => {
  const {
    open,
    handleClose,
    children,
    title,
    handleApproval,
    approvalBtnText,
    loading,
  } = props;

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{
          cursor: "move",
          fontSize: "16px",
          color: theme.palette.background.default,
          backgroundColor: theme.palette.primary.main,
        }}
        id="draggable-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleApproval}
          variant="contained"
          startIcon={
            loading && (
              <CircularProgress
                size="1.3rem"
                sx={{ color: theme.palette.background.default }}
              />
            )
          }
        >
          {loading ? "Loading..." : approvalBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
