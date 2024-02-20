import { useState } from 'react'
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

function App() {
  const [activePage, setActivePage] = useState('Get a transaction')

  const renderPage = () => {
    switch (activePage) {
      case 'Add delegate':
        return <AddDelegate />
      case 'View Delegate':
        return <ViewDelegates />
      case 'Create transaction':
        return <AddTransaction />
      case 'Add confirmation':
        return <AddConfirmation />
      case 'Get All transactions':
        return <GetAllTransactions />
      case 'Get a transaction':
        return <GetTransaction />
      case 'About Safe':
        return <AboutSafe />
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
