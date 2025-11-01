# 🏗️ Base Builder Vault

A production-ready Web3 dApp built for the **WalletConnect + Base Builder Program**, showcasing deep integration with WalletConnect's AppKit and Base chain infrastructure.

![Base Builder Vault](https://img.shields.io/badge/Built%20on-Base-0052FF?style=for-the-badge&logo=ethereum)
![WalletConnect](https://img.shields.io/badge/WalletConnect-AppKit-3B99FC?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)

## 🚀 Live Deployment

**Smart Contracts (Base Sepolia Testnet):**
- BaseStorage: [`0x3a2D0ac1CD3389A6a9E842d81806A5457e0a1fA0`](https://sepolia.basescan.org/address/0x3a2D0ac1CD3389A6a9E842d81806A5457e0a1fA0)
- BaseNFT: [`0xe0999DC9273ec26CE8ae65178E26bE4dB404673C`](https://sepolia.basescan.org/address/0xe0999DC9273ec26CE8ae65178E26bE4dB404673C)

**Status:** ✅ Deployed and verified on Base Sepolia

## 🎯 Overview

Base Builder Vault is a comprehensive dApp demonstrating best practices for:
- ✅ Seamless wallet connection via WalletConnect AppKit
- ✅ Base chain integration (mainnet + Sepolia testnet)
- ✅ Smart contract interactions using Wagmi hooks
- ✅ Transaction lifecycle management with robust error handling
- ✅ Real-time data polling and state synchronization
- ✅ Professional UI/UX with loading states and user feedback

## ✨ Features

### 💾 Storage Tab
- Store and retrieve uint256 values on-chain
- Real-time value polling with live/pause toggle
- Increment counter functionality
- User-specific stats (last value, total updates)
- Transaction history via Basescan links

### 🖼️ NFT Minter Tab
- Mint ERC721-like NFTs on Base
- Collection stats (total supply, max supply, mint progress)
- User balance tracking
- Dynamic pricing (0.001 ETH per mint)
- Sold-out detection

### 💝 Tip Jar Tab
- Send ETH tips to any address
- Quick-amount buttons (0.001, 0.01, 0.1 ETH)
- Custom amount input
- Recipient balance monitoring
- Transaction confirmation flow

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- MetaMask or WalletConnect-compatible wallet
- Base Sepolia testnet ETH ([Get from faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

### Installation

1. **Clone and install dependencies:**
```bash
cd basebuilder
npm install
```

2. **Configure environment variables:**
The project is already set up with your Project ID in `.env.local`:
```env
NEXT_PUBLIC_PROJECT_ID=1eebe528ca0ce94a99ceaa2e915058d7
NEXT_PUBLIC_BASE_STORAGE_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_NFT_MINTER_ADDRESS=0x0000000000000000000000000000000000000000
```

3. **Deploy smart contracts** (see [Contract Deployment](#-contract-deployment) below)

4. **Update contract addresses** in `.env.local` with your deployed addresses

5. **Run development server:**
```bash
npm run dev
```

6. **Open** [http://localhost:3000](http://localhost:3000)

## 📜 Contract Deployment

### Option 1: Remix IDE (Recommended for Beginners)

1. **Open Remix:** Visit [remix.ethereum.org](https://remix.ethereum.org)

2. **Create contracts:**
   - Create `BaseStorage.sol` and copy code from `/contracts/BaseStorage.sol`
   - Create `BaseNFT.sol` and copy code from `/contracts/BaseNFT.sol`

3. **Compile:**
   - Go to "Solidity Compiler" tab
   - Select compiler version `0.8.20+`
   - Click "Compile BaseStorage.sol" and "Compile BaseNFT.sol"

4. **Deploy to Base Sepolia:**
   - Get testnet ETH from [Base Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
   - Configure MetaMask for Base Sepolia:
     - Network Name: **Base Sepolia**
     - RPC URL: `https://sepolia.base.org`
     - Chain ID: **84532**
     - Currency: **ETH**
     - Explorer: `https://sepolia.basescan.org`
   - In Remix, go to "Deploy & Run Transactions"
   - Select "Injected Provider - MetaMask"
   - Deploy both contracts
   - Copy deployed addresses

5. **Verify on Basescan:**
   - Visit [sepolia.basescan.org](https://sepolia.basescan.org)
   - Search for your contract address
   - Click "Contract" → "Verify and Publish"
   - Follow the verification wizard

6. **Update `.env.local`:**
```env
NEXT_PUBLIC_BASE_STORAGE_ADDRESS=0xYourBaseStorageAddress
NEXT_PUBLIC_NFT_MINTER_ADDRESS=0xYourBaseNFTAddress
```

### Option 2: Foundry (Advanced)

See [contracts/deployment-guide.md](contracts/deployment-guide.md) for detailed Foundry instructions.

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS 3.4 |
| **Web3** | Wagmi 2.x, Viem 2.x |
| **Wallet** | @reown/appkit 1.x, @reown/appkit-adapter-wagmi |
| **State** | @tanstack/react-query 5.x |
| **Smart Contracts** | Solidity 0.8.20 |
| **Deployment** | Vercel (frontend), Base chain (contracts) |

## 📁 Project Structure

```
basebuilder/
├── app/
│   ├── layout.tsx          # Root layout with Web3Modal provider
│   ├── page.tsx            # Main page with tabs
│   └── globals.css         # Global styles + utilities
├── components/
│   ├── ConnectButton.tsx   # Wallet connect/disconnect UI
│   ├── NetworkGuard.tsx    # Base chain enforcement
│   ├── LoadingSpinner.tsx  # Loading states
│   ├── Toast.tsx           # Toast notifications
│   └── tabs/
│       ├── StorageTab.tsx  # Storage contract UI
│       ├── NFTTab.tsx      # NFT minter UI
│       └── TipJarTab.tsx   # Tip jar UI
├── config/
│   └── wagmi.ts            # Wagmi + AppKit configuration
├── context/
│   └── Web3Modal.tsx       # AppKit modal setup
├── contracts/
│   ├── BaseStorage.sol     # Storage contract
│   ├── BaseNFT.sol         # NFT minter contract
│   ├── deployment-guide.md # Deployment instructions
│   └── abis/
│       ├── BaseStorageABI.ts
│       └── BaseNFTABI.ts
├── .env.local              # Environment variables
├── package.json
└── README.md
```

## 🔐 Security Features

- ✅ Input validation on all user inputs
- ✅ Transaction amount validation
- ✅ Network verification (Base mainnet/Sepolia only)
- ✅ Error boundary for wallet connection failures
- ✅ Safe BigInt/parseEther conversions
- ✅ No private key exposure (all client-side signing)

## 🎨 UI/UX Highlights

- **Responsive Design:** Mobile-first Tailwind components
- **Loading States:** Spinners during tx confirmation
- **Toast Notifications:** Success/error/warning feedback
- **Real-time Updates:** Auto-polling with manual pause
- **Transaction Links:** Direct Basescan integration
- **Network Modals:** Automatic Base chain switching
- **Offline Detection:** Graceful degradation

## 🧪 Testing

### Manual Testing Checklist

Storage Tab:
- [ ] Connect wallet → See current value
- [ ] Store value → Confirm tx → See updated value
- [ ] Increment → Confirm tx → Value increases
- [ ] Check user stats update

NFT Tab:
- [ ] See collection stats (supply, progress bar)
- [ ] Mint NFT → Confirm tx with 0.001 ETH
- [ ] Check balance increases
- [ ] Verify sold-out state at max supply

Tip Jar Tab:
- [ ] Set custom recipient address
- [ ] Send tip (quick amount) → Confirm tx
- [ ] Send custom amount → Verify on Basescan
- [ ] Check recipient balance

### Network Testing
- [ ] Connect on wrong network → See modal
- [ ] Switch to Base → Modal disappears
- [ ] Try Base Sepolia → Works correctly

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Base Builder Vault"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. **Deploy on Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_PROJECT_ID`
     - `NEXT_PUBLIC_BASE_STORAGE_ADDRESS`
     - `NEXT_PUBLIC_NFT_MINTER_ADDRESS`
   - Click "Deploy"

3. **Production checklist:**
   - [ ] Contracts deployed to Base mainnet
   - [ ] Contract addresses updated in Vercel env vars
   - [ ] Contracts verified on Basescan
   - [ ] Test all features on production URL
   - [ ] Check mobile responsiveness
   - [ ] Verify transaction links work

## 📊 WalletConnect Submission Tips

### Highlight These Features:
1. **Deep AppKit Integration:**
   - Multi-wallet support (MetaMask, WalletConnect, Coinbase Wallet)
   - Session persistence via cookie storage
   - Customized modal theme matching Base branding

2. **Base Chain Focus:**
   - Automatic network switching to Base
   - Testnet fallback (Base Sepolia)
   - Basescan integration for tx verification

3. **Production-Ready Code:**
   - TypeScript throughout
   - Error handling at every interaction point
   - Loading states for all async operations
   - Real-time data synchronization

4. **User Experience:**
   - Clear onboarding flow
   - Informative error messages
   - Transaction status tracking
   - Mobile-responsive design

### Submission Materials:
- **GitHub Repo:** Public repository with this README
- **Live Demo:** Vercel deployment URL
- **Video/GIF:** Screen recording showing wallet connect → tx flow
- **Contract Addresses:** Verified on Basescan
- **Architecture Doc:** This README serves as technical documentation

## 🐛 Troubleshooting

### "Contract not deployed" warning
- Deploy contracts to Base Sepolia/mainnet
- Update contract addresses in `.env.local`
- Restart dev server (`npm run dev`)

### Wallet won't connect
- Check Project ID is correct in `.env.local`
- Clear browser cache/cookies
- Try different wallet (MetaMask, Coinbase Wallet)

### Transaction fails
- Ensure sufficient ETH balance
- Check connected to correct network (Base/Base Sepolia)
- Increase gas limit if custom gas used
- Verify contract address is correct

### "Wrong network" modal stuck
- Manually switch network in wallet
- Check RPC URL: `https://mainnet.base.org` or `https://sepolia.base.org`
- Refresh page after network change

## 📚 Resources

- [Base Documentation](https://docs.base.org)
- [WalletConnect AppKit Docs](https://docs.reown.com/appkit/overview)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [Base Faucet (Testnet)](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- [Base Bridge](https://bridge.base.org)
- [Basescan](https://basescan.org)

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs via GitHub Issues
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built for the **WalletConnect + Base Builder Program**

- Thanks to the Base team for excellent documentation
- Thanks to WalletConnect/Reown for AppKit
- Thanks to the Wagmi team for great React hooks

---

**Built with ❤️ on Base**

For questions or support, please open an issue on GitHub.
