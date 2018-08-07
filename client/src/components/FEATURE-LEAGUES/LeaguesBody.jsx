import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
//import GamesList from './gamesList.jsx';

/**
 * @description Contains the body of the Games page
 * @param { Object } props.target a obect with keys indicating the most recently accessed of each of the variables
 * @param { Function } props.changeTarget a function bound to App that changes the value of target based on a key value pair passed to it
 */
class LeaguesBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGames: [],
      userId: props.userInfo.id,
    };
    /**
     * @description function that changes the value of apps target state
     * @example changeTarget({venue: 3}) would change the venue value of target to 3
     * @returns { undefined } undefined
     */
    this.changeTarget = props.changeTarget;
  }
  /**
   * @description when the component first mounts it will get all the information about the user's games
   * currently it uses the user's
   * session id, and not the param sent by the get request.
   * It does send the data to the server though.
   */
  componentWillMount() {
    //this.getUserGamesInfo();
  }

  /**
   * @description renders the Object and child components
   */
  render() {
    if (this.state.userId === undefined) {
      return <div>Loading, {this.state.userId}</div>;
    } else {
      return (
        <div className="venue-body">
          <div className="venue-name">{this.props.userInfo.firstName}'s Leagues</div>
          <div className="venueinfo">Your Game History</div>
          <div className="fieldlist">
            PlaceHolder
            {/* <GamesList games={this.state.userGames} changeTarget={this.props.changeTarget} /> */}
          </div>
        </div>
      );
    }
  }
}

LeaguesBody.propTypes = {
  target: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
};

export default withRouter(LeaguesBody);
