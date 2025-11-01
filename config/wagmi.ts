import { cookieStorage, createStorage, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// Get projectId from environment
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set');
}

// Define supported networks
export const networks = [base, baseSepolia];

// Create Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
