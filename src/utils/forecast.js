const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    " http://api.weatherstack.com/current?access_key=a829b30b147bd9cf2ab611b5517e7278&query=" +
    lat +
    "," +
    long +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          "," +
          " Temperature is: " +
          body.current.temperature +
          " Celsius"
      );
    }
  });
};

module.exports = forecast;
