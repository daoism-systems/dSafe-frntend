import './polyfill'
import '../index.css'
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, optimism, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const config = getDefaultConfig({
  appName: 'dSafe Frontend Demo',
  projectId: `${process.env.WALLETCONNECT_PROJECT_ID}`,
  chains: [mainnet, sepolia, optimism],
})

const queryClient = new QueryClient()

import React from 'react'

const RainbowKit = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default RainbowKit
