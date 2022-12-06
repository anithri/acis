import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { useEffect } from 'react'
import { useDataRefresh } from 'remix-utils'

import { getStations, getStationData } from '~/utils/getData.server'
import { ToggleSwitch } from '~/components/ToggleSwitch'
import { useState } from 'react'
import { dateCompare } from '~/utils/dateCompare'

export const loader = async () => {

  return json({
    stations: await getStations(),
    stationData: await getStationData(),
  })
}

export const action = () => null

// action download
//   download singleStation Data
const Station = ({ station, stations }) => {
  const { id, lastDate, fileModifyTime } = station
  const name = stations[id]
  const displayDate = lastDate.replace(/_/, ' ')
  const rowBg = dateCompare(fileModifyTime)
  // date comparison to set class on li
  // remove ul/li in favor of div/spans
  // inner grid for lines
  // make lastDate look nicer
  // helper function to fire & forget update
  return (
    <>
      <span className={rowBg}> {name} </span>
      <span className={rowBg}>{displayDate}</span>
      <nav className={rowBg}>[Download] [Update]</nav>
    </>
  )
}

export default function Index() {
  const { stations, stationData } = useLoaderData()
  const [isPolling, setPolling] = useState(false)
  const togglePolling = () => setPolling((orig) => !orig)
  const { refresh } = useDataRefresh()

  // setup polling State
  // provide control to change polling state
  // if polling, update stationData on regular basis (30s?)
  const items = Object.values(stationData).map((station, idx) => (
    <Station key={station.id} station={station} stations={stations} />
  ))

  const options = Object.entries(stations)
    .filter(([id, name]) => !stationData[id])
    .map(([id, name], idx) => (
      <option key={id} value={id}>
        {name}
      </option>
    ))
  // helper function to fire & forget fetch
  return (
    <main>
      <header>
        <span />
        <h1 className="text-2xl font-bold">ACIS Wind Data</h1>
        <button onClick={() => refresh()}>Refresh</button>
        {/*<ToggleSwitch*/}
        {/*  enabled={isPolling}*/}
        {/*  setEnabled={togglePolling}*/}
        {/*  label="Enable Polling"*/}
        {/*  className="text-right"*/}
        {/*/>*/}
      </header>
      <h3>Current Data</h3>
      <div className="acisList">{items}</div>
      <h3>New Station Data</h3>
      <div className="acisRequest">
        <select placeholder="Select New Station">{options}</select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="bg-green-300">Fetch Data</button>
      </div>
    </main>
  )
}
