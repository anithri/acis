import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { useDataRefresh } from 'remix-utils'

import { getStationData } from '~/utils/getData.server'
import { Layout } from '~/components/Layout'
import { StationSummaries } from '~/components/StationSummaries'
import { StationSelect } from '~/components/StationSelect'
import { usePollingRefresh } from '~/utils/usePollingRefresh'

export const loader = async ({ request }) =>
  await json(await getStationData(request))

export default function Index() {
  const { stations, summaries, messages } = useLoaderData()
  const { refresh } = useDataRefresh()
  const { isPolling, togglePolling } = usePollingRefresh({ refresh })
  // setup polling State
  // provide control to change polling state
  // if polling, update stationData on regular basis (30s?)

  return (
    <Layout isPolling={isPolling} togglePolling={togglePolling}>
      {messages.length
        ? messages.map((msg, idx) => <div key={`msg-${idx}`}>{msg}</div>)
        : null}
      <StationSummaries
        title="Current Data"
        className="acisList"
        summaries={summaries}
      />
      <StationSelect className="acisRequest" stations={stations} />
    </Layout>
  )
}
