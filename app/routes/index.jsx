import {useLoaderData} from '@remix-run/react';
import stations from '../stations.json'
import stationData from '../stationData.json'

// loader 
//   load stations
//   load stationData

// action download
//   download singleStation Data
const Station = ({station, stations}) => {
  const now = new Date()
  const {id, lastDate, fileModifyTime} = station
  const name = stations[id]
  // date comparison to set class on li
  // remove ul/li in favor of div/spans
  // inner grid for lines
  // make lastDate look nicer
  // helper function to fire & forget update
  return (
    <li>
      <span>{name} {lastDate}</span>
	  <span>[Download]</span>
	  <span>[Update]</span>
    </li>
   )	  
}

export default function Index() {
  // setup polling State
  // provide control to change polling state
  // if polling, update stationData on regular basis (30s?)
  const items = Object.values(stationData).map((station, idx) => (
	  <Station key={station.id} station={station} stations={stations}  />
  ))

 const options = Object.entries(stations)
	        .filter(([id, name]) => !stationData[id])
		.map(([id, name], idx) => (
    <option value={id}>{name}</option>
 ) )
  // helper function to fire & forget fetch
  return (
    <main>
      <h1 className="text-2xl font-bold">ACIS Wind Data</h1>
      <ul>{items}</ul>
	  <br />
	  <div>
	  <select placeholder="Select New Station">{options}</select>
	  <button className="bg-green-300">Fetch Data</button>
	  </div>
    </main>
  );
}
