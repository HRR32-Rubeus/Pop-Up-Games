import React from 'react';
import DashPrimary from './DashPrimary.jsx';

/**
* A component to hold the user dashboard to display details about the user
*/


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render () {
    return (
       <div className="main">
        <DashPrimary/>
      </div>

    );
  }
};

export default DashBoard;
