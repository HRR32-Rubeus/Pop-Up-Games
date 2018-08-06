import React, { Component } from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts';
import { TimeSeries } from 'pondjs';

export default class WeatherVis extends Component {
  constructor(props) {
    super(props);
    console.log('constructor props', this.props);
  }

  componentDidMount() {
    // console.log('this.props is', this.props);
    this.constructData(this.props.weatherData);
  }

  constructData(data) {
    const temperaturePoints = [];
    console.log(data);

    data.forEach(reading => {
      const time = reading.time; //refer to the time
      const temp = reading.temp; //refer to the temp
      console.log('reading iteration');
      temperaturePoints.push([time, temp]);
    });

    const tempSeries = new TimeSeries({
      name: 'Temperature',
      columns: ['time', 'temp'],
      points: temperaturePoints,
    });

    console.log(temperaturePoints);
    console.log(tempSeries);
    this.setState({ tempSeries: tempSeries });
  }

  render() {
    return (
      <div>
        Hello!
        {!this.props.weatherData[1] ? '' : this.state.tempSeries}
      </div>
    );
  }
}

// <ChartContainer timeRange={this.state.tempSeries.timerange()} width={800}>
//   <ChartRow height="200">
//     <YAxis id="axis1" label="AUD" min={0.5} max={1.5} width="60" type="linear" format="$,.2f" />
//     <Charts>
//       <LineChart axis="axis1" series={series1} column={['aud']} />
//       <LineChart axis="axis2" series={series2} column={['euro']} />
//     </Charts>
//     <YAxis id="axis2" label="Euro" min={0.5} max={1.5} width="80" type="linear" format="$,.2f" />
//   </ChartRow>
// </ChartContainer>
