var db = require('../config');
var Game = require('../models/game');

var Games = new db.Collection();

Games.model = Field;

module.exports = Games;
