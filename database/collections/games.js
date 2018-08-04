const db = require('../config');
const Game = require('../models/game');

const Games = new db.Collection();

Games.model = Field;

module.exports = Games;
