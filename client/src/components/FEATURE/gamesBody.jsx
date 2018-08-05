import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import GamesList from './gamesList.jsx';

/**
 * @description Contains the body of the Games page
 * @param { Object } props.target a obect with keys indicating the most recently accessed of each of the variables
 * @param { Function } props.changeTarget a function bound to App that changes the value of target based on a key value pair passed to it
 */
class GamesBody extends React.Component {
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
    this.getUserGamesInfo();
  }
  /**
   * @description sends axios request to server
   * takes no params
   * stores the results of the query in this.state.userGames
   * if the user is not logged in it will send them back to the homepage.
   */

  getUserGamesInfo() {
    axios
      .get('/api/games', {
        params: {
          id: this.state.userId,
        },
      })
      .then(response => {
        console.log('response from server: ', response);
        this.setState({ userGames: response.data });
      })
      .catch(error => {
        if (error.response.status == 401 && error.response.data === 'user not logged in') {
          this.toggleAuth(false);
        } else {
          console.log(error);
        }
      });
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
          <div className="venue-name">{this.props.userInfo.firstName}'s Games</div>
          <div className="venueinfo">Venue info Class</div>
          <div className="fieldlist">
            <GamesList games={this.state.userGames} changeTarget={this.props.changeTarget} />
          </div>
        </div>
      );
    }
  }
}

GamesBody.propTypes = {
  target: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
};

export default withRouter(GamesBody);
