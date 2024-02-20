import DSafe from '@dsafe/sdk'
import SafeDetails from './SafeDetails'
import SafeTable from './SafeTable'
import React from 'react'

interface Props {
  dsafe: DSafe | null
}

const AboutSafe = ({ dsafe }: Props) => {
  return (
    <>
      <SafeDetails />
      <SafeTable />
    </>
  )
}

export default AboutSafe
