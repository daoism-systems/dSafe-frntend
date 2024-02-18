import React, { useEffect, useState } from 'react'
import AnimatedInput from './AnimatedInput'
import { Button } from 'flowbite-react'
import AnimatedSelect from './animatedSelect'
import { fakeSafesOfOwner } from '../FakeData'
import { getSafeSingletonDeployment } from '@safe-global/safe-deployments'
import { useReadContract, useWriteContract } from 'wagmi'
import { readContract } from 'viem/actions'

type Props = {}

const AddTransaction = (props: Props) => {
  const [safeAddress, setSafeAddress] = useState('')
  const [nonce, setNonce] = useState('')
  const [to, setTo] = useState('')
  const [data, setData] = useState('')
  const [value, setValue] = useState('')
  const [operation, setOperation] = useState('')
  const [safeTxGas, setSafeTxGas] = useState('')
  const [baseGas, setBaseGas] = useState('')
  const [gasPrice, setGasPrice] = useState('')
  const [gasToken, setGasToken] = useState('')
  const [refundReceiver, setRefundReceiver] = useState('')
  const [formValid, setFormValid] = useState(false)

  const [safeOptions, setSafeOptions] = useState<string[]>([])

  const safeAbi = getSafeSingletonDeployment()?.abi
  const result = useReadContract({
    abi: safeAbi,
    address: safeAddress as `0x${string}`,
    functionName: 'nonce',
  })

  useEffect(() => {
    // TODO: fetch safe addresses from dSafe

    setSafeOptions(fakeSafesOfOwner)
  }, [])

  useEffect(() => {
    console.log({ result })

    if (result?.data !== undefined && result?.data !== null) {
      setNonce(result.data.toString())
    } else {
      setNonce('')
    }
  }, [result])

  const validateForm = () => {
    let isValid = true
    if (
      !safeAddress ||
      !nonce ||
      !to ||
      !data ||
      !value ||
      !operation ||
      !safeTxGas ||
      !baseGas ||
      !gasPrice ||
      !gasToken ||
      !refundReceiver
    ) {
      isValid = false
    }
    setFormValid(isValid)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({
      safeAddress,
      nonce,
      to,
      data,
      value,
      operation,
      safeTxGas,
      baseGas,
      gasPrice,
      gasToken,
      refundReceiver,
    })

    validateForm()

    // TODO: get SafeTransaction Hash

    // TODO: get signature

    // TODO: send transaction to API

    // TODO: send transaction to dSafe
  }

  return (
    <div>
      <h2 className="text-black text-2xl font-bold  text-left">
        Create Transaction
      </h2>
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
            <AnimatedInput value={data} setValue={setData} placeholder="Data" />
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
  )
}

export default AddTransaction
