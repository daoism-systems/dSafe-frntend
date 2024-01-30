import { useState } from 'react'
import './App.css'
import AddDelegate from './components/AddDelegate'
import ViewDelegates from './components/ViewDelegates'
import SafeTable from './components/SafeTable'
import Navbar from './components/NavBar'
import AboutSafe from './components/AboutSafe'

function App() {
  const [activePage, setActivePage] = useState('Add delegate');

  const renderPage = () => {
    switch (activePage) {
      case 'Add delegate':
        return <AddDelegate />;
      case 'View Delegate':
        return <ViewDelegates />;
      // case 'Create transaction':
      //   return <CreateTransaction />;
      // case 'Add confirmation':
      //   return <AddConfirmation />;
      // case 'Get All transactions':
      //   return <GetAllTransactions />;
      // case 'Get a transaction':
      //   return <GetTransaction />;
      case 'About Safe':
        return <AboutSafe />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
    </>
  )
}

export default App
