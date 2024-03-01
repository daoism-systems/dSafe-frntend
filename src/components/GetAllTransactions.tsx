import React, { useEffect } from 'react'
import AnimatedInput from './AnimatedInput'

import AnimatedSelect from './AnimatedSelect'
import If from './If'
import DSafe from '@daoism-systems/dsafe-sdk'
import { useAccount } from 'wagmi'
import { CHAIN_ID } from '../constants'
// @ts-expect-error def
import { definition } from '../definitions.dev.js'

interface Props {
  dsafe: DSafe | null
}

const GetAllTransactions = ({ dsafe }: Props) => {
  const [selectedSafe, setSelectedSafe] = React.useState<string>('')
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<string>('')
  const [transactions, setTransactions] = React.useState<Record<string, any>[]>(
    [],
  )
  const [safes, setSafes] = React.useState<string[]>([])
  const [transaction, setTransaction] = React.useState<Record<string, any>>()
  const [transactionList, setTransactionList] =
    React.useState<Record<string, any>[]>()

  const account = useAccount()

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

  useEffect(() => {
    if (selectedSafe) {
      // TODO: fetch transactions of safe
      const httpMethod = 'GET'
      const apiUrl = `/v1/safes/${selectedSafe}/multisig-transactions/`
      const payload = { address: selectedSafe }
      const network = CHAIN_ID
      dsafe
        ?.fetchLegacy(httpMethod, apiUrl, payload, network)
        .then((transactionFetchResponse) => {
          console.log({ transactionFetchResponse })
          const foundTransactions = transactionFetchResponse.data.results
          setTransactionList(foundTransactions)
          const transactions = foundTransactions.map(
            (tx: any) => tx.safeTransactionHash,
          )
          setTransactions(transactions)
        })

      // setTransactions(fakeTxsData)
    }
  }, [selectedSafe])

  useEffect(() => {
    if (selectedTransaction && transactionList) {
      const findTransaction = () => {
        console.log({ transactionList })

        const foundTransaction = transactionList?.find((tx) => {
          console.log({ 1: tx.safeTransactionHash, 2: selectedTransaction })

          return tx.safeTransactionHash === selectedTransaction
        })
        console.log({ foundTransaction })

        setTransaction(foundTransaction)
      }
      findTransaction()
    }
  }, [selectedTransaction, transactionList])

  return (
    <div>
      <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
        Get Transaction
      </h2>
      <AnimatedSelect
        options={safes}
        value={selectedSafe}
        setValue={setSelectedSafe}
        placeholder="Select Safe"
      />
      <If
        condition={!!selectedSafe}
        then={
          <div className="mt-5">
            <AnimatedSelect
              options={transactions}
              value={selectedTransaction}
              setValue={setSelectedTransaction}
              placeholder="Select Transaction"
            />
          </div>
        }
      />

      {transaction && (
        <div className="mt-5">
          <h2 className="text-gray-800 text-2xl font-bold mb-4">
            Transaction Details
          </h2>

          <div className="flex flex-col gap-4">
            <p className="font-bold text-xs text-left">
              Safe Tx Hash: <span>{selectedTransaction}</span>
            </p>
            <div className="flex gap-4 mt-5">
              <div className="flex-1 flex flex-col gap-4">
                <AnimatedInput
                  value={transaction?.nonce}
                  placeholder="Nonce"
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
          </div>
        </div>
      )}
    </div>
  )
}

export default GetAllTransactions
