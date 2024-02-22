import { useEffect, useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
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
import DSafe from '@daoism-systems/dsafe-sdk'
import { CERAMIC_NETWORK, CHAIN_ID } from './constants'

// @ts-expect-error defs
import { definition } from './definitions/definitions.dev'
import { useAccount } from 'wagmi'

function App() {
  const [dsafe, setDsafe] = useState<DSafe | null>(null)
  const [activePage, setActivePage] = useState('Get All transactions')

  const account = useAccount()

  useEffect(() => {
    console.log({ ethereum: window.ethereum })

    if (typeof window !== 'undefined' && account.address && window.ethereum) {
      if (!dsafe?.initialised) {
        const dsafe = new DSafe(
          CHAIN_ID,
          CERAMIC_NETWORK,
          undefined,
          definition,
        )

        dsafe
          .initializeDIDOnClient(window)
          .then(() => {
            const did = dsafe?.did
            console.log({ did })

            setDsafe(dsafe)
          })
          .catch((err) => {
            console.error({ err })
          })
      }
    }
  }, [account, window.ethereum])

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
      <Toaster />
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
