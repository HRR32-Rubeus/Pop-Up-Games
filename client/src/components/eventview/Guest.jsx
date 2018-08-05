import React from 'react';
import PropTypes from 'prop-types';

/**
 * @desctption simple component to hold and individual guest in the guestlist
 * todo I feel like this could be dressed up much better
 */

const update = function (handleGuestClick, firstName, lastName, email) {
  handleGuestClick(firstName, lastName, email);
};


var Guest = props => (
  <li>
    <div onClick={update.bind(null, props.handleGuestClick, props.guest.firstName, props.guest.lastName, props.guest.email)}>{`${props.guest.firstName} ${props.guest.lastName}`}</div>
  </li>
);

Guest.propTypes = {
  guest: PropTypes.object.isRequired,
};

export default Guest;
