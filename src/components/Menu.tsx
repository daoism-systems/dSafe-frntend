// Navbar.js

import { Children } from "react";

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Menu = ({ activePage, setActivePage }: Props) => {
  const pages = [
    'Create transaction',
    'Get a transaction',
    'Get All transactions',
    'Add confirmation',
    'Add delegate',
    'View Delegate',
    'About Safe',
  ];

  return (
    <nav style={{ padding: '10px' }}>
      <ul className="flex cursor-pointer">
        {pages.map((page) => {
          const label = page;
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
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
