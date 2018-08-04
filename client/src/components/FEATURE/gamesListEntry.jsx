import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import GameResult from './GameResult.jsx';

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
        className="indivfield hover-lightblue"
        onClick={() => {
          this.changeTarget({ type: 'game', id: this.props.data.id });
          this.props.history.push('/creategame');
          console.log('game clicked');
        }}
      >
        <strong>Game ID:</strong> {this.props.data.id} <br />
        <strong>Event Name: </strong> {this.props.data.eventName} <br />
        <strong>Notes:</strong> {this.props.data.notes} <br />
        <strong>{moment(this.props.data.date).format('MMM Do YY')} </strong> <br />
        {/* here we will map the games' results */}
        <GameResult />
      </div>
    );
  }
}
GamesListEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withRouter(GamesListEntry);
