var db = require('../config');
var Event = require('./event.js');

var Game = db.Model.extend({
  tableName: 'games',
  hasTimeStamps: true,
  event: function() {
    return this.belongsTo('Event', 'eventId');
  },
  // teamOne: function() {},
  // teamTwo: function() {},
  // scoreOne: function() {},
  // scoreTwo: function() {},
});

module.exports = db.model('Game', Game);
