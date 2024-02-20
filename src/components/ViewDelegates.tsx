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
import If from './If'

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
  const [delegates, setDelegates] = useState<Record<string, any>[]>([])
  const [delegate, setDelegate] = useState<Record<string, any>>()
  const [selectedDelegate, setSelectedDelegate] = useState<string>('')

  const safeAbi = getSafeSingletonDeployment()?.abi

  useEffect(() => {
    // TODO: Fetch safes from dSafe here

    setSafes(fakeSafesOfOwner)
  }, [])

  useEffect(() => {
    // TODO: Fetch delegates from dSafe here

    if (selectedSafeAddress) {
      const foundSafe = fakeDelegateData.find(
        (safe) => safe.safeAddress === selectedSafeAddress,
      )
      if (foundSafe) {
        setDelegates(foundSafe.delegates)
      }
    }
  }, [selectedSafeAddress])

  useEffect(() => {
    if (selectedDelegate) {
      const foundDelegate = delegates.find(
        (delegate) => delegate.delegate === selectedDelegate,
      )
      if (foundDelegate) {
        setDelegate(foundDelegate)
      }
    }
  }, [selectedDelegate])

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
        <If
          condition={!!selectedSafeAddress}
          then={
            <div className="mt-5">
              <AnimatedSelect
                options={delegates.map(
                  (delegate) => delegate.delegate, // TODO: Change this according to data
                )}
                value={selectedDelegate}
                setValue={setSelectedDelegate}
                placeholder="Select Delegate"
              />
            </div>
          }
        />
        <If
          condition={!!selectedDelegate}
          then={
            <div className="mt-5 w-1/2 flex flex-col gap-5">
              <h2 className="text-md font-bold text-left">{`Delegator Details: `}</h2>
              <AnimatedInput
                value={delegate?.delegate}
                placeholder="Delegate Address"
              />
              <AnimatedInput
                value={delegate?.delegator}
                placeholder="Delegator Address"
              />
            </div>
          }
        />
      </div>
    </div>
  )
}

export default ViewDelegates
