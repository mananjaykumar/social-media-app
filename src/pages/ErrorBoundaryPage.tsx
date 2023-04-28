import React from 'react';
import { Button, Grid, Theme, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { createStyles, makeStyles } from '@mui/styles';
import { LayoutWithNoMenus } from '../components/reusable/LayoutWithNoMenus';
// import theme from '../theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontSize: 28,
      fontWeight: 600,
      color: theme?.palette?.text?.secondary,
    },
    btn: {
      padding: '24px',
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: '2px',
      marginTop: '40px',
    },
  })
);

export const ErrorBoundaryPage = () => {
  const classes = useStyles();

  return (
    <LayoutWithNoMenus>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Typography variant="h5" color="#000000">
            Oops! Something went wrong
          </Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<RefreshIcon />}
            color="primary"
            variant="contained"
            data-testid="reloadBtn"
            disableElevation
            className={classes.btn}
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </Grid>
      </Grid>
    </LayoutWithNoMenus>
  );
};
