import { Stack, Paper, Typography } from "@mui/material";
import theme from "theme";
import Header from "./Header";
import { Actions } from "./Actions";
export const Post = ({ post }: { post: any }) => {
  const { text } = post;
  return (
    <Paper elevation={3}>
      <Header post={post} />
      <Stack
        p={2}
        sx={{
          height: "150px",
          overflow: "auto",
          borderLeft: `1px solid ${theme.palette.grey[300]}`,
          borderRight: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Typography>{text}</Typography>
      </Stack>
      <Actions post={post} />
    </Paper>
  );
};
