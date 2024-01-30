import React, { useState } from 'react';
import { fakeDelegateData } from '../FakeData'

interface DelegateInfo {
  delegate: string;
  delegator: string;
}

interface SafeAddressData {
  safeAddress: string;
  delegates: DelegateInfo[];
}

interface SelectSafeProps {
  data: SafeAddressData[];
}

const ViewDelegates: React.FC = () => {
  const [selectedSafeAddress, setSelectedSafeAddress] = useState<string>('');
  const [data, setData] = useState(fakeDelegateData);

  const handleSafeAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSafeAddress(e.target.value);
  };

  const selectedDelegates = data.find(
    (d) => d.safeAddress === selectedSafeAddress
  )?.delegates;

  return (
    <div>
      <div>
        <label htmlFor="safeSelect">Select SAFE</label>
        <select id="safeSelect" onChange={handleSafeAddressChange} value={selectedSafeAddress}>
          <option value="">Select a Safe Address</option>
          {data.map((item) => (
            <option key={item.safeAddress} value={item.safeAddress}>
              {item.safeAddress}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Delegate</th>
            <th>Delegator</th>
          </tr>
        </thead>
        <tbody>
          {selectedDelegates?.map((delegate, index) => (
            <tr key={index}>
              <td>{delegate.delegate}</td>
              <td>{delegate.delegator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDelegates;
