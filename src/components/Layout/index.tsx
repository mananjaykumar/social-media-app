// import React from "react";
import { Stack, CircularProgress } from "@mui/material";
import { Header } from "./Header";

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "routes/constants";
import { useAuth } from "hooks/auth";
import theme from "theme";
import { SideBar } from "./SideBar";

// export const Layout = ({ children }: any) => {
//   return (
//     <Stack
//       direction="column"
//       sx={{
//         height: "100vh",
//         width: "100vw",
//         overflowY: "hidden",
//         overflowX: "auto",
//       }}
//     >
//       <Header />
//       <Stack flexGrow={1}>{children}</Stack>
//     </Stack>
//   );
// };

export const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading, navigate]);

  if (isLoading)
    return (
      <Stack
        sx={{
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" size="3rem" />
      </Stack>
    );

  return (
    // <>
    //   This is the child: <Outlet />
    // </>
    <Stack
      direction="column"
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      <Header user={user} />
      <Stack
        flexGrow={1}
        direction="row"
        bgcolor="white"
        sx={{
          padding: "0px 100px",
        }}
      >
        <Stack
          width="75%"
          // bgcolor="green"
          sx={{
            padding: "50px 100px",
            height: "calc(100vh - 100px)",
            overflow: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Outlet />
        </Stack>
        <Stack
          width="25%"
          // bgcolor="black"
          sx={{
            borderLeft: `1px solid ${theme.palette.grey[300]}`,
            padding: "50px 10px",
          }}
        >
          <SideBar />
        </Stack>
      </Stack>
    </Stack>
  );
};
