import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

import VideoPlayer from './components/VideoPlayer.js';
import Sidebar from './components/Sidebar.js';
import Notifications from './components/Notifications.js';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 100,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    backgroundColor: fade(theme.palette.warning.light, 0.5),

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h3" align="center">Video Adda</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default App;
