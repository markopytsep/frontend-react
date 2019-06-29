import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import './style.scss';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/*

USED:
* react-aktex

*/

const styles = (theme) => ({
  container: {
    display: 'flex'
  },
  chip: {
    margin: theme.spacing.unit,
  },

});

class ExperimentPage extends React.Component {

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          Watch
        </Grid>
        <Grid item xs={12} sm={6}>
         what
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ExperimentPage);
