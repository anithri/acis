import { dateCompare } from '~/utils/dateCompare'
import { Link } from '@remix-run/react'
import { fetchDataPath } from '~/utils/paths'

export const StationSummaries = ({ summaries, title }) => {
  const items = summaries.map((station) => (
    <StationSummary key={`stationSummary-${station.id}`} station={station} />
  ))
  return (
    <>
      <h3>{title || 'Station Summaries'}</h3>
      <div className="acisList">{items}</div>
    </>
  )
}

const StationSummary = ({ station }) => {
  const { id, name, lastDate, fileModifyTime } = station
  const displayDate = lastDate.replace(/_/, ' ')
  const rowBg = dateCompare(fileModifyTime)
  // date comparison to set class on li
  // remove ul/li in favor of div/spans
  // inner grid for lines
  // make lastDate look nicer
  // helper function to fire & forget update
  return (
    <>
      <span className={rowBg}>{name}</span>
      <span className={rowBg}>{displayDate}</span>
      <nav className={rowBg}>
        [Download]
        <Link to={fetchDataPath(id)}>[Update]</Link>
      </nav>
    </>
  )
}
