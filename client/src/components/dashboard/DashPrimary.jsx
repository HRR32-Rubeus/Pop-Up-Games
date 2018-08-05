import React from 'react';
import axios from 'axios';

/**
* A component to hold the user dashboard primary info to be displayed to the user
*/


class DashPrimary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.userData.id,
      username: props.userData.username,
      firstName: props.userData.firstName,
      lastName:  props.userData.lastName,
      address: props.userData.address,
      updated: false
    }
    console.log('inbound props:', this.props.userData);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange_firstName = this.handleChange_firstName.bind(this);
    this.handleChange_lastName = this.handleChange_lastName.bind(this);
    this.handleChange_address = this.handleChange_address.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubmitConfirm = this.renderSubmitConfirm.bind(this);
  }

  /**
   * @description handles the update-profile button, by submitting all user information to be stored in the database
   * @param click event, to which default is prevented
   * @return a state change is initiated that will give a user confirmation of their profile update form submission.
   */
  handleSubmit(e) {
    e.preventDefault();
    var data = {
      id: this.state.id,
      username: this.state.username,
      firstName:this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address
    }

    axios
      .put('/api/updateUser', data)
      .then(res => {
        console.log('success');
       })
      .catch(err => console.log(err));

     this.setState({updated: true})
  }

  /**
   * @description detects a change in the firstName field and updates state accordingly
   * @param basic change event with value property
   * @return n/a
   */
  handleChange_firstName(e) {
    this.setState({firstName: e.target.value})
  }

  /**
   * @description detects a change in the lastName field and updates state accordingly
   * @param basic change event with value property
   * @return n/a
   */
  handleChange_lastName(e) {
    //console.log('old last name:', this.state.lastName);
    this.setState({lastName: e.target.value})
    //console.log('new last name:', this.state.lastName)
  }

  /**
   * @description detects a change in the address field and updates state accordingly
   * @param basic change event with value property
   * @return n/a
   */
  handleChange_address(e) {
    //console.log('old add:', this.state.address);
    this.setState({address: e.target.value})
    //console.log('new add:', this.state.address);
  }

  /**
   * @description if user has not submitted form, this will render the form
   * @param n/a
   * @return n/a
   */
  renderForm () {
    return (
        <div className="form-style dash">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                First Name:
                <input type="text" defaultValue={this.props.userData.firstName} onChange={this.handleChange_firstName} />
              </label>
            </div>

            <div>
              <label>
                Last Name:
                <input type="text" defaultValue={this.props.userData.lastName} onChange={this.handleChange_lastName}/>
              </label>
            </div>


            <label>
              Address:
              <input type="text" defaultValue={this.props.userData.address} onChange={this.handleChange_address}/>
            </label>

            <button className="profile-button dash-plain" onClick={this.handleSubmit}><span>UPDATE MY PROFILE</span></button>

          </form>
        </div>
    );
  }

  /**
   * @description if user has submitted form, this will render a submission confirmation page
   * @param n/a
   * @return n/a
   */
  renderSubmitConfirm () {
    return (
      <div className='dash-plain'>Your Profile Has Been Updated!</div>
    );
  }


  render () {
    return (
       <div>
         <div className='dash dash-welcome'>Manage Your Profile</div>

         <div className="dash dash-plain">Please Verify Your Details Below</div>

        <div className= "dash profile-image" style={ { backgroundImage: `url(${this.props.imageLink})` } }></div>

        <hr></hr>
        {this.state.updated === false ? this.renderForm() : this.renderSubmitConfirm()}

      </div>
    );
  }
};


export default DashPrimary