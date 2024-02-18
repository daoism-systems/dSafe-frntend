import React, { useEffect, useState } from 'react'
import {
  fakeDelegateData,
  fakeSafeDetails,
  fakeSafesOfOwner,
} from '../FakeData'

import { getSafeSingletonDeployment } from '@safe-global/safe-deployments'
import AnimatedInput from './AnimatedInput'
import { Label, Select } from 'flowbite-react'
import AnimatedSelect from './animatedSelect'

interface DelegateInfo {
  delegate: string
  delegator: string
}

interface SafeAddressData {
  safeAddress: string
  delegates: DelegateInfo[]
}

interface SelectSafeProps {
  data: SafeAddressData[]
}

const ViewDelegates: React.FC = () => {
  const [selectedSafeAddress, setSelectedSafeAddress] = useState<string>('')
  const [safes, setSafes] = useState<string[]>([])
  const [data, setData] = useState(fakeDelegateData)

  const safeAbi = getSafeSingletonDeployment()?.abi

  useEffect(() => {
    // TODO: Fetch safes from dSafe here
    setSafes(fakeSafesOfOwner)
  }, [])

  const handleSafeAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSafeAddress(e.target.value)
  }

  const selectedDelegates = data.find(
    (d) => d.safeAddress === selectedSafeAddress,
  )?.delegates

  return (
    <div>
      <div>
        <h2 className="text-black text-2xl font-bold  text-left mb-6">
          View Delegates
        </h2>
        <AnimatedSelect
          options={safes}
          value={selectedSafeAddress}
          setValue={setSelectedSafeAddress}
          placeholder="Select Safe"
        />
      </div>
    </div>
  )
}

export default ViewDelegates
