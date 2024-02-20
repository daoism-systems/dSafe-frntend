import { useEffect, useState } from 'react'
import './App.css'
import AddDelegate from './components/AddDelegate'
import ViewDelegates from './components/ViewDelegates'
import SafeTable from './components/SafeTable'
import AboutSafe from './components/AboutSafe'
import Menu from './components/Menu'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import AddTransaction from './components/AddTransaction'
import AddConfirmation from './components/AddConfirmation'
import GetTransaction from './components/GetTransaction'
import GetAllTransactions from './components/GetAllTransactions'
import DSafe from '@dsafe/sdk'
import { useEthersProvider } from './utils.ts/ethers'
import { sepolia } from 'viem/chains'
import { CERAMIC_NETWORK, CHAIN_ID } from './constants'
import { useClient, useConfig } from 'wagmi'

function App() {
  const [activePage, setActivePage] = useState('Create transaction')
  const [dsafe, setDsafe] = useState<DSafe | null>(null)
  const provider = useEthersProvider({ chainId: sepolia.id })
  const config = useConfig()
  const client = useClient({
    chainId: sepolia.id,
    config,
  })

  useEffect(() => {
    console.log({ client })

    const dsafe = new DSafe(CHAIN_ID, CERAMIC_NETWORK)
    dsafe.initializeDIDOnClient(provider).then((res) => {
      console.log({ res, did: dsafe?.did })
      setDsafe(dsafe)
    })
  }, [provider])

  const renderPage = () => {
    switch (activePage) {
      case 'Add delegate':
        return <AddDelegate dsafe={dsafe} />
      case 'View Delegate':
        return <ViewDelegates dsafe={dsafe} />
      case 'Create transaction':
        return <AddTransaction dsafe={dsafe} />
      case 'Add confirmation':
        return <AddConfirmation dsafe={dsafe} />
      case 'Get All transactions':
        return <GetAllTransactions dsafe={dsafe} />
      case 'Get a transaction':
        return <GetTransaction dsafe={dsafe} />
      case 'About Safe':
        return <AboutSafe dsafe={dsafe} />
      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="bg-gray-100 min-h-[100vh] w-[100vw] flex flex-col items-center pt-24 mx-auto px-24">
      <div className="text-4xl font-bold mb-6">dSafe Frontend Demo</div>
      <ConnectButton />
      <div>
        <Menu activePage={activePage} setActivePage={setActivePage} />
        <div className="border border-gray-100 rounded-lg bg-white mt-12 w-full p-12">
          {renderPage()}
        </div>
      </div>
    </div>
  )
}

export default App
