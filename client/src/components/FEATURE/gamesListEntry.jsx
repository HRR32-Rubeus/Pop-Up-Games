import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import GameResult from './GameResult.jsx';
import GameResultsContainer from './GameResultsContainer.jsx';

/**
 *
 * @description Component that holds all the data about an individual field entry
 * @param { Object } props.data object containing all the info about a single field
 */
class GamesListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: props.data,
    };
    console.log(this.props.data);
    this.changeTarget = props.changeTarget;
  }

  //this should route to and edit stats screen
  render() {
    return (
      <div
        className="gamefield hover-lightblue"
        onClick={() => {
          this.changeTarget({ type: 'game', id: this.props.data.id });
          this.props.history.push({
            pathname: '/creategame',
            state: { eventName: this.props.data.eventName },
          });
          console.log('game clicked');
        }}
      >
        <span className="bold">Game ID:</span> {this.props.data.id}
        <span className="bold"> {moment(this.props.data.date).format('MMM Do YY')} </span> <br />
        <span className="bold">Event Name: </span> {this.props.data.eventName} <br />
        <span className="bold">Notes:</span> {this.props.data.notes} <br />
        <GameResultsContainer />
      </div>
    );
  }
}
GamesListEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withRouter(GamesListEntry);
