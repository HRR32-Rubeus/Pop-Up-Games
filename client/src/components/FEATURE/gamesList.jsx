import React from 'react';
import GamesListEntry from './GamesListEntry.jsx';
import PropTypes from 'prop-types';
/**
 * @description component use to hold a list of games entries
 * @param { Array } props.games an array of games objects
 *
 */
const GamesList = props => (
  <div>
    {props.games.map((game, index) => {
      return <GamesListEntry data={game} key={index} changeTarget={props.changeTarget} />;
    })}
  </div>
);

GamesList.propTypes = {
  games: PropTypes.array.isRequired,
};

export default GamesList;
