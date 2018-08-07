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

const getWeatherTime = (query, callback) => {
  //call weather api
  const lat = query.lat;
  const lng = query.lng;
  const time = query.time;
  console.log('getWeatherTime called', lat, lng);

  const options = {
    url: `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng},${time}`,
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

exports.getWeather = getWeather;
exports.getWeatherTime = getWeatherTime;
