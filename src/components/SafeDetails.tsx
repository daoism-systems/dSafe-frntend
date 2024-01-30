import React, { useState } from 'react';
import { fakeSafeDetails } from '../FakeData';

interface Safe {
  address: string;
  nonce: number;
  threshold: number;
  owners: string[];
  masterCopy: string;
  modules: string[];
  fallbackHandler: string;
  guard: string;
  version: string;
}

const SafeDetails: React.FC = () => {
  const [selectedSafeIndex, setSelectedSafeIndex] = useState<number>(0);
  const [safes, setSafes] = useState<Array<Safe>>(fakeSafeDetails);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSafeIndex(Number(event.target.value));
  };

  const selectedSafe = safes[selectedSafeIndex];

  return (
    <div>
      <select onChange={handleChange} value={selectedSafeIndex}>
        {safes.map((safe, index) => (
          <option key={safe.address} value={index}>
            {safe.address}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Address</td>
            <td>{selectedSafe.address}</td>
          </tr>
          <tr>
            <td>Nonce</td>
            <td>{selectedSafe.nonce}</td>
          </tr>
          <tr>
            <td>Threshold</td>
            <td>{selectedSafe.threshold}</td>
          </tr>
          <tr>
            <td>Owners</td>
            <td>{selectedSafe.owners.join(', ')}</td>
          </tr>
          <tr>
            <td>Master Copy</td>
            <td>{selectedSafe.masterCopy}</td>
          </tr>
          <tr>
            <td>Modules</td>
            <td>{selectedSafe.modules.join(', ')}</td>
          </tr>
          <tr>
            <td>Fallback Handler</td>
            <td>{selectedSafe.fallbackHandler}</td>
          </tr>
          <tr>
            <td>Guard</td>
            <td>{selectedSafe.guard}</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>{selectedSafe.version}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SafeDetails;
