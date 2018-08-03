import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class VenueEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: props.venue,
    };
    this.changeTarget = props.changeTarget;
  }

  render() {
    return (
      <li>
        <div
          className="venuelistentry toneone "
          onClick={() => {
            this.changeTarget({ type: 'venue', id: this.props.venue.id });
            this.props.history.push('venue');
          }}
        >
          <span className="bold">Name: </span>
          <span>{this.props.venue.venueName}</span>
          <br />
          <br />
          <span className="bold">Address: </span>
          <span>{this.props.venue.address}</span>
          <br />
          <br />
        </div>
      </li>
    );
  }
}

VenueEntry.propTypes = {
  venue: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
};

export default withRouter(VenueEntry);
