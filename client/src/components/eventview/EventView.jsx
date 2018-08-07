import React from 'react';
import EventDetails from './EventDetails.jsx';
import MessageBoard from './MessageBoard.jsx';
import GuestList from './GuestList.jsx';
import axios from 'axios';
import utils from '../../../utils.js';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import md5 from 'js-md5';
import EventWeather from '../weather/EventWeather.jsx';

/**
 * @description Component that holds the overall view for an event
 */
class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.target.event,
      event: undefined,
      joined: false,
      message: '',
      modalIsOpen: false,
      user: {
        firstName: null,
        lastName: null,
        email: null,
        imageLink: null,
        bio: null,
        favSports: null,
      },
    };

    this.handleGuestClick = this.handleGuestClick.bind(this);
    this.toggleUserProfileModal = this.toggleUserProfileModal.bind(this);
    this.createImageLink = this.createImageLink.bind(this);
  }

  /**
   * @description calls the function to get the event data from the database when ready
   */
  componentWillMount() {
    this.getEventData();
  }

  /**
   * @description creates an axios get request to the event endpoint to get all the info about
   * the endpoint for the eventId passed in by the props.target.event
   * if the user is not logged in it will send them back to the homepage.
   */
  getEventData() {
    axios
      .get('/api/event', { params: { id: this.state.eventId } })
      .then(response => {
        console.log('response for event data:', response);
        this.setState({ event: response.data });
      })
      .catch(error => {
        if (error.response.status == 401 && error.response.data === 'user not logged in') {
          this.toggleAuth(false);
        } else {
          utils.errorHander(error);
        }
      });
  }

  /**
   * @description makes an axios post with the eventId from the target.event
   * which will tell the server to add the currently logged to the event guest list
   * if the user is not logged in it will send them back to the homepage.
   */
  joinEvent() {
    // todo this is another situation I dont understand why is wasn't letting us call this inside the object in the post
    let eventId = this.state.eventId;
    axios
      .post('/api/event/guest', { id: eventId })
      .then(response => {
        this.setState({ joined: true });
        this.getEventData();
      })
      .catch(error => {
        if (error.response.status == 401 && error.response.data === 'user not logged in') {
          this.toggleAuth(false);
        } else {
          utils.errorHandler(error);
        }
      });
  }

  /**
   * @description helper function that updates states of component
   * uses name of input field as state name and value of
   * input field as desired state
   * @param { <Object> } event typical event from html onChange
   * @example
   * <input type={text}
   * name={targetName}
   * value={targetValue}
   * onChange={this.updateState}
   * />
   * ...
   * this.setState({targetName: targetValue})
   * @return { undefined } undefined
   */

  updateState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description helper function that updates states of component
   * uses name of input field as state name and value of
   * input field as desired state
   * @param { <Object> } event typical event from html onKeyPress
   * @return { undefined } undefined
   */

  handleEnter(event) {
    if (event.key === 'Enter') {
      this.postMessage();
    }
  }
  /**
   * @description takes the message and eventId from state and tell
   * the server to log add the message to the database with the eventId and currentUser Id
   * if the user is not logged in it will send them back to the homepage.
   */
  postMessage() {
    let eventId = this.state.eventId;
    let message = this.state.message;
    axios
      .post('/api/message', { eventId: eventId, body: message })
      .then(response => {
        this.getEventData();
      })
      .catch(error => {
        if (error.response.status == 401 && error.response.data === 'user not logged in') {
          this.toggleAuth(false);
        } else {
          utils.errorHandler(error);
        }
      });
  }

  /**
   * @description renders a pop up modal with details of the guest who's name is clicked.
   * @param user profile details
   * @return a modal is rendered, but not data returned
   */

  handleGuestClick(firstName, lastName, email, bio, favSports) {
    let user = Object.assign({}, this.state.user);
    user.firstName = firstName;
    user.lastName = lastName;
    user.bio = bio;
    user.favSports = favSports;
    this.createImageLink(email);
    this.setState({ user });
    //this.toggleUserProfileModal();
  }

  /**
   * @description updates state to display modal
   * @param n/a
   * @return n/a
   */
  toggleUserProfileModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  /**
   * @description creates a link to a gravatar user's profile image, requires the use of md5 hash algorithm (installed as npm package)
   * @param String of the user's email.  The email must be trimmed of white space and converted to all lowercase
   * @return n/a
   */
  createImageLink(email) {
    email = email.trim();
    email = email.toLowerCase();
    const hash = md5(email);
    const imageLink = `https://en.gravatar.com/${hash}.json`;
    axios
      .get(imageLink)
      .then(response => {
        let imageLink = response.data.entry[0].thumbnailUrl;
        //add an 's' parameter to specify image default dimensions of 200px
        imageLink += 's=400';

        let user = Object.assign({}, this.state.user);
        user.imageLink = imageLink;
        this.setState({ user });
        this.toggleUserProfileModal();
      })
      .catch(err => {
        console.log('Oops! This User Doesnt Have A Gravatar Account!');
        //even if the gravatar profile image is not rendered, we still want to
        //render the modal window
        this.toggleUserProfileModal();
      });
  }

  render() {
    if (this.state.event === undefined) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="main event-view-body">
          <div className="eventinfo">
            <EventDetails details={this.state.event.event} />
            <button type="button" onClick={this.joinEvent.bind(this)}>
              Join Event
            </button>
          </div>
          <div className="eventweather">
            <EventWeather details={this.state.event.event} position={this.props.history.location.state.position} />
          </div>

          <div className=" messageboard">
            <MessageBoard messages={this.state.event.messages} />
            <FormField
              txtId={'Message'}
              fieldName={'message'}
              updateState={this.updateState.bind(this)}
              handleEnter={this.handleEnter.bind(this)}
            />
            <button type="button" onClick={this.postMessage.bind(this)}>
              Post
            </button>
          </div>
          <div className="guestlist">
            <FormError check={this.state.joined} message={'You have been added to the guest list'} />
            <GuestList GuestList={this.state.event.guests} handleGuestClick={this.handleGuestClick} />
          </div>

          <div>
            <Modal show={this.state.modalIsOpen} onClose={this.toggleUserProfileModal}>
              <div>Currently Viewing {this.state.user.firstName}'s User Profile:</div>

              <div className="dash profile-image" style={{ backgroundImage: `url(${this.state.user.imageLink})` }} />

              <div className="form-style">
                <div>
                  <div className="boldMod">First Name: </div>
                  <div>{this.state.user.firstName}</div>
                </div>

                <div>
                  <div className="boldMod">Last Name: </div>
                  <div>{this.state.user.lastName}</div>
                </div>

                <div>
                  <div className="boldMod">About Me: </div>
                  <div>{this.state.user.bio}</div>
                </div>

                <div>
                  <div className="boldMod">Favorite Sports: </div>
                  <div>{this.state.user.favSports}</div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      );
    }
  }
}

EventView.propTypes = {
  target: PropTypes.object.isRequired,
};

export default EventView;
