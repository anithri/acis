const url = process.env['API_BASE_URL']
const API_TOKEN = process.env['API_TOKEN']
const getStationsUrl = url + '/getStationInfo'
const getStationDataUrl = url + '/getExistingLastDate'

const headers = {
  'x-api-key': API_TOKEN,
  'Content-Type': 'application/json',
  'Content-Encoding': 'gzip',
}

export const getStations = async () =>
  await fetch(getStationsUrl, { headers })
    .catch((e) => console.log('error stations', e))
    .then((res) => res.json())

export const getStationData = async () =>
  await fetch(getStationDataUrl, { headers })
    .catch((e) => console.log('error stationData', e))
    .then((res) => res.json())
    .then(({ status }) => status)
