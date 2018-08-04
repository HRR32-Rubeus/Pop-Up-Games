import React, { Component } from 'react';
import FormField from '../FormField.jsx';
import axios from 'axios';

export default class CreateGame extends Component {
  constructor(props) {
    super(props);

    //this component should get the games data related to the event
  }

  componentDidMount() {
    //do we need to get any data when this is mounted?
    //we can make a server call, or we can pass down all of it through propss
  }

  processForm() {
    this.state.otherErrors = false;
    if (this.state.teamOne === '' || this.state.notes === '') {
      this.setState({ otherErrors: true });
    } else {
      let newGame = {
        eventId: this.props.eventId, //from props
        gameName: this.state.gameName,
        teamOne: this.state.teamOne, //from form
        teamTwo: this.state.teamTwo, //from form
        scoreOne: this.state.scoreOne, //from form
        scoreTwo: this.state.scoreTwo, //from form
        sportId: '', //from props
      };
      this.createGame(newGame);
    }
  }

  createGame(params) {
    //this will send form data to the server
    //to the game table

    //will we need different components/calls for creation and editing?
    axios.post('/creategame', params, { headers: {} }).then(res => {
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
          <h2 className="center">
            Hello This is the Create Game Component, feature where people will be able to add scores to the game that
            they clicked.
          </h2>
          <h4 className="center">Event Title here</h4>
          <div className="create-event-form">
            <div className="createeventdetailsgrid">
              <form>
                <FormField
                  className="input"
                  txtId={'Game Name'}
                  fieldName={'gameName'}
                  updateState={this.updateState.bind(this)}
                  handleEnter={this.handleEnter.bind(this)}
                />
                <input placeholder="Game Name" type="text" /> <br />
                <input placeholder="Team 1" type="text" /> <br />
                <input placeholder="Team 2" type="text" /> <br />
                <input placeholder="Team 2 Score" type="number" /> <br />
                <input placeholder="Team 2 Score" type="number" /> <br />
                <button type="button" onClick={() => this.processForm()}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
