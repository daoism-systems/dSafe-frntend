import React, { useState, useEffect } from 'react';
import { fakeSafeOwnerData } from '../FakeData';

interface SafeData {
  owner: string;
  safeAddress: string;
  threshold: number;
}

interface SafeTableProps {
  data: SafeData[];
}

const SafeTable: React.FC = () => {
  const [sortedData, setSortedData] = useState<SafeData[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof SafeData; direction: 'ascending' | 'descending' } | null>(null);
  const [data, setData] = useState(fakeSafeOwnerData);

  useEffect(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedData(sortableItems);
  }, [data, sortConfig]);

  const requestSort = (key: keyof SafeData) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ margin: '16px' }}>
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => requestSort('owner')}>Owner</th>
            <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => requestSort('safeAddress')}>Safe</th>
            <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => requestSort('threshold')}>Threshold</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.owner}</td>
              <td>{item.safeAddress}</td>
              <td>{item.threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SafeTable;
