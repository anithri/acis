import { useState } from 'react'
import { Combobox } from '~/components/Combobox'

export const StationSelect = ({ stations, className, title }) => {
  const [selectedStation, setSelectedStation] = useState({
    value: null,
    name: 'Select a Station',
  })

  const options = stations.map(({ id, name }) => (
    <option key={`stationOption-${id}`} value={id}>
      {name}
    </option>
  ))

  return (
    <>
      <h3>{title || 'Fetch New Station Data'}</h3>
      <div className={className}>
        <select>{options}</select>
        <button className="bg-green-300">Fetch Data</button>
      </div>
    </>
  )
}
