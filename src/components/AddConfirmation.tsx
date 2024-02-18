import React, { useEffect, useState } from 'react'
import AnimatedSelect from './animatedSelect'
import { fakeSafesOfOwner } from '../FakeData'
import AnimatedInput from './AnimatedInput'
import If from './If'
import { Button } from 'flowbite-react'

type Props = {}

const AddConfirmation = (props: Props) => {
    const [safes, setSafes] = useState<string[]>([])
    const [selectedSafeAddress, setSelectedSafeAddress] = useState<string>('')
    const [selectedTransaction, setSelectedTransaction] = useState<string>('')

    

  useEffect(() => {
    // TODO: Fetch safes from dSafe here
    setSafes(fakeSafesOfOwner)
  }, [])

  return (
    <div>
      <div>
        <h2 className="text-black text-2xl font-bold  text-left mb-6">
          Add Confirmation
        </h2>
        <AnimatedSelect
          options={safes}
          value={selectedSafeAddress}
          setValue={setSelectedSafeAddress}
          placeholder="Select Safe"
              />
        <If condition{selectedSafeAddress} then={<AnimatedSelect options={transactions.map()} />} />
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4 mt-5">
              <div className="flex-1 flex flex-col gap-4">
                <AnimatedInput
                  value={safeAddress}
                  setValue={setSafeAddress}
                  placeholder="Safe Address"
                  pattern="^0x[a-fA-F0-9]{40}$"
                />
                <AnimatedInput
                  value={to}
                  setValue={setTo}
                  placeholder="To"
                  pattern="^0x[a-fA-F0-9]{40}$"
                />
                <AnimatedInput
                  value={data}
                  setValue={setData}
                  placeholder="Data"
                />
                <AnimatedInput
                  value={value}
                  setValue={setValue}
                  placeholder="Value"
                />
                <AnimatedInput
                  value={operation}
                  setValue={setOperation}
                  placeholder="Operation"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <AnimatedInput
                  value={safeTxGas}
                  setValue={setSafeTxGas}
                  placeholder="Safe Tx Gas"
                />
                <AnimatedInput
                  value={baseGas}
                  setValue={setBaseGas}
                  placeholder="Base Gas"
                />
                <AnimatedInput
                  value={gasPrice}
                  setValue={setGasPrice}
                  placeholder="Gas Price"
                />
                <AnimatedInput
                  value={gasToken}
                  setValue={setGasToken}
                  placeholder="Gas Token"
                  pattern="^0x[a-fA-F0-9]{40}$"
                />
                <AnimatedInput
                  value={refundReceiver}
                  setValue={setRefundReceiver}
                  placeholder="Refund Receiver"
                  pattern="^0x[a-fA-F0-9]{40}$"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-teal-500 text-white hover:bg-teal-600 cursor-pointer disabled:cursor-not-allowed text-center"
            >
              {`Create Transaction ${nonce ? `(Nonce #${nonce})` : ''}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddConfirmation
