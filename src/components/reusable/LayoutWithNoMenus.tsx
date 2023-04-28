import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Grid, Card, CardContent } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.grey[100],
      height: "100vh",
    },
    body: {
      position: "relative",
      flexGrow: 1,
    },
    content: {
      position: "absolute",
      top: theme.spacing(3),
      bottom: theme.spacing(3),
      left: theme.spacing(3),
      right: theme.spacing(3),
      overflowX: "hidden",
      overflowY: "auto",
    },
    card: {
      minHeight: "100%",
    },
  })
);

export const LayoutWithNoMenus: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      className={classes.root}
    >
      <Grid item className={classes.body}>
        <div className={classes.content}>
          <Card className={classes.card}>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};
