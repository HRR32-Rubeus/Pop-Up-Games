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
        <span className="bold">{this.props.game.gameName}</span> <br />
        <span className="bold">Team 1:</span> {this.props.game.teamOne} <br />
        <span className="bold">Team 2:</span> {this.props.game.teamTwo} <br />
        <span className="bold">Score 1:</span> {this.props.game.scoreOne} <br />
        <span className="bold">Score 2:</span> {this.props.game.scoreTwo} <br />
        {/* <strong>Score: </strong> {this.props.data.result ? this.props.data.result : 'Click to enter score.'} <br /> */}
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
