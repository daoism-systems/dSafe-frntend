// Navbar.js
import React from 'react';

const Navbar = ({ activePage, setActivePage }) => {
  const pages = [
    'Add delegate',
    'View Delegate',
    'Create transaction',
    'Add confirmation',
    'Get All transactions',
    'Get a transaction',
    'About Safe',
  ];

  return (
    <nav style={{ padding: '10px' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'space-around' }}>
        {pages.map((page) => (
          <li
            key={page}
            style={{
              cursor: 'pointer',
              fontWeight: activePage === page ? 'bold' : 'normal',
              padding: '10px'
            }}
            onClick={() => setActivePage(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
