// Navbar.js
import { PAGES } from '../constants'

interface Props {
  activePage: string
  setActivePage: (page: string) => void
}

const Menu = ({ activePage, setActivePage }: Props) => {
  return (
    <nav style={{ padding: '10px' }}>
      <ul className="flex cursor-pointer">
        {PAGES.map((page) => {
          const label = page
          return (
            <li
              className={`px-4 py-2 text-lg font-medium text-gray-600 rounded-t-lg border-b-2 ${
                activePage === label
                  ? 'text-blue-600 border-blue-600'
                  : 'hover:text-gray-900 border-transparent'
              }`}
              onClick={() => setActivePage(label)}
            >
              {label}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Menu
