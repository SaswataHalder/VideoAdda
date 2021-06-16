import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled, ScreenShare, VolumeOff, VolumeDown, VideocamOff, Videocam } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  buttons: {
    width: '190px',
    margin: '10px 5px',
    padding: 0,
  },
  margin: {
    marginTop: 10,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '1px solid black',
  },
}));
const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, shareScreen, videoMuted, audioMuted, toggleMuteAudio, toggleMuteVideo } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [selectedA, setSelectedA] = useState(audioMuted);
  const [selectedV, setSelectedV] = useState(videoMuted);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Give yourself a nickname</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <>
                  <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} classes={{ root: classes.buttons }}>
                    Hang Up
                  </Button>
                  <Button variant="contained" color="primary" startIcon={<ScreenShare fontSize="large" />} fullWidth onClick={shareScreen} classes={{ root: classes.buttons }}>
                    Share Screen
                  </Button>
                  <ToggleButton selected={selectedA} onChange={() => { setSelectedA(!selectedA); toggleMuteAudio(); }} classes={{ root: classes.buttons }}>
                    {selectedA ? (
                      <Button variant="contained" color="primary" startIcon={<VolumeDown fontSize="large" />} fullWidth>Unmute Audio</Button>
                    ) : (
                      <Button variant="contained" color="secondary" startIcon={<VolumeOff fontSize="large" />} fullWidth>Mute Audio</Button>)}
                  </ToggleButton>
                  <ToggleButton selected={selectedV} onChange={() => { setSelectedV(!selectedV); toggleMuteVideo(); }} classes={{ root: classes.buttons }}>
                    {selectedV ? (
                      <Button variant="contained" color="primary" startIcon={<Videocam fontSize="large" />} fullWidth>Unmute Video</Button>
                    ) : (
                      <Button variant="contained" color="secondary" startIcon={<VideocamOff fontSize="large" />} fullWidth>Mute Video</Button>)}
                  </ToggleButton>
                </>
              ) : (
                <Button variant="contained" style={{ backgroundColor: '#00CA4E', padding: '5px' }} startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;
