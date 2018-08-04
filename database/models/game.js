var db = require('../config');

var Game = db.Model.extend({
  tableName: 'games',
  hasTimeStamps: true,
  event: function() {},
  teamOne: function() {},
  teamTwo: function() {},
  scoreOne: function() {},
  scoreTwo: function() {},
});

module.exports = db.model('Game', Game);
