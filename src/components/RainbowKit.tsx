import './polyfill'
import '../index.css'
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { http, WagmiProvider } from 'wagmi'
import { mainnet, optimism, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const config = getDefaultConfig({
  appName: 'dSafe Frontend Demo',
  projectId: `${process.env.WALLETCONNECT_PROJECT_ID}`,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/Gz_-o1UeTc7h_KUIyoOBK-yHSngvllyq',
    ),
  },
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
