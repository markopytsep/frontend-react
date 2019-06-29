import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import './style.scss';

const axios = require('axios');

const styles = (theme) => ({
  container: {
    display: 'flex'
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class DiscogsStatisticsPage extends React.Component {

  /*
  constructor(props) {
    super(props);
    this.state = {};
  }
  */

  componentWillMount() {
    console.log(` ### NAVIGATOR ${navigator.onLine}`);

    window.addEventListener('online', () => {
      console.log(' ### ONLINE');
    });

    window.addEventListener('offline', () => {
      console.log(' ### OFFLINE');
    });
  }

  playSound() {
    console.log(' ## play sound 2')
    /*
    let audioContext = new AudioContext()
    let oscillator = audioContext.createOscillator()

    oscillator.frequency.value = 440
    oscillator.type = 'sine'
    oscillator.connect(audioContext.destination)
    oscillator.start(audioContext.currentTime)
    */
  }

  fetchWorkable = () => {
    const requestUrl = 'https://mooncascade.workable.com/spi/v3/jobs?state=published'
    const authString = 'Bearer 59a6da8cd0fca3c115b4eb5621874b8602f974b695875beb1aff484ff7fa1ad3'
    console.log(` # fetch from: ${  requestUrl}`)
    // mode: 'no-cors',
    fetch(requestUrl, {
      method: 'GET',
      
      credentials: 'include',
      headers: {
        'Authorization': authString,
        'Content-Type': 'application/json'
      }
    }).then(res => res.ok ? res.json() : new Error(res.statusText))
      .then(data => { console.log(data) })
      .catch(err => { throw err })
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <form className={classes.container} noValidate autoComplete="off">
              {/*
              <TextField
                id="outlined-uncontrolled"
                label="Uncontrolled"
                defaultValue="foo"
                margin="normal"
                variant="outlined"
              />
              */
              }
              <TextField
                id="from"
                label="From"
                type="date"
                defaultValue="2017-05-24"
              />
              <TextField
                id="to"
                label="To"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper onClick={this.fetchWorkable}>
            <Chip
              avatar={<Avatar>Min</Avatar>}
              label="10 000€"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>Avg</Avatar>}
              label="20 000€"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>Max</Avatar>}
              label="30 000€"
              className={classes.chip}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>Graafik</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>reload</Paper>
        </Grid>
        <Grid item xs={6} sm={9}>
          <Paper>stat</Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DiscogsStatisticsPage);
