import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// Material-ui
import AppBar from '@material-ui/core/AppBar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  arrow: {
    position: 'absolute',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const history = useHistory();
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          { pathname !== '/'
            ? (
              <IconButton
                aria-label="Back"
                className={classes.arrow}
                color="inherit"
                hidden
                onClick={() => history.push('/')}
              >
                <ArrowBack />
              </IconButton>
            )
            : undefined }
          <Typography
            variant="h6"
            align={pathname === '/' ? 'left' : 'center'}
            className={classes.title}
          >
            Backpack
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
