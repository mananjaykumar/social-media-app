import React, { useState } from "react";
import {
  Stack,
  Avatar,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "hooks/auth";
import { useAddComment } from "hooks/comment";
import theme from "theme";

export const NewComment = ({ post }: { post: any }) => {
  const { id: postId } = post;
  const {
    user,
    // isLoading: userLoading
  } = useAuth();
  const [comment, setComment] = useState("");
  const { addComment, isLoading: commentLoding } = useAddComment({
    postId,
    uid: user?.id,
  });

  const handleAddComment = () => {
    addComment(comment);
    setComment("");
  };

  return (
    <Stack spacing={0.5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack>
          <Avatar src={user?.avatar} />
        </Stack>
        <Stack width="100%">
          <TextField
            variant="standard"
            label="Write a comment"
            name="comment"
            value={comment}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setComment(event.target.value);
            }}
            sx={{
              marginTop: "-20px",
            }}
          />
        </Stack>
      </Stack>
      <Stack>
        <Stack alignItems="flex-end">
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
            }}
            onClick={handleAddComment}
            startIcon={
              commentLoding && (
                <CircularProgress
                  size="1.3rem"
                  sx={{ color: theme.palette.background.default }}
                />
              )
            }
          >
            Add Comment
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
