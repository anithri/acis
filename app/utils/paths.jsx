export const s3PathFor = (stationId) =>
  `s3://agriculture-weather-data/${stationId}/weather_data_${stationId}_All.csv`

export const fetchDataPath = (stationId) => `/fetch_stations/${stationId}`
