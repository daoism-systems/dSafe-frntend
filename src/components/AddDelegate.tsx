import { useState, FormEvent, useEffect } from 'react'

import { Button } from 'flowbite-react'
import AnimatedInput from './AnimatedInput'
import { useAccount, useSignMessage } from 'wagmi'
import { CHAIN_ID } from '../constants'
import DSafe from '@daoism-systems/dsafe-sdk'
import toast from 'react-hot-toast'
import AnimatedSelect from './AnimatedSelect'

interface Props {
  dsafe: DSafe | null
}

const AddDelegate = ({ dsafe }: Props) => {
  const [safes, setSafes] = useState<string[]>([])
  const [delegateAddress, setDelegateAddress] = useState<string>('')
  const [safeAddress, setSafeAddress] = useState<string>('')

  const signMessage = useSignMessage()
  const account = useAccount()

  const clearInputs = () => {
    setDelegateAddress('')
    setSafeAddress('')
  }

  useEffect(() => {
    // STEP 1: Fetch safes of connected user

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Check if both addresses are exactly 42 characters long
    if (delegateAddress.length === 42 && safeAddress.length === 42) {
      // Perform submit actions here, such as sending data to an API
      //   const label = 'delegator'
      const totp = Math.floor(Math.floor(Date.now() / 1000) / 3600)
      const message = `${delegateAddress}${totp}`
      await signMessage.signMessage(
        {
          account: account.address,
          message,
        },
        {
          onSuccess: (signatureForDelegate) => {
            const label = 'delegate'

            const httpMethod = 'POST'
            const apiUrl = '/v1/delegates/'
            const payload = {
              safe: safeAddress,
              delegate: delegateAddress,
              delegator: account.address,
              signature: signatureForDelegate,
              label,
              apiData: {
                safe: safeAddress,
                delegate: delegateAddress,
                delegator: account.address,
                signature: signatureForDelegate,
                label,
              },
            }

            console.log({ payload })

            const network = CHAIN_ID

            dsafe
              ?.fetchLegacy(httpMethod, apiUrl, payload, network)
              .then((addDelegateDSafeResponse) => {
                if (addDelegateDSafeResponse.status) {
                  toast.success('Added Delegate')
                  clearInputs()
                }
              })
          },
        },
      )
    } else {
      // If input lengths are invalid, handle the error accordingly
      console.error('Both addresses must be exactly 42 characters long.')
    }
  }

  return (
    <div>
      <h2 className="text-black text-2xl font-bold  text-left">Add Delegate</h2>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mt-5">
          <AnimatedSelect
            options={safes}
            value={safeAddress}
            setValue={setSafeAddress}
            placeholder="Safe Address"
          />
          <AnimatedInput
            value={delegateAddress}
            setValue={setDelegateAddress}
            placeholder="Delegate Address"
            pattern="^0x[a-fA-F0-9]{40}$"
          />
        </div>
        <Button
          type="submit"
          disabled={delegateAddress.length !== 42 || safeAddress.length !== 42}
          className="bg-teal-500 text-white inline-block hover:bg-teal-600 cursor-pointer disabled:cursor-not-allowed"
        >
          Add Delegate
        </Button>
      </form>
    </div>
  )
}

export default AddDelegate
