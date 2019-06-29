import React from 'react';
import {Helmet} from 'react-helmet';
import './style.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Headset from '@material-ui/icons/Headset';
import {calculatePrices} from './DiscogsUtil'
// import {URL_DISCOGS_CALCULATE} from './../../utils/constants'

const axios = require('axios');

export default class DiscogsPage extends React.Component {




  constructor(props) {
    super(props);

    this.state = {
      snackbar: {
        show: false,
        message: ''
      },
      order: '',
      shipping: 0,
      result: '',
      open: true
    };
    // this.handleSubmit = this.handleSubmit.bind(this);

    console.log('set state: ' + JSON.stringify(this.state))

    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleShippingChange = this.handleShippingChange.bind(this);
  }

  setSnackbarData(input) {
    this.setState({snackbar: {show: true, message: input}})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const result = calculatePrices(this.state.order)

    if (!result) {
      // this.setSnackbarData(CALCULATION_INVALID_INPUT)
      return false
    }

    // If no shipping cost from Calculation, take it from form
    if (!result.shipping) {
      result.shipping = this.state.shipping
      console.log(' # shipping: ' + result.shipping)
    }
    this.fetchCalculation(result)
  }

  fetchCalculation(input) {
    const auth = {
      auth: {
        username: 'marko',
        password: 'candyempire'
      },
    }

    const params = {
      proxy: {
        host: 'http://localhost',
        port: 8500,
        auth: {
          username: 'marko',
          password: 'candyempire'
        }
      },
    }

    console.log(JSON.stringify(input))

    const URL_DISCOGS_CALCULATE = 'http://localhost:8500/calculate'

    axios.post(URL_DISCOGS_CALCULATE, input)
      .then(res => {
        console.log(JSON.stringify(res.data))
        this.setState({result: res.data})
      })
      .catch(function (error) {
        this.setState({snackbar: {show: true, message: 'Viga teenuse väljakutsumisel'}})
      })
  }

  handleOrderChange(event) {
    this.setState({order: event.target.value})
  }

  handleShippingChange(event) {
    this.setState({shipping: event.target.value})
  }

  handleClick = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {result} = this.state;

    return (
      <div className="discogs-page">
        <form onSubmit={this.handleSubmit}>
          <Helmet>
            <title>Feature Page</title>
            <meta
              name="description"
              content="Feature page of React.js Boilerplate application"
            />
          </Helmet>
          <div>
            {'1 \u00b7 Second'}
            {'2 \U+130B8 Second'}

            <TextField
              id="purchase-items"
              onChange={this.handleOrderChange}
              name="order"
              label="Discogs purchase items"
              margin="normal"
              multiline={true}
              rows="30"
              variant="outlined"
            />
            <TextField
              id="purchase-shipping"
              onChange={this.handleShippingChange}
              name="shipping"
              label="Discogs purchase shipping costs"
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              id="calculate-prices"
              variant="outlined">
              Calculate prices
            </Button>
          </div>
          <div>
            <List>
              {result.items && result.items.map(function (d, idx) {
                return <ListItem>
                  <ListItemIcon>
                    <Headset/>
                  </ListItemIcon>
                  <ListItemText inset primary={d.price + `€ ` + d.name}/>
                </ListItem>
              })}
            </List>
          </div>
        </form>
      </div>
    );
  }
}
