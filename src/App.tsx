import { useEffect, useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import AddDelegate from './components/AddDelegate'
import ViewDelegates from './components/ViewDelegates'
import AboutSafe from './components/AboutSafe'
import Menu from './components/Menu'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import AddTransaction from './components/AddTransaction'
import GetTransaction from './components/GetTransaction'
import GetAllTransactions from './components/GetAllTransactions'
import DSafe from '@daoism-systems/dsafe-sdk'
import { CERAMIC_NETWORK, CHAIN_ID, PAGE } from './constants'

import { definition } from './definitions/definitions.prod'
import { useAccount } from 'wagmi'
import If from './components/If'

function App() {
  const [dsafe, setDsafe] = useState<DSafe | null>(null)
  const [activePage, setActivePage] = useState(PAGE.ADD_TRANSACTION)

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
      case PAGE.ADD_DELEGATE:
        return <AddDelegate dsafe={dsafe} />
      case PAGE.GET_DELEGATES:
        return <ViewDelegates dsafe={dsafe} />
      case PAGE.ADD_TRANSACTION:
        return <AddTransaction dsafe={dsafe} />
      // case 'Execute transaction':
      //   return <ExecTransaction dsafe={dsafe} />
      case PAGE.GET_ALL_TRANSACTIONS:
        return <GetAllTransactions dsafe={dsafe} />
      case PAGE.GET_TRANSACTION:
        return <GetTransaction dsafe={dsafe} />
      case PAGE.ABOUT_SAFE:
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
      <If
        condition={account.isConnected}
        then={
          <div>
            <Menu activePage={activePage} setActivePage={setActivePage} />
            <div className="border border-gray-100 rounded-lg bg-white mt-12 w-full p-12">
              {renderPage()}
            </div>
          </div>
        }
      />
    </div>
  )
}

export default App
