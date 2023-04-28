import React from "react";
import { Stack } from "@mui/material";
import { useComments } from "hooks/comment";
import { Comment } from "./Comment";

export const CommentsList = ({ post }: { post: any }) => {
  const { id } = post;
  const {
    comments,
    // isLoading
  } = useComments(id);
  if (comments) {
    return (
      <Stack spacing={3}>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment?.id} />
        ))}
      </Stack>
    );
  } else return <></>;
};
