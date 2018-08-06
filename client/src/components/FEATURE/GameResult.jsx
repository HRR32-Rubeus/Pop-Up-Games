import React, { Component } from 'react';
import axios from 'axios';

export default class GameResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: {},
    };
  }

  // componentDidMount() {
  //   axios.get('/api/gameresults', { params: { eventId: this.props.eventId } }).then(res => {
  //     console.log('res from gameresults is', res);
  //     this.setState({ gameData: res.data });
  //   });
  // }

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

//old placeholder rener
// render() {
//   return (
//     <div className="gamefield hover-blue">
//       {this.props.game.gameName} <br />
//       <span className="bold">Team 1:</span> {this.props.game.teamOne} <br />
//       <span className="bold">Team 2:</span> {this.props.game.teamTwo} <br />
//       <span className="bold">Score 1:</span> {this.props.game.scoreOne} <br />
//       <span className="bold">Score 2:</span> {this.props.game.scoreTwo} <br />
//       {/* <strong>Score: </strong> {this.props.data.result ? this.props.data.result : 'Click to enter score.'} <br /> */}
//     </div>
//   );
// }
