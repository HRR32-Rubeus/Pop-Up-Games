import React from 'react';
import axios from 'axios';

/**
* A component to hold the user dashboard primary info to be displayed to the user
*/

// var sec = {
//   width: "100%",
//   height: "400px",
//   backgroundImage: `url(${this.props.imageLink})`
// };

class DashPrimary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.userData.username,
      firstName: props.userData.firstName,
      lastName:  props.userData.lastName
    }
    console.log('inbound props:', this.props.userData);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange_firstName = this.handleChange_firstName.bind(this);
    this.handleChange_lastName = this.handleChange_lastName.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var data = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }

    console.log('stuff being sent:', data);
    axios
      .post('/api/updateUser', data)
      .then(res => console.log('success'))
      .catch(err => console.log(err));
  }

  handleChange_firstName(e) {
    this.setState({firstName: e.target.value})
  }

  handleChange_lastName(e) {
    //console.log('old last name:', this.state.lastName);
    this.setState({lastName: e.target.value})
    //console.log('new last name:', this.state.lastName)
  }


  render () {
    return (
       <div>
         <div className='dash dash-welcome'>Welcome {this.props.userData.firstName} {this.props.userData.lastName}</div>

         <div className="dash dash-plain">Please Verify Your Details Below</div>

        <div className= "dash profile-image" style={ { backgroundImage: `url(${this.props.imageLink})` } }></div>

        <hr></hr>

        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" defaultValue={this.props.userData.firstName} onChange={this.handleChange_firstName} />
          </label>

          <label>
            Last Name:
            <input type="text" defaultValue={this.props.userData.lastName} onChange={this.handleChange_lastName}/>
          </label>

          <input type="submit" value="Submit" />
        </form>




      </div>
    );
  }
};


export default DashPrimary