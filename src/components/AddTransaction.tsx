import React, { useEffect, useState } from 'react'
import AnimatedInput from './AnimatedInput'
import { Button } from 'flowbite-react'
import AnimatedSelect from './animatedSelect'
import { fakeSafesOfOwner, trxInput } from '../FakeData'
import { getSafeSingletonDeployment } from '@safe-global/safe-deployments'
import {
  useAccount,
  useClient,
  useReadContract,
  useSignMessage,
  useWriteContract,
} from 'wagmi'
import { readContract } from 'viem/actions'
import definition from '../definitions/definitions.dev.js'
import DSafe from '@daoism-systems/dsafe-sdk'
import { Abi, createPublicClient, getContract, http, toBytes } from 'viem'
import { sepolia } from 'viem/chains'
import { ethers } from 'ethers'

import { arrayify } from 'ethers/lib/utils.js'
import axios, { AxiosRequestConfig } from 'axios'
import { CERAMIC_NETWORK, CHAIN_ID } from '../constants'

type Props = {}

const chainId = CHAIN_ID
const ceramicNodeNetwork = CERAMIC_NETWORK

const dsafe = new DSafe(chainId, ceramicNodeNetwork, definition)

const AddTransaction = (props: Props) => {
  const [isTest, setIsTest] = useState(true)
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

  const account = useAccount()
  const client = useClient({
    chainId: sepolia.id,
  })
  const { signMessage } = useSignMessage()

  const safeAbi = getSafeSingletonDeployment()?.abi
  const result = useReadContract({
    abi: safeAbi,
    address: safeAddress as `0x${string}`,
    functionName: 'nonce',
  })

  useEffect(() => {
    // TODO: fetch safe addresses from dSafe
    // const apiRoute = `/v1/owners/${account.address}/safes/`
    // dsafe
    //   .fetchLegacy(
    //     'GET',
    //     apiRoute,
    //     {
    //       address: account.address,
    //     },
    //     chainId,
    //   )
    //   .then((res) => {
    //     console.log({ res })
    //     setSafeOptions(fakeSafesOfOwner)
    //   })

    const inputs = trxInput

    if (isTest) {
      setSafeAddress(trxInput.safeAddress)
      setTo(trxInput.to)
      setValue(trxInput.value.toString())
      setData(trxInput.data)
      setOperation(trxInput.operation.toString())
      setSafeTxGas(trxInput.safeTxGas.toString())
      setBaseGas(trxInput.baseGas.toString())
      setGasPrice(trxInput.gasPrice.toString())
      setGasToken(trxInput.gasToken)
      setRefundReceiver(trxInput.refundReceiver)
    }
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
    return isValid
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

    const isValid = validateForm()

    if (isValid) {
      if (safeAbi !== undefined && client !== undefined) {
        const safeInstance = getContract({
          abi: safeAbi,
          address: safeAddress as `0x${string}`,
          client,
        })

        const safeTxHash = await safeInstance.read.getTransactionHash([
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          nonce,
        ])

        console.log({ safeTxHash, type: typeof safeTxHash })

        await signMessage(
          {
            account: account.address,
            message: { raw: toBytes(`${safeTxHash}` as `0x${string}`) },
          },
          {
            onSuccess: async (response) => {
              const signature = response
                .replace(/1b$/, '1f')
                .replace(/1c$/, '20')
              console.log({ signature })
              const payload = {
                safe: safeAddress,
                sender: account.address,
                contractTransactionHash: safeTxHash,
                to: to,
                data: data,
                baseGas: baseGas,
                gasPrice: gasPrice,
                safeTxGas: safeTxGas,
                value: value,
                operation: operation.toString(),
                nonce: nonce,
                signature,
                apiData: {
                  safe: safeAddress,
                  sender: account.address,
                  contractTransactionHash: safeTxHash,
                  to: to,
                  data: data,
                  gasToken: gasToken,
                  baseGas: baseGas,
                  gasPrice: gasPrice,
                  refundReceiver: refundReceiver,
                  safeTxGas: safeTxGas,
                  value: trxInput.value,
                  operation: trxInput.operation,
                  nonce: nonce,
                  signature,
                },
              }

              const createTransactionRoute = `/v1/safes/${safeAddress}/multisig-transactions/`

              const options: AxiosRequestConfig = {}
              options.method = 'POST'
              options.url = dsafe.generateApiUrl(
                createTransactionRoute,
                chainId,
              )
              if (payload?.apiData !== undefined) {
                options.data = payload.apiData
              }
              try {
                const result = await axios.request(options)
                console.log({ result })
              } catch (e: any) {
                console.log({ e: e.response.data })
                throw e
              }
              const dsafeResponse = await dsafe.fetchLegacy(
                'POST',
                createTransactionRoute,
                payload,
                chainId,
              )
              console.log({ dsafeResponse })
            },
          },
        )

        // TODO: get SafeTransaction Hash

        // TODO: get signature

        // TODO: send transaction to API

        // TODO: send transaction to dSafe
      }
    }
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
