import { useEffect, useState } from 'react'
import AnimatedSelect from './AnimatedSelect'
import DSafe from '@daoism-systems/dsafe-sdk'
import { CHAIN_ID } from '../constants'

interface Safe {
  address: string
  nonce: number
  threshold: number
  owners: string[]
  masterCopy: string
  modules: string[]
  fallbackHandler: string
  guard: string
  version: string
}

const SafeDetails = ({
  safes,
  dsafe,
}: {
  safes: Record<string, any>[]
  dsafe: DSafe | null
}) => {
  const [selectedSafe, setSelectedSafe] = useState('')
  const [safe, setSafe] = useState<Record<string, any> | undefined>({})

  useEffect(() => {
    console.log({ selectedSafe })

    if (selectedSafe) {
      const httpMethod = 'GET'
      const apiUrl = `/v1/safes/${selectedSafe}/`
      const payload = {
        address: selectedSafe,
      }
      const network = CHAIN_ID

      dsafe
        ?.fetchLegacy(httpMethod, apiUrl, payload, network)
        .then((safeResponse: any) => {
          console.log({ safeResponse })
          setSafe(safeResponse.data)
        })
    }
  }, [selectedSafe])

  return (
    <div>
      <AnimatedSelect
        options={safes.map((safe) => safe.safeAddress)}
        value={selectedSafe}
        setValue={setSelectedSafe}
        placeholder="Select Safe"
      />
      <table className="mt-5">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Address</td>
            <td>{safe?.address}</td>
          </tr>
          <tr>
            <td>Nonce</td>
            <td>{safe?.nonce}</td>
          </tr>
          <tr>
            <td>Threshold</td>
            <td>{safe?.threshold}</td>
          </tr>
          <tr>
            <td>Owners</td>
            <td>{safe?.owners}</td>
          </tr>
          <tr>
            <td>Master Copy</td>
            <td>{safe?.masterCopy}</td>
          </tr>
          <tr>
            <td>Modules</td>
            <td>{safe?.modules}</td>
          </tr>
          <tr>
            <td>Fallback Handler</td>
            <td>{safe?.fallbackHandler}</td>
          </tr>
          <tr>
            <td>Guard</td>
            <td>{safe?.guard}</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>{safe?.version}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SafeDetails
