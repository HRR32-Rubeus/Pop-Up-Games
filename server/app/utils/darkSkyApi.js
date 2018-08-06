const axios = require('axios');
const DARKSKY_KEY = process.env.DARKSKY_KEY || require('../../../config/config.js').DARKSKY_KEY;
const request = require('request');

const getWeather = (query, callback) => {
  //call weather api
  const lat = query.lat;
  const lng = query.lng;
  console.log('getWeather called', lat, lng);

  const options = {
    url: `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`,
    headers: {
      'User-Agent': 'request',
    },
  };

  request(options, (err, res, body) => {
    if (err) {
      console.log(err);
      callback(JSON.parse(body));
    } else {
      console.log(JSON.parse(body));
      callback(JSON.parse(body));
    }
  });
};

// const getWeather = (req, res) => {
//   //call weather api
//   const lat = req.query.lat;
//   const lng = req.query.lng;
//   console.log('getWeather called');
//   axios
//     .get(`https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`)
//     .then(data => {
//       res.send(JSON.parse(data.currently));
//     })
//     .catch(err => console.log(err));
// };

exports.getWeather = getWeather;
