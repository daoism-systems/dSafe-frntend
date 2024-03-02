import DSafe from '@daoism-systems/dsafe-sdk'
import SafeDetails from './SafeDetails'
import { useEffect, useState } from 'react'
import { CHAIN_ID } from '../constants'
import { useAccount } from 'wagmi'

interface Props {
  dsafe: DSafe | null
}

const AboutSafe = ({ dsafe }: Props) => {
  const [safes, setSafes] = useState<Record<string, any>[]>([])

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

          setSafes(dsafeResponseForSafes.data)
        })
        .catch((error) => {
          console.error('Error fetching safes:', error)
        })
    }
  }, [account.address, dsafe])

  return (
    <>
      <SafeDetails safes={safes} dsafe={dsafe} />
      {/* <SafeTable /> */}
    </>
  )
}

export default AboutSafe
