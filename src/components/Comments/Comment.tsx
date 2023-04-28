import React from "react";
import {
  Stack,
  Avatar,
  Divider,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useUser } from "hooks/user";
import theme from "theme";
import { timeAgo } from "utils/dateToTime";
import { FaTrash } from "react-icons/fa";
import { useDeleteComment } from "hooks/comment";
import { useAuth } from "hooks/auth";

export const Comment = ({ comment }: { comment: any }) => {
  const { text, uid, date, id } = comment;
  const { user, isLoading: userLoading } = useUser(uid);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id);
  const time = timeAgo(new Date(date));

  if (userLoading) return <>Loading...</>;
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack>
          <Avatar src={user?.avatar} />
        </Stack>
        <Stack width="100%" spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Stack>
                <Typography
                  fontSize="14px"
                  color={theme.palette.primary.main}
                  fontWeight={600}
                >
                  {user?.username}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  fontSize="12px"
                  color={theme.palette.text.secondary}
                >
                  {time}
                </Typography>
              </Stack>
            </Stack>
            {!authLoading && authUser?.id === uid && (
              <Stack sx={{ paddingRight: "10px" }}>
                <IconButton size="small" onClick={deleteComment}>
                  {deleteLoading ? (
                    <CircularProgress size="1rem" />
                  ) : (
                    <FaTrash color="#0f4c75" />
                  )}
                </IconButton>
              </Stack>
            )}
          </Stack>
          <Stack>
            <Divider />
          </Stack>
        </Stack>
      </Stack>
      <Stack pl={6}>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
};
