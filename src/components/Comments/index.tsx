import React from "react";
import { Stack, CircularProgress } from "@mui/material";
import { Post } from "components/Post";
import { useParams } from "react-router-dom";
import { usePost } from "hooks/posts";
import { NewComment } from "./NewComment";
import { CommentsList } from "./CommentsList";

export const Comments = () => {
  const { id } = useParams();
  const { post, isLoading } = usePost(id);

  if (isLoading)
    return (
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" size="3rem" />
      </Stack>
    );

  return (
    <Stack spacing={5}>
      <Stack>
        <Post post={post} />
      </Stack>
      <NewComment post={post} />
      <CommentsList post={post} />
    </Stack>
  );
};
