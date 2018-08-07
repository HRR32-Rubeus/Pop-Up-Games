import React from 'react';
import axios from 'axios';
import DashPrimary from './DashPrimary.jsx';
import md5 from 'js-md5';
/*https://www.npmjs.com/package/js-md5*/
/**
* A component to hold the user dashboard to display details about the user
*/

  /**
   * @description holds the dashboard for the user profile
   * @param { Object || false } state the desired state of loggedIn.  False or the profile of logged in user
   * @return { null } nothing
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
    this.getUserData();
  }

  /**
   * @description gets the current userdata to prepopulate profile fields
   * @param n/a
   * @return n/a
   */
  getUserData () {
    axios.get('/api/me')
      .then(userData => {
        this.setState({userData: userData});
        this.createImageLink(userData.data.email);
        console.log('user data state:', this.state.userData);
      })
      .catch(err => console.log(err));
  }

  /**
   * @description creates a link to a gravatar user's profile image, requires the use of md5 hash algorithm (installed as npm package)
   * @param String of the user's email.  The email must be trimmed of white space and converted to all lowercase
   * @return n/a
   */
  createImageLink (email) {
    email = email.trim();
    email = email.toLowerCase();
    const hash = md5(email);
    const imageLink =`https://en.gravatar.com/${hash}.json`;
    axios.get(imageLink)
      .then(response => {
        let imageLink = response.data.entry[0].thumbnailUrl;
        //add an 's' parameter to specify image default dimensions of 200px
        imageLink += 's=400';
        this.setState({imageLink: imageLink});
      })
      .catch(err => console.log('Oops this user doesnt have a gravatar account!'));

  }


  render () {
    return (
       <div className="main">
        {this.state.userData !== null ? <DashPrimary userData={this.state.userData.data} imageLink={this.state.imageLink}/> : null}
      </div>

    );
  }
};

export default DashBoard;
