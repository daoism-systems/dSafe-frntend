import React, { useEffect, useState } from 'react'
import {
  fakeDelegateData,
  fakeSafeDetails,
  fakeSafesOfOwner,
} from '../FakeData'

import { getSafeSingletonDeployment } from '@safe-global/safe-deployments'
import AnimatedInput from './AnimatedInput'
import { Label, Select } from 'flowbite-react'

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
        <h2 className="text-black text-2xl font-bold  text-left">
          View Delegates
        </h2>
        <div className="flex max-w-md flex-col gap-4">
          <div className="flex flex-col gap-4 mt-5">
            <div>
              <Label
                htmlFor="safeSelect"
                className={`absolute left-2 transition-all duration-300 ease-in-out top-[-12px] text-sm text-gray-700 bg-white px-1 text-black`}
              >
                Select Safe
              </Label>
              <select
                id="safeSelect"
                onChange={handleSafeAddressChange}
                value={selectedSafeAddress}
                className={`w-full text-sm placeholder:text-sm p-4 border  rounded focus:border-gray-700 outline-none`}
              >
                <option value="">Select a Safe Address</option>
                {safes.map((safe) => (
                  <option key={safe} value={safe}>
                    {safe}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDelegates
