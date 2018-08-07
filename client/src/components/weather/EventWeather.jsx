import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
  Resizable,
  AreaChart,
} from 'react-timeseries-charts';
import { TimeSeries } from 'pondjs';

const style = styler([
  { key: 'temp', color: '#CA4040' },
  { key: 'pressure', color: '#9467bd' },
  { key: 'wind', color: '#987951' },
  { key: 'gust', color: '#CC862A' },
  { key: 'rain', color: '#C3CBD4' },
  { key: 'rainAccum', color: '#333' },
]);

export default class EventWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRange: 'hourly', // can be minutely, hourly, daily
      weather: [],
      selectedData: [],
      temps: '',
    };
  }

  componentDidMount() {
    console.log(this.props.details.date);
    console.log(moment(this.props.details.date).format('X'));
    console.log(moment(this.props.details.date).format('LTS'));
    this.convertTime(this.props.details.startBlock, this.props.details.endBlock, this.props.details.date);
  }

  getWeather(startTime) {
    let params = { lat: this.props.position.lat, lng: this.props.position.lng, time: startTime };
    console.log(params);
    axios.get('/api/weathertime', { params: params }).then(res => {
      console.log('server res:', res);
      this.weatherState(res);
      if (this.state.timeRange === 'hourly' && this.state.weather.hourly) {
        this.setState({ selectedData: this.state.weather.hourly.data }, () =>
          this.dataBuilder(this.state.selectedData)
        );
      }
    });
  }

  convertTime(startblock, endblock, date) {
    let secondsToAddStart = startblock * 30 * 60;
    // console.log('secondsToAddStart is', secondsToAddStart);
    let secondsToAddEnd = endblock * 30 * 60;
    // console.log('secondsToAddEnd is', secondsToAddEnd);
    let startTime = parseInt(moment(date).format('X')) + secondsToAddStart;
    let endTime = parseInt(moment(date).format('X')) + secondsToAddEnd;
    // console.log('start time is', startTime);
    this.getWeather(startTime);
  }

  weatherState(forecast) {
    this.setState({ weather: forecast.data });
  }

  dataBuilder(data) {
    // console.log('databuilder called', data);
    const temperaturePoints = [];
    const rainPoints = [];
    // console.log(data);
    const temps = [];
    const rains = [];

    for (let i = Math.floor(this.props.details.startBlock / 2); i < Math.ceil(this.props.details.endBlock / 2); i++) {
      console.log(i);
      const time = data[i].time * 1000; //refer to the time
      const temp = data[i].temperature; //refer to the temp
      const rain = data[i].precipProbability;
      console.log('reading iteration');
      temperaturePoints.push([time, temp]);
      rainPoints.push([time, rain]);
      temps.push(temp);
      rains.push(rain);
    }
    // console.log('temperaturepoints is ', temperaturePoints);
    // console.log('rainPoints is ', rainPoints);

    const tempSeries = new TimeSeries({
      name: 'Temperature',
      columns: ['time', 'temp'],
      points: temperaturePoints,
    });
    const rainSeries = new TimeSeries({
      name: 'Rain',
      columns: ['time', 'rain'],
      points: rainPoints,
    });

    // data.forEach(reading => {
    //   temps.push(reading.temperature);
    // });
    let highest = Math.max(...temps); // 4
    let lowest = Math.min(...temps); // 1
    let highRain = Math.max(...rains); // 4
    let lowRain = Math.min(...rains); // 1

    console.log(tempSeries);
    this.setState({
      temps: tempSeries,
      rains: rainSeries,
      low: lowest,
      high: highest,
      highRain: highRain,
      lowRain: lowRain,
    });
  }

  render() {
    let vis;
    if (this.state.temps.timerange) {
      vis = (
        <div className="weathervis">
          {
            <Resizable>
              <ChartContainer
                timeRange={this.state.temps.range()}
                onTrackerChanged={tracker =>
                  this.setState({
                    tracker,
                  })
                }
                trackerPosition={this.state.tracker}
                trackerTimeFormat="%X"
              >
                <ChartRow height="175">
                  <YAxis
                    id="temp"
                    label="Temperature (°F)"
                    labelOffset={5}
                    min={this.state.low}
                    max={this.state.high}
                    width="80"
                    type="linear"
                    style={style.axisStyle('temp')}
                    format=",.1f"
                  />
                  <Charts>
                    <LineChart axis="temp" series={this.state.temps} columns={['temp']} style={style} />
                    <LineChart axis="rain" series={this.state.rains} columns={['rain']} style={style} />
                  </Charts>
                  <YAxis
                    id="rain"
                    label="Chance of Rain"
                    labelOffset={5}
                    min={this.state.lowRain}
                    max={this.state.highRain + 0.05}
                    tickCount={2}
                    width="80"
                    type="linear"
                    style={style.axisStyle('rain')}
                    format=",.1f"
                  />
                </ChartRow>
              </ChartContainer>
            </Resizable>
          }
        </div>
      );
    }
    return <div className="weathervis">{vis}</div>;
  }
}
