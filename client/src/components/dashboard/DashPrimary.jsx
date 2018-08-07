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
      favSports: props.userData.favSports,
      bio: props.userData.bio,
      updated: false,
      isSaved: true
    }
    console.log('inbound props:', this.props.userData);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange_firstName = this.handleChange_firstName.bind(this);
    this.handleChange_lastName = this.handleChange_lastName.bind(this);
    this.handleChange_address = this.handleChange_address.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubmitConfirm = this.renderSubmitConfirm.bind(this);
    this.handleChange_sports = this.handleChange_sports.bind(this);
    this.handleChange_bio = this.handleChange_bio.bind(this);
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
      address: this.state.address,
      favSports: this.state.favSports,
      bio: this.state.bio
    }

    axios
      .put('/api/updateUser', data)
      .then(res => {
        console.log('success');
       })
      .catch(err => console.log(err));

     this.setState({updated: true});
     this.setState({isSaved: true});
  }

  /**
   * @description detects a change in the firstName field and updates state accordingly
   * @param basic change event with value property
   * @return n/a
   */
  handleChange_firstName(e) {
    this.setState({firstName: e.target.value})
    this.setState({isSaved: false})
  }

  /**
   * @description detects a change in the lastName field and updates state accordingly
   * @param basic change event with value property
   * @return n/a
   */
  handleChange_lastName(e) {
    this.setState({lastName: e.target.value})
    this.setState({isSaved: false})
  }

  /**
   * @description detects a change in the address field and updates state accordingly
   * @param basic change event with value property
   * @return n/a
   */
  handleChange_address(e) {
    this.setState({address: e.target.value})
    this.setState({isSaved: false})
  }

  handleChange_sports (e) {
    this.setState({favSports: e.target.value})
    this.setState({isSaved: false})
  }

  handleChange_bio (e) {
    this.setState({bio: e.target.value})
    this.setState({isSaved: false})
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
                Username:
                  <div className="form-style dash-solid">{this.props.userData.username}</div>
              </div>

              <div>
                Email:
                  <div className="form-style dash-solid">{this.props.userData.email}</div>
              </div>
            <hr></hr>

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

            <label>
              List Some of Your Favorite Sports:
              <input type="text" defaultValue={this.props.userData.favSports} onChange={this.handleChange_sports}/>
            </label>

            <label>
              Tell Us A Bit About Yourself:
              <input type="text" defaultValue={this.props.userData.bio} onChange={this.handleChange_bio}/>
            </label>

            {this.renderSubmitConfirm()}

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
    if (this.state.isSaved === false) {
        return(<div className='dash-plain-unsaved'>You Have Unsaved Changes!</div>);
    } else {
        return(<div className='dash-plain-saved'>Your Profile Is UpToDate!</div>);
    }
  }


  render () {
    return (
       <div>
         <div className='dash dash-welcome'>Manage Your Profile</div>

         <div className="dash dash-plain">Please Verify Your Details Below</div>

        <div className= "dash profile-image" style={ { backgroundImage: `url(${this.props.imageLink})` } }></div>

        <div className="dash dash-plain dash-plain-grav">Don't See Your Picture Above? <a href="https://en.gravatar.com/site/signup/" target="_blank">Sign Up For A Gravitar Profile</a></div>


        {this.renderForm()}


      </div>
    );
  }
};


export default DashPrimary

// {this.state.updated === false ? this.renderForm() : this.renderSubmitConfirm()}