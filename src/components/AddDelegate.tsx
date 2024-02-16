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
    <div>
      <h2 className='text-black text-2xl font-bold'>Add Delegate</h2>
    <form onSubmit={handleSubmit}>
      <div>
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">What is your name?</span>
    <span className="label-text-alt">Top Right label</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </div>
</label>
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
          </div>
  );
};

export default AddDelegate;
