'use client';

import { ReactNode } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { base, baseSepolia } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiAdapter, projectId } from '@/config/wagmi';

// Set up queryClient
const queryClient = new QueryClient();

// Set up metadata
const metadata = {
  name: 'Base Builder Vault',
  description: 'A production-ready dApp for Base chain with WalletConnect integration',
  url: 'https://base-builder-vault.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// Create the modal
if (projectId) {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [base, baseSepolia],
    defaultNetwork: base,
    metadata,
    features: {
      analytics: true,
      email: false,
      socials: [],
    },
    themeMode: 'light',
    themeVariables: {
      '--w3m-color-mix': '#0052FF',
      '--w3m-accent': '#0052FF',
    },
  });
}

export function Web3Modal({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
