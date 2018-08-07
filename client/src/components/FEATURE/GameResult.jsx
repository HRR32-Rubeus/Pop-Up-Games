import React, { Component } from 'react';

export default class GameResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: {},
    };
  }

  render() {
    return (
      <div className="gamefield hover-blue">
        <div className="game-heading">{this.props.game.gameName}</div> <br />
        <div className="game-score-container">
          <div className="game-team-left">{this.props.game.teamOne}</div>
          <div className="game-score-left">{this.props.game.scoreOne}</div>
          <div className="game-score-right">{this.props.game.scoreTwo}</div>
          <div className="game-team-right">{this.props.game.teamTwo}</div>
        </div>
      </div>
    );
  }
}
