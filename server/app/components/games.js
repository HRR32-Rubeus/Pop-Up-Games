const util = require('../utils/utils');
const db = require('../../../database/helpers');

const test = (req, res, next) => {
  console.log(req.body);
  //res.send('get user endpoint');
  util.getRes(
    new Promise((resolve, reject) => {
      req.body ? resolve(res.send(req.body)) : reject();
    })
  );
};

const getUser = (req, res, next) => {
  util.getRes(db.getUserEvents({ username: req.session.user }), res);
};

/****UNDER CONSTRUCTION */
const getGameResults = (req, res, next) => {
  // util.getRes(util.buildRes(['events', 'games'], db.getEvent(req.query), db.getGames(req.query)), res);
  util.getRes(db.getGames(req.query), res);
};

const createGame = (req, res, next) => {
  console.log('createGame called');

  //we want to add an entry to the games table here.
  //add teamOne, teamTwo, scoreOne, scoreTwo, gameName, eventID

  util.postRes(db.saveGame((req.body.username = req.session.user) && req.body), res);

  res.send('createGame called');
};
/****UNDER CONSTRUCTION */

exports.getUser = getUser;
exports.getGameResults = getGameResults;
exports.createGame = createGame;
// const addMeToEvent = (req, res) => util.postRes(db.saveGuest((req.body.username = req.session.user) && req.body), res);

// const create = (req, res) => util.postRes(db.saveEvent((req.body.username = req.session.user) && req.body), res);

// const get = (req, res) =>
//   util.getRes(
//     util.buildRes(
//       ['event', 'messages', 'guests'],
//       db.getEvent(req.query),
//       db.getMessages(req.query),
//       db.getGuests(req.query)
//     ),
//     res
//   );

// const getMyEvents = (req, res) => util.getRes(db.getUserEvents({ username: req.session.user }), res);

// const addMessage = (req, res) => util.postRes(db.saveMessage((req.body.username = req.session.user) && req.body), res);

// exports.addMeToEvent = addMeToEvent;
// exports.create = create;
// exports.get = get;
// exports.getMyEvents = getMyEvents;
// exports.addMessage = addMessage;
