import React from 'react';
import axios from 'axios';

/**
* A component to hold the user dashboard primary info to be displayed to the user
*/

class DashPrimary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount () {
    console.log('hello component');
    this.getUserName();
  }

  getUserName () {
    console.log('hello getUserName');
  }

  render () {
    return (
       <div>
         <div>Welcome Uday</div>

         <div className="dash-title">
          User Details
        </div>
      </div>

    );
  }
};


export default DashPrimary