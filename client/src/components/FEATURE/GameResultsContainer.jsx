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
      gamesData: [],
    };
  }

  componentDidMount() {
    axios.get('/api/gameresults', { params: { eventId: this.props.eventId } }).then(res => {
      console.log('res from gameresults is', res.data);
      this.setState({ gamesData: res.data });
    });
  }

  render() {
    return (
      <div>
        {this.state.gamesData
          ? this.state.gamesData.map((game, i) => <GameResult game={game} key={i} eventId={this.props.eventId} />)
          : ''}
      </div>
    );
  }
}
