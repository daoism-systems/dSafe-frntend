import React, { useEffect, useState } from 'react'
import { fakeDelegateData } from '../FakeData'

import { getSafeSingletonDeployment } from '@safe-global/safe-deployments'
import AnimatedInput from './AnimatedInput'
import AnimatedSelect from './animatedSelect'
import If from './If'
import DSafe from '@daoism-systems/dsafe-sdk'
import { useAccount } from 'wagmi'
import { CHAIN_ID } from '../constants'

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

interface Props {
  dsafe: DSafe | null
}

const ViewDelegates = ({ dsafe }: Props) => {
  const [selectedSafeAddress, setSelectedSafeAddress] = useState<string>('')
  const [safes, setSafes] = useState<string[]>([])
  const [delegates, setDelegates] = useState<Record<string, any>[]>([])
  const [delegate, setDelegate] = useState<Record<string, any>>()
  const [selectedDelegate, setSelectedDelegate] = useState<string>('')

  const safeAbi = getSafeSingletonDeployment()?.abi

  const account = useAccount()

  useEffect(() => {
    console.log({ dsafe, account })
    if (account.address && dsafe) {
      const httpMethod = 'GET'
      const apiRoute = `/v1/owners/${account.address}/safes/`
      const payload = { address: account.address }
      const network = CHAIN_ID

      dsafe
        ?.fetchLegacy(httpMethod, apiRoute, payload, network)
        .then((dsafeResponseForSafes) => {
          console.log({ dsafeResponseForSafes })
          const safes = dsafeResponseForSafes.data.map(
            (safe: { safeAddress: string; id: string }) => safe.safeAddress,
          )

          setSafes(safes)
        })
        .catch((error) => {
          console.error('Error fetching safes:', error)
        })
    }
  }, [account.address, dsafe])

  useEffect(() => {
    if (dsafe && selectedSafeAddress) {
      // TODO: Fetch delegates from dSafe here
      const httpMethod = 'GET'
      const apiUrl = `/v1/delegates/?safe=${selectedSafeAddress}`
      const payload = {
        safeAddress: selectedSafeAddress,
      }
      const network = CHAIN_ID

      dsafe
        ?.fetchLegacy(httpMethod, apiUrl, payload, network)
        .then((delegateResponse) => {
          console.log({ delegateResponse })
          const foundDelegates = delegateResponse.data.results
          console.log({ foundDelegates })

          setDelegates(foundDelegates)
        })
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
          condition={!!selectedSafeAddress && delegates?.length > 0}
          then={
            <div className="mt-5">
              <AnimatedSelect
                options={delegates.map(del => del.delegate)}
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
