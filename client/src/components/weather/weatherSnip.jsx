import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import weatherEmoji from './weatheremoji.js';

export default class WeatherSnip extends Component {
  constructor(props) {
    super(props);
    // console.log('weather coords', props.lat, props.lng);
    this.state = {
      weather: {},
    };
  }

  componentDidMount() {
    let params = { lat: this.props.lat, lng: this.props.lng };
    // console.log(params);
    axios.get('/api/weather', { params: params }).then(res => {
      // console.log('server res:', res);
      this.weatherState(res);
    });
  }

  weatherState(forecast) {
    this.setState({ weather: forecast.data });
  }

  render() {
    return (
      <div>
        <span className="bold">Currently:</span>{' '}
        {this.state.weather.currently ? this.state.weather.currently.temperature : ''} °F
        {this.state.weather.currently ? weatherEmoji(this.state.weather.currently.icon) : ''}
        <br />
        <span className="bold">It will be: </span>{' '}
        {this.state.weather.hourly ? this.state.weather.hourly.data[4].temperature : ''} °F {' '}
        {this.state.weather.hourly ? moment(this.state.weather.hourly.data[4].time * 1000).fromNow() : ''}
      </div>
    );
  }
}