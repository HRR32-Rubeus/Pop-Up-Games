import React, { Component } from 'react';
import FormField from '../FormField.jsx';
import axios from 'axios';
import { withRouter } from 'react-router';

class CreateGame extends Component {
  constructor(props) {
    super(props);

    //this component should get the games data related to the event
    this.updateState = this.updateState.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    //do we need to get any data when this is mounted?
    //we can make a server call, or we can pass down all of it through propss
    console.log();
  }

  processForm() {
    this.state.otherErrors = false;
    if (this.state.teamOne === '' || this.state.notes === '') {
      this.setState({ otherErrors: true });
    } else {
      let newGame = {
        eventId: this.props.location.state.eventId,
        gameName: this.state.gameName,
        teamOne: this.state.teamOne,
        teamTwo: this.state.teamTwo,
        scoreOne: this.state.scoreOne,
        scoreTwo: this.state.scoreTwo,
        sportId: '',
      };
      this.createGame(newGame);
      console.log(newGame);
    }
  }

  createGame(params) {
    //this will send form data to the server
    //to the game table

    //will we need different components/calls for creation and editing?
    axios.post('/api/creategame', params, { headers: {} }).then(res => {
      console.log(res);
    });
  }

  updateState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      this.processForm();
    }
  }

  render() {
    return (
      <div className="main">
        <div className="search-container">
          <h2 className="center">Add the game's results here!</h2>
          <h4 className="center">{this.props.location.state.eventName}</h4>
          <div className="create-event-form">
            <div className="createeventdetailsgrid">
              <FormField
                className="input"
                txtId={'Game Name'}
                fieldName={'gameName'}
                updateState={this.updateState}
                handleEnter={this.handleEnter}
              />
              <FormField
                className="input"
                txtId={'Team 1'}
                fieldName={'teamOne'}
                updateState={this.updateState}
                handleEnter={this.handleEnter}
              />
              <FormField
                className="input"
                txtId={'Team 2'}
                fieldName={'teamTwo'}
                updateState={this.updateState}
                handleEnter={this.handleEnter}
              />
              <FormField
                className="input"
                txtId={'Team 1 Score'}
                fieldName={'scoreOne'}
                updateState={this.updateState}
                handleEnter={this.handleEnter}
              />
              <FormField
                className="input"
                txtId={'Team 2 Score'}
                fieldName={'scoreTwo'}
                updateState={this.updateState}
                handleEnter={this.handleEnter}
              />
              <button type="button" onClick={() => this.processForm()}>
                Submit
              </button>
            </div>
            <div className="timepickergrid">ScoreBoard Placeholder</div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(CreateGame);
