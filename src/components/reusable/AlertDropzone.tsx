import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import theme from "theme";
import { AlertSnackbar } from "./AlertSnackbar";

interface Props {
  acceptedFiles?: string[];
  dropzoneText?: string;
  buttonText?: string;
  maxFiles?: number;
  maxFileSize?: number;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isFileUploading?: boolean;
  sx?: SxProps<Theme>;
  dividerBackgroundColor?: string;
  buttonProps?: any;
}

const AlertDropzone = (props: Props) => {
  const {
    acceptedFiles,
    dropzoneText,
    buttonText,
    maxFiles = 1,
    maxFileSize = 1000000000,
    files,
    setFiles,
    isFileUploading = false,
    sx = [],
    dividerBackgroundColor,
    buttonProps = {},
  } = props;
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("" as "success" | "error" | "info");
  const [alertOpen, setAlertOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
            borderRadius: "6px",
            cursor: "pointer",
            border: `2px dashed ${theme.palette.grey[300]}`,
            backgroundColor: theme.palette.grey[100],
            minWidth: "330px",
            // width: '330px',
            height: "192px",
            margin: theme.spacing(2, 0),
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        onDrop={(e) => {
          if (isFileUploading) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          const droppedFiles = e.dataTransfer.files;
          // type checking
          if (acceptedFiles) {
            for (let i = 0; i < droppedFiles.length; i++) {
              if (
                !acceptedFiles.includes(
                  `.${droppedFiles[i].type.split("/")[1]}`
                )
              ) {
                setMsg(`File type ${droppedFiles[i].type} is not allowed`);
                setSeverity("error");
                setAlertOpen(true);
                return;
              }
            }
          }
          // no of files checking
          if (files.length >= maxFiles) {
            setMsg(`You can only upload ${maxFiles} files at a time`);
            setSeverity("error");
            setAlertOpen(true);
            return;
          }
          if (droppedFiles.length > maxFiles) {
            setMsg(`You can only upload ${maxFiles} files at a time`);
            setSeverity("error");
            setAlertOpen(true);
            return;
          }
          // empty file checking
          for (let i = 0; i < droppedFiles.length; i++) {
            if (droppedFiles[i].size === 0) {
              setMsg("Empty file is not allowed");
              setSeverity("error");
              setAlertOpen(true);
              return;
            }
          }
          // max file size checking
          for (let i = 0; i < droppedFiles.length; i++) {
            if (maxFileSize && droppedFiles[i].size > maxFileSize) {
              setMsg(
                `File size should be less than ${maxFileSize / 1000000} MB`
              );
              setSeverity("error");
              setAlertOpen(true);
              return;
            }
          }
          if (droppedFiles.length > 0) {
            setFiles([...files, ...Array.from(droppedFiles)]);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {files.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              padding: theme.spacing(2, 0),
              borderBottom: `2px dashed ${theme.palette.grey[200]}`,
              height: "120px",
              maxHeight: "120px",
              overflowY: "auto",
            }}
          >
            {files.map((file, i) => (
              <Chip
                key={String(i)}
                label={file.name}
                onDelete={() => {
                  setFiles(files.filter((_, index) => index !== i));
                }}
                sx={{
                  marginBottom: theme.spacing(1),
                  backgroundColor: "#fff",
                  border: `1px solid ${theme.palette.text.secondary}}`,
                }}
              />
            ))}
          </Box>
        )}
        <input
          accept={acceptedFiles?.join(",")}
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => {
            const selectedFiles = e.target.files;
            if (selectedFiles) {
              // type checking
              if (acceptedFiles) {
                for (let i = 0; i < selectedFiles.length; i++) {
                  if (
                    !acceptedFiles.includes(
                      `.${selectedFiles[i].type.split("/")[1]}`
                    )
                  ) {
                    setMsg(`File type ${selectedFiles[i].type} is not allowed`);
                    setSeverity("error");
                    setAlertOpen(true);
                    return;
                  }
                }
              }
              // no of files checking
              if (files.length >= maxFiles) {
                setMsg(`You can only upload ${maxFiles} files at a time`);
                setSeverity("error");
                setAlertOpen(true);
                return;
              }
              if (selectedFiles.length > maxFiles) {
                setMsg(`You can only upload ${maxFiles} files at a time`);
                setSeverity("error");
                setAlertOpen(true);
                return;
              }
              // empty file checking
              for (let i = 0; i < selectedFiles.length; i++) {
                if (selectedFiles[i].size === 0) {
                  setMsg("Empty file is not allowed");
                  setSeverity("error");
                  setAlertOpen(true);
                  return;
                }
              }
              // max file size checking
              for (let i = 0; i < selectedFiles.length; i++) {
                if (maxFileSize && selectedFiles[i].size > maxFileSize) {
                  setMsg(
                    `File size should be less than ${maxFileSize / 1000000} MB`
                  );
                  setSeverity("error");
                  setAlertOpen(true);
                  return;
                }
              }
              if (selectedFiles.length > 0) {
                setFiles([...files, ...Array.from(selectedFiles)]);
              }
            }
          }}
          ref={fileInputRef}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: files.length > 0 ? "space-between" : "center",
            width: "100%",
            height: "100%",
            padding: theme.spacing(1, 0),
            gap: 1,
          }}
        >
          <Typography>{dropzoneText || "Drag and drop files here"}</Typography>
          <Stack
            direction="row"
            sx={{
              backgroundColor:
                dividerBackgroundColor || theme.palette.grey[100],
              margin: files.length > 0 ? 0 : theme.spacing(2, 0),
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Divider sx={{ width: "100px", margin: theme.spacing(0.625) }} />
            OR
            <Divider sx={{ width: "100px", margin: theme.spacing(0.625) }} />
          </Stack>
          <Button
            variant="contained"
            component="span"
            sx={{
              textTransform: "Capitalize",
              borderRadius: "6px",
            }}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            disableElevation
            disabled={files.length >= maxFiles || isFileUploading}
            {...buttonProps}
          >
            {buttonText || "Upload"}
          </Button>
        </Box>
      </Box>
      {msg && (
        <AlertSnackbar
          open={alertOpen}
          setOpen={setAlertOpen}
          severity={severity}
          alertMsg={msg}
        />
      )}
    </>
  );
};

export default AlertDropzone;
