import React, { Component } from 'react';
import axios from 'axios';

export default class VenueWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRange: 'hourly', // can be minutely, hourly, daily
      weather: [],
      selectedData: [],
    };
  }

  componentDidMount() {
    let params = { lat: this.props.lat, lng: this.props.lng, time: this.state.time };
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
      <div className="weathervis">
        Hello Weather!
        <div>{this.props.position.lat}</div>
      </div>
    );
  }
}
