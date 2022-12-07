import { useEffect, useState } from 'react'
import { useDataRefresh } from 'remix-utils'

const DEFAULT_INTERVAL = 3 * 1000

export const usePollingRefresh = ({ interval = DEFAULT_INTERVAL, refresh }) => {
  const [isPolling, setPolling] = useState(false)

  const togglePolling = () => setPolling((orig) => !orig)
  const setPollingOn = () => setPolling(true)
  const setPollingOff = () => setPolling(false)

  // const { refresh } = useDataRefresh()
  //
  const clearPollingInterval = useEffect(() => {
    const doRefresh = () => {
      console.log(isPolling, interval)
      return isPolling && refresh && refresh()
    }
    const intervalObj = setInterval(doRefresh, interval)
    return () => clearInterval(intervalObj)
  }, [refresh])

  return {
    clearPollingInterval,
    interval,
    isPolling,
    setPollingOn,
    setPollingOff,
    togglePolling,
  }
}
