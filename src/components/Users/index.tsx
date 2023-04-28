import React from "react";
import { Skeleton, Stack, Grid, Avatar, Typography } from "@mui/material";
import { useUsers } from "hooks/user";
import { PROTECTED } from "routes/constants";
import { Link } from "react-router-dom";
import theme from "theme";

export const Users = () => {
  const { users, isLoading } = useUsers();
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        wrap: "flex-wrap",
      }}
    >
      <Grid container spacing={4}>
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((item, index) => (
              <Grid item lg={3} sm={6} xs={12}>
                <Skeleton sx={{ width: "180px", height: "250px" }} />
              </Grid>
            ))
          : users?.map((user) => (
              <Grid item lg={3} sm={6} xs={12}>
                <Stack
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    width: "170px",
                    height: "150px",
                    marginTop: "55px",
                    borderRadius: "5px",
                  }}
                  alignItems="center"
                  p={2}
                >
                  <Stack spacing={1} alignItems="center">
                    <Stack>
                      <Avatar
                        src={user?.avatar}
                        sx={{
                          height: "70px",
                          width: "70px",
                        }}
                      />
                    </Stack>
                    <Stack>
                      <Typography>{user?.username}</Typography>
                    </Stack>
                    <Stack>
                      <Link to={`${PROTECTED}/profile/${user?.id}`}>
                        <Typography color={theme.palette.primary.main}>
                          View Profile
                        </Typography>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            ))}
      </Grid>
    </Stack>
  );
};
