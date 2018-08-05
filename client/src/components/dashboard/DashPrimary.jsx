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
      id: props.userData.id,
      username: props.userData.username,
      firstName: props.userData.firstName,
      lastName:  props.userData.lastName,
      address: props.userData.address
    }
    console.log('inbound props:', this.props.userData);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange_firstName = this.handleChange_firstName.bind(this);
    this.handleChange_lastName = this.handleChange_lastName.bind(this);
    this.handleChange_address = this.handleChange_address.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var data = {
      id: this.state.id,
      username: this.state.username,
      firstName:this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address
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

  handleChange_address(e) {
    //console.log('old add:', this.state.address);
    this.setState({address: e.target.value})
    //console.log('new add:', this.state.address);
  }


  render () {
    return (
       <div>
         <div className='dash dash-welcome'>User Dashboard</div>

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


          <label>
            Address:
            <input type="text" defaultValue={this.props.userData.address} onChange={this.handleChange_address}/>
          </label>

          <label>
           Lat:
            <input type="text" defaultValue={this.props.userData.lat} onChange={this.handleChange_address}/>
          </label>

           <label>
           Lng:
            <input type="text" defaultValue={this.props.userData.lng} onChange={this.handleChange_address}/>
          </label>


          <input type="submit" value="Submit" />
        </form>




      </div>
    );
  }
};


export default DashPrimary