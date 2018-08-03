import React from 'react';
import axios from 'axios';
import DashPrimary from './DashPrimary.jsx';
import md5 from 'js-md5';
/*https://www.npmjs.com/package/js-md5*/
/**
* A component to hold the user dashboard to display details about the user
*/


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      imageLink: null
    }
    this.getUserData = this.getUserData.bind(this);
    this.createImageLink = this.createImageLink.bind(this);
  }

  componentDidMount () {
    console.log('hello component');
    this.getUserData();
  }

  getUserData () {
    axios.get('/api/me')
      .then(userData => {
        this.setState({userData: userData});
        this.createImageLink(userData.data.email);
      })
      .catch(err => console.log(err));
  }

  createImageLink (email) {
    email = email.trim();
    email = email.toLowerCase();
    const hash = md5(email);
    const imageLink =`https://en.gravatar.com/${hash}.json`;
    console.log(imageLink);
    axios.get(imageLink)
      .then(response => console.log('grav response', response.data.entry[0].thumbnailUrl))
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
