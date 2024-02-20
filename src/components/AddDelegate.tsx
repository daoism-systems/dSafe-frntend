import React, {
  useState,
  ChangeEvent,
  FormEvent,
  FormEventHandler,
} from 'react'

import { Button, Label, TextInput } from 'flowbite-react'
import AnimatedInput from './AnimatedInput'
import DSafe from '@dsafe/sdk'

interface Props {
  dsafe: DSafe | null
}

const AddDelegate = ({ dsafe }: Props) => {
  const [delegateAddress, setDelegateAddress] = useState<string>('')
  const [safeAddress, setSafeAddress] = useState<string>('')

  const handleDelegateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only hexadecimal characters and limit length to 42 including the '0x'
    setDelegateAddress(value)
  }

  const handleSafeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only hexadecimal characters and limit length to 42 including the '0x'
    setSafeAddress(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Check if both addresses are exactly 42 characters long
    if (delegateAddress.length === 42 && safeAddress.length === 42) {
      // Perform submit actions here, such as sending data to an API
      console.log('Delegate Address:', delegateAddress)
      console.log('Safe Address:', safeAddress)
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
          <AnimatedInput
            value={safeAddress}
            setValue={setSafeAddress}
            placeholder="Safe Address"
            pattern="^0x[a-fA-F0-9]{40}$"
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
