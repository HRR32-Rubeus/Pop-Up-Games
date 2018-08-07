import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GamesBody from './gamesBody.jsx';

/**
 * @description component that holds all the information about the Games
 * @param { Object } props.target object with keys indicating the current relevant targets
 * @param { Function } props.changeTarget function that can alter the target of the parent app, must be bound to app
 */

var GamesList = props => (
  <div className="main">
    <div>
      <GamesBody target={props.target} changeTarget={props.changeTarget} userInfo={props.userInfo} />
    </div>
  </div>
);

GamesList.propTypes = {
  target: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default GamesList;
