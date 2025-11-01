# 🏛️ Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js 14 App Router                      │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  UI Components (React 18 + Tailwind)             │  │ │
│  │  │  - ConnectButton                                  │  │ │
│  │  │  - NetworkGuard                                   │  │ │
│  │  │  - StorageTab / NFTTab / TipJarTab               │  │ │
│  │  └────────────────┬─────────────────────────────────┘  │ │
│  │                   │                                     │ │
│  │  ┌────────────────▼─────────────────────────────────┐  │ │
│  │  │  Wagmi Hooks (useReadContract, useWriteContract) │  │ │
│  │  └────────────────┬─────────────────────────────────┘  │ │
│  │                   │                                     │ │
│  │  ┌────────────────▼─────────────────────────────────┐  │ │
│  │  │  Viem (Ethereum client library)                  │  │ │
│  │  └────────────────┬─────────────────────────────────┘  │ │
│  └───────────────────┼──────────────────────────────────┘  │
│                      │                                      │
│  ┌───────────────────▼──────────────────────────────────┐  │
│  │  WalletConnect AppKit (@reown/appkit)                │  │
│  │  - Multi-wallet support                              │  │
│  │  - Session management (cookie storage)               │  │
│  │  - QR code modal                                     │  │
│  └───────────────────┬──────────────────────────────────┘  │
└────────────────────┼─────────────────────────────────────┘
                     │
                     │ JSON-RPC
                     │
┌────────────────────▼─────────────────────────────────────┐
│              Wallet (MetaMask, etc.)                      │
│  - Private key signing                                    │
│  - Transaction approval                                   │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ Signed Transaction
                     │
┌────────────────────▼─────────────────────────────────────┐
│                  Base Chain (L2)                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Smart Contracts                                    │  │
│  │  - BaseStorage.sol (0x...)                         │  │
│  │  - BaseNFT.sol (0x...)                             │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
app/layout.tsx (Root)
├── Web3Modal (Provider)
│   ├── WagmiProvider
│   │   └── QueryClientProvider (@tanstack/react-query)
│   └── AppKit Modal
│
app/page.tsx (Main)
├── NetworkGuard
│   └── [Modal when wrong network]
├── Header
│   └── ConnectButton
│       ├── Account info
│       └── Balance display
├── Tabs Navigation
└── Tab Content
    ├── StorageTab
    │   ├── useReadContract (retrieve)
    │   ├── useReadContract (getUserValue)
    │   ├── useWriteContract (store)
    │   └── useWaitForTransactionReceipt
    ├── NFTTab
    │   ├── useReadContract (totalSupply)
    │   ├── useReadContract (balanceOf)
    │   ├── useWriteContract (mint)
    │   └── useWaitForTransactionReceipt
    └── TipJarTab
        ├── useSendTransaction
        ├── useWaitForTransactionReceipt
        └── useBalance (recipient)
```

## Data Flow

### Read Flow (Polling)
```
1. Component mounts
2. useReadContract hook initializes
3. Query enabled if: connected && contract address valid
4. Poll every 3-5 seconds (refetchInterval)
5. Viem fetches data via RPC
6. React Query caches result
7. Component re-renders with new data
```

### Write Flow (Transaction)
```
1. User clicks button (e.g., "Store Value")
2. Input validation
3. useWriteContract.writeContract() called
4. AppKit prompts wallet approval
5. User confirms in MetaMask
6. Transaction submitted to mempool
7. Hash returned → useWaitForTransactionReceipt monitors
8. Transaction mined → isSuccess = true
9. Toast notification shown
10. Read hooks refetch data
11. UI updates with new state
```

## State Management

### Wagmi + React Query
- **Wagmi hooks** wrap contract interactions
- **React Query** provides caching, refetching, optimistic updates
- **No Redux/Zustand needed** for simple dApps

### Local Component State
```typescript
// Controlled inputs
const [inputValue, setInputValue] = useState('');

// UI toggles
const [isPolling, setIsPolling] = useState(true);

// Custom address
const [recipientAddress, setRecipientAddress] = useState('0x...');
```

## Smart Contract Integration

### Contract Configuration
```typescript
// contracts/abis/BaseStorageABI.ts
export const BaseStorageABI = [...] as const;

// Usage in component
import { BaseStorageABI } from '@/contracts/abis/BaseStorageABI';

const { data } = useReadContract({
  address: CONTRACT_ADDRESS,
  abi: BaseStorageABI,
  functionName: 'retrieve',
});
```

### Read Contracts
```typescript
useReadContract({
  address: '0x...',
  abi: BaseStorageABI,
  functionName: 'retrieve',
  args: [], // Optional arguments
  query: {
    enabled: isConnected, // Conditional fetching
    refetchInterval: 3000, // Poll every 3s
  },
});
```

### Write Contracts
```typescript
const { writeContract } = useWriteContract();

writeContract({
  address: '0x...',
  abi: BaseStorageABI,
  functionName: 'store',
  args: [BigInt(42)],
});
```

### Transaction Receipts
```typescript
const { data: hash } = useWriteContract();

const { isLoading, isSuccess } = useWaitForTransactionReceipt({
  hash, // Transaction hash from writeContract
});

useEffect(() => {
  if (isSuccess) {
    showToast('Success!', 'success');
    refetch(); // Re-fetch contract data
  }
}, [isSuccess]);
```

## Network Configuration

### Supported Networks
```typescript
// config/wagmi.ts
export const networks = [base, baseSepolia] as const;

// Base Mainnet
{
  id: 8453,
  name: 'Base',
  rpcUrls: { default: 'https://mainnet.base.org' },
}

// Base Sepolia Testnet
{
  id: 84532,
  name: 'Base Sepolia',
  rpcUrls: { default: 'https://sepolia.base.org' },
}
```

### Network Switching
```typescript
const { switchChain } = useSwitchChain();

// Auto-switch to Base
await switchChain({ chainId: base.id });

// Fallback to testnet on error
try {
  await switchChain({ chainId: base.id });
} catch {
  await switchChain({ chainId: baseSepolia.id });
}
```

## AppKit Configuration

### Modal Setup
```typescript
// context/Web3Modal.tsx
createAppKit({
  adapters: [wagmiAdapter],
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  networks: [base, baseSepolia],
  defaultNetwork: base,
  metadata: {
    name: 'Base Builder Vault',
    description: '...',
    url: '...',
    icons: ['...'],
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#0052FF', // Base blue
  },
});
```

### Wallet Support
- **Injected:** MetaMask, Coinbase Wallet, Brave Wallet
- **WalletConnect:** 300+ wallets via QR code
- **Mobile:** Deep linking to wallet apps

## Error Handling

### Levels of Error Handling

1. **Input Validation:**
```typescript
if (!inputValue || isNaN(Number(inputValue))) {
  showToast('Invalid input', 'warning');
  return;
}
```

2. **Connection Guards:**
```typescript
if (!isConnected) {
  return <div>Connect wallet to continue</div>;
}
```

3. **Network Guards:**
```typescript
if (chain?.id !== base.id) {
  return <NetworkGuardModal />;
}
```

4. **Transaction Errors:**
```typescript
useEffect(() => {
  if (writeError) {
    showToast(writeError.message, 'error');
  }
}, [writeError]);
```

5. **Contract Errors:**
```typescript
if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x000...') {
  return <ContractNotDeployedWarning />;
}
```

## Performance Optimizations

### 1. Conditional Queries
```typescript
query: {
  enabled: isConnected && !!address && !!CONTRACT_ADDRESS,
}
```

### 2. Polling Control
```typescript
refetchInterval: isPolling ? 3000 : false
```

### 3. React Query Caching
- Default cache time: 5 minutes
- Stale time: 0 (always refetch on mount)
- Auto garbage collection

### 4. Code Splitting
- Next.js automatic code splitting by route
- Dynamic imports for heavy components (future)

### 5. Memoization
```typescript
const memoizedValue = useMemo(
  () => expensiveCalculation(data),
  [data]
);
```

## Security Considerations

### 1. No Private Keys in Code
- All signing happens in user's wallet
- Never store or transmit private keys

### 2. Input Sanitization
```typescript
// Validate addresses
if (!address.startsWith('0x') || address.length !== 42) {
  throw new Error('Invalid address');
}

// Validate amounts
if (amount <= 0 || isNaN(amount)) {
  throw new Error('Invalid amount');
}
```

### 3. Contract Address Validation
```typescript
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BASE_STORAGE_ADDRESS as `0x${string}`;

if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x000...') {
  // Show warning, prevent interactions
}
```

### 4. Transaction Verification
- Always show transaction hash
- Link to Basescan for verification
- Wait for confirmations

### 5. Network Enforcement
- Auto-switch to Base
- Disable interactions on wrong network
- Clear warning modals

## Testing Strategy

### Unit Tests (Future)
```typescript
// Example: Testing storage tab
describe('StorageTab', () => {
  it('displays current value', async () => {
    // Mock useReadContract
    // Assert value renders
  });

  it('stores new value on submit', async () => {
    // Mock useWriteContract
    // Simulate form submission
    // Assert transaction initiated
  });
});
```

### Integration Tests (Future)
- Test wallet connection flow
- Test network switching
- Test full transaction lifecycle

### Manual Testing (Current)
See [README.md](README.md) for testing checklist

## Deployment Architecture

```
Developer
   ├─> GitHub (source code)
   │
   ├─> Remix/Foundry ─> Base Chain
   │                     (smart contracts)
   │
   └─> Vercel ─────────> CDN
        (Next.js app)     (static assets)
                          │
                          └─> User's Browser
                               │
                               └─> Base RPC
                                    (read/write txs)
```

## Future Enhancements

### Phase 2 (Optional)
- [ ] Transaction history component
- [ ] Event log viewer
- [ ] Multi-sig support
- [ ] Gas estimation UI
- [ ] IPFS integration for NFT metadata
- [ ] Dark mode
- [ ] i18n (internationalization)

### Phase 3 (Advanced)
- [ ] Graph Protocol integration
- [ ] Analytics dashboard
- [ ] User profiles (ENS integration)
- [ ] Social sharing features
- [ ] Leaderboard

## Resources

- [Wagmi Architecture](https://wagmi.sh/react/guides/connect-wallet)
- [Viem Design](https://viem.sh/docs/introduction)
- [AppKit Integration](https://docs.reown.com/appkit/react/core/installation)
- [Base Chain Docs](https://docs.base.org/building-with-base)

---

**Questions?** Open an issue on GitHub!
