import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  SxProps,
  Tooltip,
  Theme,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Loading } from "./Loading";
import theme from "../../theme";

type Props = {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  approveBtnText?: string;
  title?: string;
  handleApproval?: () => void;
  loading?: boolean;
  validateData?: () => boolean;
  isFromApiDetails?: boolean;
  info?: object | null;
  hideCancelBtn?: boolean;
  isFromCustomData?: boolean;
  btnSection?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export const buttonStyles: SxProps = {
  borderRadius: "6px",
  height: "34px",
  textTransform: "none",
  width: "max-content",
};

export const ApprovalDialog: React.FC<Props> = (props) => {
  const {
    title,
    open,
    handleClose,
    children,
    approveBtnText = "Approve",
    handleApproval,
    loading,
    validateData,
    isFromApiDetails,
    info,
    hideCancelBtn = false,
    isFromCustomData,
    btnSection = null,
    sx = {},
  } = props;

  return (
    <Dialog
      open={open}
      onClose={!isFromApiDetails ? handleClose : () => isFromApiDetails}
      sx={
        isFromCustomData
          ? { "& .MuiPaper-root": { maxWidth: "750px" }, borderRadius: "6px" }
          : { borderRadius: "6px", ...sx }
      }
    >
      {title && (
        <DialogTitle sx={{ background: theme.palette.primary.main }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={500} fontSize="14.63px" color="#fff">
              {title}
            </Typography>
            <CloseIcon
              onClick={handleClose}
              sx={{
                cursor: "pointer",
                color: "#ffffff",
                backgroundColor: "rgba(256, 256, 256, 0.05)",
                borderRadius: "50%",
                padding: theme.spacing(0.25),
                "&:hover": {
                  backgroundColor: theme.palette.secondary.hover,
                },
              }}
              fontSize="small"
            />
          </Stack>
        </DialogTitle>
      )}
      <DialogContent>
        <Stack sx={{ p: 2, pl: 1, minWidth: "400px" }}>{children}</Stack>
      </DialogContent>
      <DialogActions>
        <Stack spacing={1} sx={{ width: "-webkit-fill-available" }}>
          <Divider
            sx={{ borderBottom: `1px dashed ${theme.palette.grey[300]}` }}
          />
          {isFromApiDetails ? (
            <Stack direction="row" justifyContent="space-between" p={1}>
              <Stack>
                <Tooltip title="Download Api details">
                  <Button
                    variant="outlined"
                    sx={{
                      ...buttonStyles,
                    }}
                    disabled={info === null}
                    onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob([JSON.stringify(info)], {
                        type: "text/json",
                      });
                      element.href = URL.createObjectURL(file);
                      element.download = `service_account_details.json`;
                      document.body.appendChild(element);
                      element.click();
                    }}
                    startIcon={<DownloadOutlinedIcon />}
                  >
                    Download
                  </Button>
                </Tooltip>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{ ...buttonStyles }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ ...buttonStyles }}
                  onClick={handleApproval}
                  disableElevation
                  startIcon={loading && <Loading />}
                  disabled={validateData && validateData()}
                >
                  {approveBtnText}
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} justifyContent="flex-end" p={1}>
              {btnSection || (
                <>
                  {!hideCancelBtn && (
                    <Button
                      variant="outlined"
                      sx={{ ...buttonStyles }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    sx={{ ...buttonStyles }}
                    onClick={handleApproval}
                    disableElevation
                    startIcon={loading && <Loading />}
                    disabled={validateData && validateData()}
                  >
                    {approveBtnText}
                  </Button>
                </>
              )}
            </Stack>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
