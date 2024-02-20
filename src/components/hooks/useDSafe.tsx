import { useEffect, useState } from 'react';
import { DSafe } from '@dsafe/sdk';

const useDSafe = () => {
  const [dSafe, setDSafe] = useState<DSafe | null>(null);

  useEffect(() => {
    const initializeDSafe = async () => {
      const dSafeInstance = new DSafe();
      await dSafeInstance.init();
      setDSafe(dSafeInstance);
    };

    initializeDSafe();
  }, []);

  return dSafe;
};

export default useDSafe;
