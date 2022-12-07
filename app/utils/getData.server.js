const cache = require('memory-cache')

const url = process.env['API_BASE_URL']
const API_TOKEN = process.env['API_TOKEN']
const getStationsUrl = url + '/getStationsInfo'
const getStationSummariesUrl = url + '/getStationSummaries'
// const postStationFetchUrl = url + '/'

const headers = {
  'x-api-key': API_TOKEN,
  'Content-Type': 'application/json',
  'Content-Encoding': 'gzip',
}

const parseStationsData = (stations, summaries) => {
  // console.log('parseStationsData', stations, summaries)
  return Object.entries(stations).map(([id, name]) => ({
    id,
    name,
    hasData: !!summaries[id],
  }))
}

const parseSummariesData = (stations, summaries) => {
  // console.log('parseSummariesData', stations, summaries)
  return Object.values(summaries).map((summary) => ({
    ...summary,
    name: stations[summary.id],
  }))
}

const extractMessages = (request) => {
  const url = new URL(request.url)
  return Promise.resolve(url.searchParams.getAll('message'))
}

export const getStationData = async (request) =>
  await Promise.all([
    getStations(),
    getStationSummaries(),
    extractMessages(request),
  ])
    .catch((e) => console.error('getIndexData', e))
    .then(([stations, summaries, messages]) => {
      return {
        stations: parseStationsData(stations, summaries),
        summaries: parseSummariesData(stations, summaries),
        messages,
      }
    })

export const getStations = async () =>
  fetch(getStationsUrl, { headers })
    .catch((e) => console.log('error stations', e))
    .then((res) => res.json())

export const getStationSummaries = async () =>
  fetch(getStationSummariesUrl, { headers })
    .catch((e) => console.log('error stationData', e))
    .then((res) => res.json())
    .then(({ status }) => status)

export const startStationFech = async (stationId) => {
  // call the api using the stationId
  // check status of the API request for 200
  // create message or error to display
}
