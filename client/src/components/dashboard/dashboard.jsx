import React from 'react';
import axios from 'axios';
import DashPrimary from './DashPrimary.jsx';

/**
* A component to hold the user dashboard to display details about the user
*/


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    }
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount () {
    console.log('hello component');
    this.getUserData();
  }

  getUserData () {
    axios.get('/api/me')
      .then(userData => {
        this.setState({userData: userData});
      })
      .catch(err => console.log(err));
  }


  render () {
    return (
       <div className="main">
        {this.state.userData !== null ? <DashPrimary userData={this.state.userData.data}/> : null}
      </div>

    );
  }
};

export default DashBoard;
