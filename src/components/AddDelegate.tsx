import React, { useState, ChangeEvent, FormEvent } from 'react';

const AddDelegate: React.FC = () => {
  const [delegateAddress, setDelegateAddress] = useState<string>('');
  const [safeAddress, setSafeAddress] = useState<string>('');

  const handleDelegateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only hexadecimal characters and limit length to 42 including the '0x'
      setDelegateAddress(value);
  };

  const handleSafeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only hexadecimal characters and limit length to 42 including the '0x'
      setSafeAddress(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if both addresses are exactly 42 characters long
    if (delegateAddress.length === 42 && safeAddress.length === 42) {
      // Perform submit actions here, such as sending data to an API
      console.log('Delegate Address:', delegateAddress);
      console.log('Safe Address:', safeAddress);
    } else {
      // If input lengths are invalid, handle the error accordingly
      console.error('Both addresses must be exactly 42 characters long.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="delegateAddress">Delegate Address:</label>
        <input
          type="text"
          id="delegateAddress"
          value={delegateAddress}
          onChange={handleDelegateChange}
          maxLength={42}
          placeholder="0x123..."
        />
      </div>
      <div>
        <label htmlFor="safeAddress">Safe Address:</label>
        <input
          type="text"
          id="safeAddress"
          value={safeAddress}
          onChange={handleSafeChange}
          maxLength={42}
          placeholder="0x456..."
        />
      </div>
      <button type="submit" disabled={delegateAddress.length !== 42 || safeAddress.length !== 42}>
        Add Delegate
      </button>
    </form>
  );
};

export default AddDelegate;
