import React, { useEffect, useState } from 'react'
import AnimatedSelect from './animatedSelect'
import { fakeSafesOfOwner, fakeTxsData, trxInput } from '../FakeData'
import AnimatedInput from './AnimatedInput'
import If from './If'
import { Button } from 'flowbite-react'

import DSafe from '@daoism-systems/dsafe-sdk'
import { useAccount } from 'wagmi'
import { CHAIN_ID } from '../constants'

type Props = { dsafe: DSafe | null }

const AddConfirmation = ({ dsafe }: Props) => {
  const [safes, setSafes] = useState<string[]>([])
  const [transactionsList, setTransactionsList] = useState<
    Record<string, string | number>[]
  >([])
  const [transactions, setTransactions] = useState<string[]>([])

  const [transaction, setTransaction] =
    useState<Record<string, string | number>>()
  const [selectedSafeAddress, setSelectedSafeAddress] = useState<string>('')
  const [selectedTransaction, setSelectedTransaction] = useState<string>('')
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
    if (selectedSafeAddress && dsafe) {
      // TODO: fetch transactions of safe
      const httpMethod = 'GET'
      const apiUrl = `/v1/safes/${selectedSafeAddress}/multisig-transactions/`
      const payload = { address: selectedSafeAddress }
      const network = CHAIN_ID
      dsafe
        ?.fetchLegacy(httpMethod, apiUrl, payload, network)
        .then((transactionFetchResponse) => {
          console.log({ transactionFetchResponse })
          const foundTransactions = transactionFetchResponse.data.results
          setTransactionsList(foundTransactions)
          const transactions = foundTransactions.map(
            (tx: any) => tx.safeTransactionHash,
          )
          setTransactions(transactions)
        })

      // setTransactions(fakeTxsData)
    }

    // setTransactions(fakeTxsData)
  }, [selectedSafeAddress, dsafe])

  useEffect(() => {
    const findTransaction = () => {
      const foundTransaction = transactionsList.find(
        (tx) => tx.safeTransactionHash === selectedTransaction,
      )
      console.log({ foundTransaction })

      setTransaction(foundTransaction)
    }

    if (selectedTransaction) {
      const transaction = findTransaction()
    }
  }, [selectedTransaction])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

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
        <If
          condition={!!selectedSafeAddress}
          then={
            <div className="mt-5">
              <AnimatedSelect
                options={transactions}
                placeholder="Select Transaction"
                value={selectedTransaction}
                setValue={setSelectedTransaction}
              />
            </div>
          }
        />
        <If
          condition={!!selectedTransaction}
          then={
            <div>
              <h2 className="text-black text-2xl font-bold  text-left mb-6 mt-5">
                Transaction Details
              </h2>
            </div>
          }
        />
        <If
          condition={!!transaction}
          then={
            <div>
              <div className="flex flex-col gap-4">
                <p>
                  Nonce: <span>{transaction?.nonce}</span>
                </p>
                <div className="flex gap-4 mt-5">
                  <div className="flex-1 flex flex-col gap-4">
                    <AnimatedInput
                      value={selectedSafeAddress}
                      placeholder="Safe Address"
                      pattern="^0x[a-fA-F0-9]{40}$"
                      disabled
                    />
                    <AnimatedInput
                      value={`${transaction?.to}`}
                      placeholder="To"
                      pattern="^0x[a-fA-F0-9]{40}$"
                      disabled
                    />
                    <AnimatedInput
                      value={`${transaction?.data}`}
                      placeholder="Data"
                    />
                    <AnimatedInput
                      value={`${transaction?.value.toString()}`}
                      placeholder="Value"
                      disabled
                    />
                    <AnimatedInput
                      value={`${transaction?.operation.toString()}`}
                      placeholder="Operation"
                      disabled
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <AnimatedInput
                      value={`${transaction?.safeTxGas.toString()}`}
                      placeholder="Safe Tx Gas"
                      disabled
                    />
                    <AnimatedInput
                      value={`${transaction?.baseGas.toString()}`}
                      placeholder="Base Gas"
                      disabled
                    />
                    <AnimatedInput
                      value={`${transaction?.gasPrice.toString()}`}
                      placeholder="Gas Price"
                      disabled
                    />
                    <AnimatedInput
                      value={`${transaction?.gasToken}`}
                      placeholder="Gas Token"
                      pattern="^0x[a-fA-F0-9]{40}$"
                      disabled
                    />
                    <AnimatedInput
                      value={`${transaction?.refundReceiver}`}
                      placeholder="Refund Receiver"
                      pattern="^0x[a-fA-F0-9]{40}$"
                      disabled
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-teal-500 text-white hover:bg-teal-600 cursor-pointer disabled:cursor-not-allowed text-center"
                >
                  {`Add Confirmation`}
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default AddConfirmation
