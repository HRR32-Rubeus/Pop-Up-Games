import React from 'react';


/**
* A component to hold the user dashboard primary info to be displayed to the user
*/

class DashPrimary extends React.Component {
  constructor(props) {
    super(props);

    console.log('inbound props:', this.props.userData);
  }


  render () {
    return (
       <div>
         <div className='dash dash-welcome'>Welcome {this.props.userData.firstName} {this.props.userData.lastName}</div>

        <div className="dash profile-image image-one">
        </div>
      </div>

    );
  }
};


export default DashPrimary