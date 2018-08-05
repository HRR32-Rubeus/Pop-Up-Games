import React, { Component } from 'react';
import axios from 'axios';

export default class GameResult extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('/api/gameresults').then(res => console.log(res));
  }

  render() {
    return (
      <div className="gamefield hover-blue">
        {this.props.game.gameName} <br />
        <span className="bold">Team 1:</span> {this.props.game.teamOne} <br />
        <span className="bold">Team 2:</span> {this.props.game.teamTwo} <br />
        <span className="bold">Score 1:</span> {this.props.game.scoreOne} <br />
        <span className="bold">Score 2:</span> {this.props.game.scoreTwo} <br />
        {/* <strong>Score: </strong> {this.props.data.result ? this.props.data.result : 'Click to enter score.'} <br /> */}
      </div>
    );
  }
}
