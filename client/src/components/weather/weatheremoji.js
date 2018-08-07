const emojiProducer = string => {
  const translate = {
    'clear-day': '🌞',
    'clear-night': '🌃',
    rain: '🌧',
    snow: '🌨',
    sleet: '🍧',
    wind: '🌬️',
    fog: '🌫️',
    cloudy: '☁️',
    'partly-cloudy-day': '🌥️',
    'partly-cloudy-night': '🌆',
  };

  return translate[string];
};

export default emojiProducer;
