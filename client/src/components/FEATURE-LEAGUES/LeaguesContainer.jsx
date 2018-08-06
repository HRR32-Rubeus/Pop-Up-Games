import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LeaguesBody from './LeaguesBody.jsx';

/**
 * @description component that holds all the information about the Games
 * @param { Object } props.target object with keys indicating the current relevant targets
 * @param { Function } props.changeTarget function that can alter the target of the parent app, must be bound to app
 */

var LeaguesContainer = props => (
  <div className="main">
    <div>
      <LeaguesBody target={props.target} changeTarget={props.changeTarget} userInfo={props.userInfo} />
    </div>
  </div>
);

LeaguesContainer.propTypes = {
  target: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default LeaguesContainer;
