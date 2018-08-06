import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

export default class WeatherSnip extends Component {
  constructor(props) {
    super(props);
    console.log('weather coords', props.lat, props.lng);
    this.state = {
      weather: {},
    };
  }

  componentDidMount() {
    let params = { lat: this.props.lat, lng: this.props.lng };
    console.log(params);
    axios.get('/api/weather', { params: params }).then(res => {
      console.log('server res:', res);
      this.weatherState(res);
    });
  }

  weatherState(forecast) {
    this.setState({ weather: forecast.data });
  }

  render() {
    return (
      <div>
        It is currently {this.state.weather.currently ? this.state.weather.currently.temperature : ''} degrees F
        <br />
        It will be {this.state.weather.hourly ? this.state.weather.hourly.data[4].temperature : ''} degrees F{' '}
        {this.state.weather.hourly ? moment(this.state.weather.hourly.data[4].time * 1000).fromNow() : ''}
      </div>
    );
  }
}
