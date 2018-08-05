import React, { Component } from 'react';
import GameResult from './GameResult.jsx';
import axios from 'axios';

const fakeData = [
  {
    gameName: 'NBA Finals 2008',
    scoreOne: 65,
    scoreTwo: 53,
    teamOne: 'Lakers',
    teamTwo: 'Celtics',
  },
  {
    gameName: 'NBA Finals 1996',
    scoreOne: 34,
    scoreTwo: 54,
    teamOne: 'Jazz',
    teamTwo: 'Bulls',
  },
  {
    gameName: 'NBA Finals Game 1',
    scoreOne: 75,
    scoreTwo: 54,
    teamOne: 'Warriors',
    teamTwo: 'Cavaliers',
  },
];

export default class GameResultsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: fakeData,
    };
  }

  render() {
    return <div>{this.state.games.map(game => <GameResult game={game} />)}</div>;
  }
}
