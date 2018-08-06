import React, { Component } from 'react';
import GameResult from './GameResult.jsx';
import axios from 'axios';

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
