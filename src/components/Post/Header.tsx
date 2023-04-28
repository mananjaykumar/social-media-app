import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import theme from "theme";
import { useUser } from "hooks/user";
import { timeAgo } from "utils/dateToTime";
import { PROTECTED } from "routes/constants";
import { useNavigate } from "react-router-dom";

const Header = ({ post }: { post: any }) => {
  const { uid, date } = post;
  const {
    user,
    // isLoading
  } = useUser(uid);
  const navigate = useNavigate();
  const time = timeAgo(new Date(date));

  //   if (isLoading) return <>Loading ...</>;
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      bgcolor={theme.palette.primary.hover}
      p={2}
      borderRadius="4px 4px 0px 0px"
      border={`1px solid ${theme.palette.grey[300]}`}
    >
      <Stack>
        <Avatar src={user?.avatar} />
        {/* {user?.username && user?.username[0].toUpperCase()}</Avatar> */}
      </Stack>
      <Stack>
        <Typography
          fontSize="14px"
          color={theme.palette.primary.main}
          fontWeight={600}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate(`${PROTECTED}/profile/${uid}`)}
        >
          {user?.username}
        </Typography>
        <Typography fontSize="12px" color={theme.palette.text.secondary}>
          {time}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Header;
