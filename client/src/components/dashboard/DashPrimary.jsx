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
      firstName: props.userData.firstName
    }
    console.log('inbound props:', this.props.userData);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange_firstName = this.handleChange_firstName.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var data = {
      username: 'trivediu',
      firstName: 'udayUpdate7',
      lastName: 'trivediUpdate',
    }

    axios
      .post('/api/updateUser', data)
      .then(res => console.log('success'))
      .catch(err => console.log(err));
  }

  handleChange_firstName(e) {
    this.setState({firstName: e.target.value})
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
            <input type="text" defaultValue={this.props.userData.lastName}/>
          </label>

          <input type="submit" value="Submit" />
        </form>




      </div>
    );
  }
};


export default DashPrimary