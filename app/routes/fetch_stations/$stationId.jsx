import { redirect } from '@remix-run/node'
import { startStationFech } from '~/utils/getData.server'

export const loader = ({ params }) => {
  const {error, message} = startStationFetch(params.stationId)
  const redirectUrl = `/?message=started+to+fetchData+for+${params.stationId}`
  // do the thing that starts the data fetch
  console.log('params', params)
  return redirect(redirectUrl)
}
