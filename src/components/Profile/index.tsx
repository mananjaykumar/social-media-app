import React, { useState, useEffect } from "react";
import { Stack, Button, Avatar, Typography, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { useUpdateAvatar, useUser } from "hooks/user";
import { PostLists } from "components/Post/PostLists";
import { usePosts } from "hooks/posts";
import { useAuth } from "hooks/auth";
import { DraggableDialog } from "components/reusable/DraggableDialog";
import AlertDropzone from "components/reusable/AlertDropzone";
import { format } from "date-fns";

export const Profile = () => {
  const { id } = useParams();
  const {
    posts,
    // isLoading: postsLoading
  } = usePosts(id);
  const {
    user,
    //  userLoading
  } = useUser(String(id));
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [files, setFiles] = useState<any[]>([]);
  const [
    loading,
    // setLoading
  ] = useState(false);
  const [open, setOpen] = useState(false);
  const MAX_FILE_SIZE = 1000000000; // 1GB
  const fileLimit = 1;
  const {
    setFile,
    updateAvatar,
    isLoading: uploadImageLoading,
    fileURL,
  } = useUpdateAvatar(user?.id);

  useEffect(() => {
    setFile(files[0]);
  }, [files, setFile]);

  // console.log("user", user);
  // console.log("user?.date", user?.date);
  // console.log("user", format(1682688845505, "MMMM YYY"));
  // console.log("authuser", authUser);

  return (
    <Stack spacing={5}>
      <Stack
      // sx={{
      //   borderBottom: `1px solid ${theme.palette.grey[300]}`,
      //   paddingBottom: "50px",
      // }}
      >
        <Stack alignItems="flex-end">
          {!authLoading && authUser?.id === id && (
            <Button variant="contained" onClick={() => setOpen(true)}>
              Change Avatar
            </Button>
          )}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={5}>
          <Stack>
            <Avatar
              src={user?.avatar}
              sx={{
                height: "90px",
                width: "90px",
              }}
            />
          </Stack>
          <Stack>
            <Stack>
              <Typography fontSize="24px">@{user?.username}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography fontSize="16px">Posts: {posts?.length}</Typography>
              {/* <Typography fontSize="16px">Likes: 10</Typography> */}
              {user && (
                <Typography fontSize="16px">
                  Joined: {format(user?.date, "MMMM YYY")}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <Divider />
      </Stack>
      <Stack>
        <PostLists posts={posts} />
      </Stack>
      <DraggableDialog
        open={open}
        handleClose={() => setOpen(false)}
        title="Change Avatar"
        handleApproval={updateAvatar}
        approvalBtnText="submit"
        loading={uploadImageLoading}
      >
        {/* <Stack>
              <Stack>
                <Avatar />
              </Stack>
              <Stack>
                <Stack><Typography>
                  Change Avatar
                </Typography></Stack>
                <Stack>

                </Stack>
              </Stack>
        </Stack>
        <Typography>Title</Typography> */}
        <Stack alignItems="center">
          <Stack p={2}>
            <Avatar
              src={fileURL || user?.avatar}
              sx={{ height: "120px", width: "120px" }}
            />
          </Stack>
          <Stack width="100%">
            <AlertDropzone
              acceptedFiles={[".jpg", ".png", ".jpeg"]}
              dropzoneText="Drag your image here"
              buttonText="Browse Files"
              maxFileSize={MAX_FILE_SIZE}
              maxFiles={fileLimit}
              files={files}
              setFiles={setFiles}
              isFileUploading={loading}
            />
          </Stack>
        </Stack>
      </DraggableDialog>
    </Stack>
  );
};
