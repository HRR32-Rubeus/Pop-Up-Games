import React, { Component } from 'react';

export default class GameResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="indivfield hover-lightblue">
        Example Game <br />
        <strong>Team 1:</strong> {'Click to enter data.'} <br />
        <strong>Team 2:</strong> {'Click to enter data.'} <br />
        {/* <strong>Score: </strong> {this.props.data.result ? this.props.data.result : 'Click to enter score.'} <br /> */}
      </div>
    );
  }
}
