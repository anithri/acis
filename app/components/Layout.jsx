import { ToggleSwitch } from '~/components/ToggleSwitch'

export const Layout = ({ isPolling, togglePolling, children }) => (
  <main>
    <header>
      <span />
      <h1 className="text-2xl font-bold">ACIS Wind Data</h1>
      <ToggleSwitch
        enabled={isPolling}
        setEnabled={togglePolling}
        label="Enable Polling"
        className="text-right"
      />
    </header>
    {children}
  </main>
)
