import React from 'react';
import GMap from './GMap.jsx';
import PropTypes from 'prop-types';
import VenueList from './VenueList.jsx';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

/**
 * @description gets the users account data, then gets nearby venues
 * and plots them on a map, also outputs a list of venues to the right of the map
 * @param toggleAuth function that is bound to parent that changes the state of loggedIn to arg[0]
 * @param userInfo object containing data on the user
 */

// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: props.userInfo,
//       position: { lat: props.userInfo.lat, lng: props.userInfo.lng, address: props.userInfo.address },
//       nearbyVenues: [],
//     };
//     this.changeTarget = props.changeTarget;
//   }

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.userInfo,
      renderMap: false,
      position: { lat: props.userInfo.lat, lng: props.userInfo.lng, address: props.userInfo.address },
      nearbyVenues: [],
      dist: 20,
    };
    this.changeTarget = props.changeTarget;

    //console.log('constructor old userdata', props.userInfo)
  }
  /**
   * @description Executes a get request to the venues endpoint to get all the venues in range to display on the map
   * if the user is not logged in it will send them back to the homepage.
   *
   * HAGRID: added a GET param that sends a user defined distance,
   * rather than showing all venues within a 20mi hardcoded distance.
   * switched to "DidMount" since "WillMount" is depreciated
   */

  componentDidMount() {
    axios
      .get('/api/venues', {
        params: {
          dist: this.state.dist,
        },
      })
      .then(response => {
        this.setState({ nearbyVenues: response.data });
        console.log(response.data);
      })
      .catch(error => {
        if (error.response.status == 401 && error.response.data === 'user not logged in') {
          this.toggleAuth(false);
        } else {
          console.log(error);
        }
      });
  }

  /**
   * @description Used to re-render the Venue list based on what distance was selected by the user.
   * venueDistRadius is passed as a prop to <VenueList/> where a dropdown menu returns the distance the user
   * would like to search and updates the dist prop in Home.jsx accordingly.
   * Venue list is then re-rendered via a function call since update in parent prop wont re-render children
   */
  venueDistRadius(e) {
    let userDist = parseInt(e.target.value);
    axios
      .get('/api/venues', {
        params: {
          dist: userDist,
        },
      })
      .then(response => {
        this.setState({ dist: userDist });
        this.setState({ nearbyVenues: response.data });
        console.log(response.data);
        this.venueListRender();
        this.gMapRender();
      })
      .catch(error => {
        if (error.response.status == 401 && error.response.data === 'user not logged in') {
          this.toggleAuth(false);
        } else {
          console.log(error);
        }
      });

    axios
      .get('/api/me')
      .then(userData => {
        //update the position property as follows b/c it's an object
        let position = Object.assign({}, this.state.position);
        position.lat = userData.data.lat;
        position.lng = userData.data.lng;
        position.address = userData.data.address;
        //now set state of the new values for position state
        this.setState({ user: userData.data });
        this.setState({ position });
        this.setState({ renderMap: true });
      })
      .catch(err => console.log(err));
  }

  venueListRender() {
    return (
      <VenueList
        changeTarget={this.changeTarget}
        venues={this.state.nearbyVenues}
        dist={this.venueDistRadius.bind(this)}
      />
    );
  }

  gMapRender() {
    /**
     * A WARNING FOR ALL YE WHO ENTER HERE.  THE google-maps-react docs are poorly written and
     * it was not fun to set this up.  Unless you wish to have first hand experience understanding why
     * people should document code they upload for others to use I would avoid messing with the GMap component
     */
    return <GMap position={this.state.position} venues={this.state.nearbyVenues} />;
  }
  /**
   * @description takes the nearby venues and the user data and generates a map centered on the users home with nearby
   * points plotted around it
   */
  render() {
    if (this.state.position === undefined || this.state.renderMap === false) {
      return (
        <div>
          <h1>Homepage</h1>
          <h2>Loading</h2>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="venuemap">{this.gMapRender()}</div>
          <div>
            <div className="venuecolumn">
              <VenueList
                changeTarget={this.changeTarget}
                venues={this.state.nearbyVenues}
                positions={this.state.position}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

Home.propTypes = {
  userInfo: PropTypes.object.isRequired,
  toggleAuth: PropTypes.func.isRequired,
};
export default withRouter(Home);
