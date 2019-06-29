import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import './style.scss';

const styles = (theme) => ({
  container: {
    display: 'flex'
  },
  chip: {
    margin: theme.spacing.unit,
  },

});

class CalculatorPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateRange: []
    };
  }

  componentWillMount() {
    console.log('CalculatorPage mount start');
    this.createDateRange();
    console.log('CalculatorPage mount end');
  }

  createDateRange() {
    let start = moment().startOf('month');
    let end = moment().endOf('month');

    let result = [];
    while (start < end) {
      start = start.add(1, 'days');
      const newItem = { 'date': start.clone(), 'items': [] };
      this.state.dateRange.push(newItem);
    }
    return result;
  }


  render() {

    let id = 0;
    function createData(date, food, drink, vinyl, car, other) {
      id += 1;
      return { id, date, food, drink, vinyl, car, other };
    }

    const rows = [
      createData('01.04.2019', 159, 6, 24, 4.50, 10, 20),
      createData('02.04.2019', 159, 6, 24, 4.50, 10, 20),
      createData('03.04.2019', 159, 6, 24, 4.50, 10, 20),
      createData('04.04.2019', 159, 6, 24, 4.50, 10, 20),
      createData('05.04.2019', 159, 6, 24, 4.50, 10, 20),
    ];

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          {this.state.dateRange.map(asd => {
            <p>asd</p>
          })}
          <Table  >
            <TableHead>
              <TableRow>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Food</TableCell>
                <TableCell align="right">Drink</TableCell>
                <TableCell align="right">Vinyl</TableCell>
                <TableCell align="right">Car</TableCell>
                <TableCell align="right">Other</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.dateRange.map(item => (
                <TableRow key={item.date}>
                  <TableCell component="th" scope="row">{item.date}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              )
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CalculatorPage);
