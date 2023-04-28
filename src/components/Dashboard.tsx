import React, { useState } from "react";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useAddPost, usePosts } from "hooks/posts";
import { useAuth } from "hooks/auth";
// import { userUser } from "hooks/user";
import theme from "theme";
import { PostLists } from "./Post/PostLists";

const NewPost = () => {
  const { addPost, isLoading } = useAddPost();
  const {
    user,
    // isLoading: authLoading
  } = useAuth();
  const [postText, setPostText] = useState("");

  const handleAddPost = () => {
    addPost({
      uid: user?.id,
      text: postText,
    });
    setPostText("");
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontSize="20px">New Post</Typography>
        <Button
          variant="contained"
          onClick={handleAddPost}
          startIcon={
            isLoading && (
              <CircularProgress
                size="1.3rem"
                sx={{ color: theme.palette.background.default }}
              />
            )
          }
        >
          {isLoading ? " Loading..." : "Post"}
        </Button>
      </Stack>
      <Stack>
        <textarea
          style={{ backgroundColor: "inherit", padding: "10px" }}
          rows={10}
          value={postText}
          placeholder="Write a new Post..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPostText(e.target.value)
          }
        />
      </Stack>
    </Stack>
  );
};

export const Dashboard = () => {
  const { posts, isLoading } = usePosts();

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
    <Stack spacing={4}>
      <NewPost />
      {/* {postLoading ? (
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
      ) : posts?.length === 0 ? (
        <Stack>
          <Typography>No Posts</Typography>
        </Stack>
      ) : (
        <Stack
          spacing={2}
          sx={
            {
              // height: "500px",
              // overflow: "auto",
            }
          }
        >
          {posts?.map((item: any, index: number) => (
            <Posts
              username={item.username}
              date={item?.date}
              postText={item?.text}
              likes={item?.likes?.length}
              comments={10}
            />
          ))}
        </Stack>
      )} */}

      <PostLists posts={posts} />
    </Stack>
  );
};
