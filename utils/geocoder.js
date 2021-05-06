const nodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_APIKEY,
  formatter: null,
};

module.exports = nodeGeocoder(options);

