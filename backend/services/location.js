const getLocationForCity = (city) => {
  switch (city) {
    case "Bodrum":
      return {
        lat: 37.0217,
        lng: 27.2545,
      };

    case "Antalya":
      return {
        lat: 36.884804,
        lng: 30.704044,
      };

    case "Kemer":
      return {
        lat: 36.3853,
        lng: 29.2132,
      };

    case "Marmaris":
      return {
        lat: 36.8571,
        lng: 28.2692,
      };
    case "Kaş":
      return {
        lat: 36.2675,
        lng: 29.4151,
      };
    default:
      return {
        lat: 36.8571,
        lng: 28.2692,
      };
  }
};

module.exports = {
  getLocationForCity,
};
