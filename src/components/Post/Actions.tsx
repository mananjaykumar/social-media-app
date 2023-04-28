import React from "react";
import { Stack, Typography, IconButton, CircularProgress } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaComment } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import theme from "theme";
import { useAuth } from "hooks/auth";
import { useToggleLike, useDeletePost } from "hooks/posts";
import { useNavigate } from "react-router-dom";
import { PROTECTED } from "routes/constants";
import { useComments } from "hooks/comment";

export const Actions = ({ post }: { post: any }) => {
  const { id, likes, uid } = post;
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const isLiked = likes?.includes(user?.id);
  const { toggleLike, isLoading: likeLoading } = useToggleLike({
    id,
    isLiked,
    uid: user?.id,
  });
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentsLoading } = useComments(id);

  return (
    <Stack
      p={2}
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[300]}`,
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        borderRight: `1px solid ${theme.palette.grey[300]}`,
      }}
    >
      <Stack direction="row" spacing={1}>
        <Stack direction="row" alignItems="center">
          {/* <FavoriteBorderOutlinedIcon  /> */}
          <IconButton size="small" onClick={toggleLike}>
            {likeLoading || isLoading ? (
              <CircularProgress size="1rem" />
            ) : isLiked ? (
              <AiFillHeart fontSize="inherit" color="red" />
            ) : (
              <AiOutlineHeart fontSize="inherit" color="red" />
            )}
          </IconButton>
          <Typography fontSize="16px"> {likes?.length}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <IconButton
            size="small"
            onClick={() => navigate(`${PROTECTED}/comments/${id}`)}
          >
            {commentsLoading ? (
              <CircularProgress size="1rem" />
            ) : comments?.length === 0 ? (
              <FaRegComment color="primary" />
            ) : (
              <FaComment color="#0f4c75" />
            )}
          </IconButton>
          <Typography fontSize="16px">{comments?.length}</Typography>
        </Stack>
      </Stack>
      {!isLoading && user?.id === uid && (
        <Stack>
          <IconButton size="small" onClick={deletePost}>
            {deleteLoading ? (
              <CircularProgress size="1rem" />
            ) : (
              <FaTrash color="#0f4c75" />
            )}
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};
