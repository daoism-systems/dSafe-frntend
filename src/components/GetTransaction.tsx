import React from 'react'
import AnimatedInput from './AnimatedInput'
import { Button } from 'flowbite-react'
import { fakeTxsData } from '../FakeData'
import DSafe from '@dsafe/sdk'
import { CERAMIC_NETWORK, CERAMIC_NODE, CHAIN_ID } from '../constants'

const GetTransaction = () => {
  const [transactionHash, setTransactionHash] = React.useState('')
  const [transaction, setTransaction] = React.useState<Record<
    string,
    string | number
  > | null>(null)

  const handleTransactionSearch = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    // TODO: Modify how transaction is being fetched on search
    if (transactionHash) {
      const dSafe = new DSafe(CHAIN_ID, CERAMIC_NETWORK)

      // arguements for dSafe Request
      const httpMethod = 'GET'
      const apiUrl = `/v1/multisig-transactions/${transactionHash}/`
      const payload = {
        safeTxHash: transactionHash,
      }

      const transactionsResponse = await dSafe.fetchLegacy(
        httpMethod,
        apiUrl,
        payload,
        CHAIN_ID,
      )

      console.log({ transactionsResponse })

      // Assuming there's a function to fetch transaction details by hash
      // This is a placeholder for the actual fetch logic
      const fetchedTransaction = fakeTxsData.find(
        (tx) => tx.safeTransactionHash === transactionHash,
      )
      setTransaction(fetchedTransaction || null)
    }
  }

  return (
    <div>
      <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
        Get Transaction
      </h2>
      <AnimatedInput
        value={transactionHash}
        setValue={setTransactionHash}
        placeholder="Transaction Hash"
      />
      <Button
        type="submit"
        className="bg-teal-500 text-white hover:bg-teal-600 cursor-pointer disabled:cursor-not-allowed text-center mt-5"
        onClick={handleTransactionSearch}
      >
        {`Search Transaction`}
      </Button>
      {transaction && (
        <div className="mt-5">
          <h2 className="text-gray-800 text-2xl font-bold mb-4">
            Transaction Details
          </h2>

          <div className="flex flex-col gap-4">
            <p>
              Nonce: <span>{transaction?.nonce}</span>
            </p>
            <div className="flex gap-4 mt-5">
              <div className="flex-1 flex flex-col gap-4">
                <AnimatedInput
                  value={'0xSafeAddress1'} // TODO: change magic value here
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
          </div>
        </div>
      )}
    </div>
  )
}

export default GetTransaction
