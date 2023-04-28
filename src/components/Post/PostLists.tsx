import { Stack } from "@mui/material";
import { Post } from "./index";
export const PostLists = ({ posts }: { posts: any }) => {
  return (
    <Stack spacing={2}>
      {posts?.length === 0
        ? "NO Posts"
        : posts?.map((post: any) => <Post key={post?.id} post={post} />)}
    </Stack>
  );
};
