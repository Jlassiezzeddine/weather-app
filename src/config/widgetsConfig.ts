export const WIDGETS_CONFIGURATION = {
  overview: {
    value: `${22}°C`,
    description: "Sunny",
    max: `${22}°`,
    min: `${12}°`,
  },
  "uv-index": {
    value: 7,
    description: "High level",
  },
  "wind-status": {
    value: `${13.7} km/h`,
  },
  "sunrise-&-sunset": {
    sunrise: new Date(),
    sunset: new Date(),
  },
  predictions: {
    "24-h": `${100} mm \n in the last 24 h`,
    forecast: `${650} mm in the next 6 days`,
  },
  humidity: {
    value: `${71} %`,
    "dew-point": `the dew point is ${11}°`,
  },
  visibility: {
    value: `${10} km`,
    clarity: "The sky is partially clear",
  },
};
