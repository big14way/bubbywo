# 📝 WalletConnect + Base Builder Program Submission Guide

This guide helps you prepare and submit your Base Builder Vault project for the WalletConnect + Base Builder Program.

## Pre-Submission Checklist

### Technical Requirements
- [x] ✅ WalletConnect AppKit integrated (`@reown/appkit`)
- [x] ✅ Base chain as primary network
- [x] ✅ Smart contracts deployed and verified
- [x] ✅ Production deployment (Vercel)
- [x] ✅ Mobile-responsive UI
- [x] ✅ Error handling and user feedback
- [x] ✅ TypeScript throughout
- [x] ✅ Open-source on GitHub

### Before Submitting
- [ ] Deploy contracts to Base Sepolia (testnet)
- [ ] Verify contracts on Basescan
- [ ] Update `.env.local` with contract addresses
- [ ] Test all features locally
- [ ] Push code to GitHub (public repo)
- [ ] Deploy to Vercel
- [ ] Test production deployment
- [ ] Create demo video/GIF

## Key Features to Highlight

### 1. Deep WalletConnect Integration

**What to showcase:**
- Multi-wallet support (MetaMask, Coinbase Wallet, 300+ via WalletConnect)
- Seamless connection flow with AppKit modal
- Session persistence via cookie storage
- Custom branding (Base blue theme)

**Evidence:**
```typescript
// config/wagmi.ts
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks,
});

// context/Web3Modal.tsx
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [base, baseSepolia],
  defaultNetwork: base,
  themeVariables: {
    '--w3m-accent': '#0052FF', // Base brand color
  },
});
```

### 2. Base Chain Focus

**What to showcase:**
- Auto-switch to Base network
- Testnet fallback (Base Sepolia)
- Direct Basescan integration
- Optimized for Base gas fees

**Evidence:**
```typescript
// components/NetworkGuard.tsx
const handleSwitchNetwork = async () => {
  try {
    await switchChain({ chainId: base.id });
  } catch {
    await switchChain({ chainId: baseSepolia.id }); // Fallback
  }
};
```

### 3. Production-Ready Code

**What to showcase:**
- TypeScript for type safety
- Wagmi hooks for contract interactions
- React Query for caching and optimistic updates
- Comprehensive error handling
- Loading states for all async operations
- Toast notifications for user feedback

**Evidence:**
```typescript
// components/tabs/StorageTab.tsx
const { data, isLoading, refetch } = useReadContract({
  address: CONTRACT_ADDRESS,
  abi: BaseStorageABI,
  functionName: 'retrieve',
  query: { refetchInterval: 3000 }, // Real-time polling
});

useEffect(() => {
  if (isTxSuccess) {
    showToast('Success!', 'success');
    refetch();
  }
}, [isTxSuccess]);
```

### 4. User Experience

**What to showcase:**
- Clear onboarding flow
- Real-time data updates with polling control
- Transaction status tracking
- Mobile-responsive design
- Informative error messages
- Clickable transaction hashes

**Evidence:**
- Screenshots of UI in action
- Demo video showing connect → transaction flow
- Mobile screenshots

## Submission Materials

### 1. GitHub Repository

**Required:**
- Public repository
- Complete README.md with:
  - Project description
  - Setup instructions
  - Tech stack
  - Live demo link
  - Screenshots
- Well-organized code structure
- Contract source code + ABIs
- Deployment guides

**Your repo structure:**
```
base-builder-vault/
├── README.md ✅
├── SETUP.md ✅
├── QUICK_START.md ✅
├── ARCHITECTURE.md ✅
├── app/ (Next.js pages) ✅
├── components/ (React components) ✅
├── contracts/ (Solidity + ABIs) ✅
├── config/ (Wagmi setup) ✅
└── context/ (Web3Modal provider) ✅
```

### 2. Live Demo

**Deployment on Vercel:**
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Base Builder Vault for WalletConnect program"
git remote add origin YOUR_REPO_URL
git push -u origin main

# 2. Deploy on Vercel
# - Import GitHub repo
# - Add environment variables
# - Deploy
```

**Your live URL:**
```
https://base-builder-vault.vercel.app
```

### 3. Demo Video/GIF

**What to show (2-3 minutes):**
1. Landing page → Click "Connect Wallet"
2. AppKit modal opens → Select wallet
3. Approve connection in wallet
4. Show connected state (address, balance)
5. Storage Tab:
   - Show current value
   - Enter new value → Click "Store"
   - Confirm in wallet
   - Wait for success toast
   - Value updates in real-time
6. NFT Tab:
   - Show collection stats
   - Click "Mint" → Confirm with 0.001 ETH
   - Success notification
   - Balance increases
7. Tip Jar Tab:
   - Enter recipient address
   - Select amount → Send tip
   - Transaction confirmed
8. Click transaction hash → Opens Basescan
9. Show mobile view (responsive design)

**Tools for recording:**
- [Loom](https://loom.com) - Easy screen recording
- [OBS Studio](https://obsproject.com) - Free, powerful
- [QuickTime](https://support.apple.com/guide/quicktime-player/record-your-screen-qtp97b08e666/mac) - Mac built-in
- [ShareX](https://getsharex.com) - Windows, GIF support

**Convert video to GIF:**
- [EZGIF](https://ezgif.com/video-to-gif)
- [CloudConvert](https://cloudconvert.com/mp4-to-gif)

### 4. Contract Verification

**Basescan links to include:**
- BaseStorage contract: `https://sepolia.basescan.org/address/0xYOUR_ADDRESS#code`
- BaseNFT contract: `https://sepolia.basescan.org/address/0xYOUR_ADDRESS#code`

Both should show:
- ✅ Green checkmark (verified)
- "Contract Source Code Verified"
- Readable Solidity code
- Read/Write Contract tabs functional

## Submission Template

### Project Title
```
Base Builder Vault - Production dApp with WalletConnect AppKit
```

### Short Description (1-2 sentences)
```
A production-ready Web3 dApp showcasing deep WalletConnect AppKit integration on Base chain,
featuring smart contract interactions for storage, NFT minting, and ETH transfers with
comprehensive error handling and real-time updates.
```

### Long Description (3-4 paragraphs)

```
Base Builder Vault is a comprehensive demonstration of WalletConnect AppKit integration
on the Base blockchain. The application provides three core features: on-chain value storage,
NFT minting, and a tip jar for ETH transfers, all accessed through an intuitive tabbed interface.

The project emphasizes production-ready code patterns including TypeScript throughout,
Wagmi hooks for contract interactions, React Query for optimistic updates, and comprehensive
error handling. Users experience seamless wallet connection via AppKit's modal, automatic
network switching to Base, and real-time transaction status updates with visual feedback.

Built with Next.js 14 (App Router), the dApp is fully responsive and optimized for both
desktop and mobile. Smart contracts are deployed and verified on Base Sepolia, demonstrating
proper testnet workflows before mainnet deployment.

Key technical achievements include session persistence via cookie storage, real-time data
polling with user controls, gas-optimized contract design, and direct Basescan integration
for transaction verification. The codebase is fully open-source and documented for educational
purposes and community contributions.
```

### Tech Stack
```
- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
- Web3: Wagmi 2.x, Viem 2.x, @reown/appkit 1.x
- Blockchain: Base (mainnet + Sepolia testnet)
- Smart Contracts: Solidity 0.8.20
- State Management: @tanstack/react-query
- Deployment: Vercel (frontend), Base chain (contracts)
```

### GitHub Repository
```
https://github.com/YOUR_USERNAME/base-builder-vault
```

### Live Demo
```
https://base-builder-vault.vercel.app
```

### Demo Video
```
[Link to Loom/YouTube video]
or
[Embed GIF in GitHub README]
```

### Contract Addresses (Base Sepolia)
```
BaseStorage: 0xYOUR_STORAGE_ADDRESS
BaseNFT: 0xYOUR_NFT_ADDRESS
```

### Verified Contracts
```
https://sepolia.basescan.org/address/0xYOUR_STORAGE_ADDRESS#code
https://sepolia.basescan.org/address/0xYOUR_NFT_ADDRESS#code
```

### Key Features
```
✅ WalletConnect AppKit v1 integration
✅ Multi-wallet support (MetaMask, Coinbase, WalletConnect)
✅ Base mainnet + Sepolia testnet support
✅ Auto-network switching
✅ Real-time contract data polling
✅ Transaction lifecycle management
✅ Comprehensive error handling
✅ Loading states and toast notifications
✅ Mobile-responsive Tailwind UI
✅ TypeScript throughout
✅ Verified smart contracts on Basescan
✅ Production deployment on Vercel
```

### Screenshots
```
[Include in GitHub README]
1. Landing page with connect button
2. AppKit modal (wallet selection)
3. Connected state (Storage tab)
4. NFT minting flow
5. Tip jar interface
6. Mobile view
7. Transaction confirmation
8. Basescan verification
```

### Team / Individual
```
[Your name/team]
Built for the WalletConnect + Base Builder Program
```

### Additional Notes
```
This project serves as a comprehensive template for developers building on Base with
WalletConnect. All code is open-source (MIT license) and extensively documented.
The architecture emphasizes modularity, allowing developers to easily extend features
or adapt components for their own projects.

Special attention was given to user experience, with clear feedback at every step,
graceful error handling, and educational tooltips. The project is production-ready
but also serves as a learning resource for the Base builder community.
```

## Where to Submit

### WalletConnect Builder Program
1. Check program announcement for submission link
2. Usually via:
   - Google Form
   - GitHub issue template
   - Email to program contact
   - Discord channel

### Base Builder Resources
- Submit to [Base Builders](https://base.org/builders)
- Share on [Base Discord](https://discord.gg/base)
- Tweet with #BaseBuilders #WalletConnect

## Post-Submission

### Promotion Strategy
1. **Tweet about it:**
   ```
   Just submitted my Base Builder Vault to @WalletConnect + @base Builder Program! 🚀

   ✅ AppKit integration
   ✅ On-chain storage
   ✅ NFT minting
   ✅ Tip jar

   Live demo: [URL]
   GitHub: [URL]

   #BaseBuilders #WalletConnect #Web3
   ```

2. **LinkedIn post:**
   - Share project with professional network
   - Highlight technical achievements
   - Link to live demo and GitHub

3. **Reddit:**
   - r/ethdev
   - r/CryptoCurrency
   - r/web3

4. **Dev.to / Medium article:**
   - Write technical walkthrough
   - Share learnings
   - Include code snippets

### Iterate Based on Feedback
- Monitor GitHub issues
- Respond to community questions
- Add requested features
- Fix reported bugs

## Success Metrics

**Strong submission indicators:**
- ✅ All contracts verified on Basescan
- ✅ Live demo works flawlessly
- ✅ Mobile-responsive (test on actual devices)
- ✅ Clear documentation
- ✅ Professional demo video
- ✅ Active GitHub repo (commits, README, issues enabled)
- ✅ Fast loading times (Vercel's free tier is excellent)
- ✅ No console errors in production

**Bonus points:**
- 🌟 Mainnet deployment (in addition to testnet)
- 🌟 Custom domain (via Vercel)
- 🌟 Analytics integration (PostHog, Mixpanel)
- 🌟 ENS integration
- 🌟 Social sharing features
- 🌟 Dark mode
- 🌟 i18n (multiple languages)

## FAQ

**Q: Should I deploy to mainnet or testnet?**
A: Start with Base Sepolia testnet. Include mainnet deployment if you have real ETH and want to showcase production readiness.

**Q: How important is the demo video?**
A: Very important! It's the first thing reviewers see. Make it clear, concise, and show the full user journey.

**Q: Can I use this project as a template for my own idea?**
A: Yes! That's the point. Fork the repo, customize features, and submit your unique version.

**Q: What if I find bugs after submission?**
A: Fix them ASAP and redeploy. Update the submission if possible. Active maintenance is a plus.

**Q: Should I add more features before submitting?**
A: The current feature set is sufficient. Focus on quality over quantity. Ensure everything works perfectly first.

---

**Good luck with your submission! 🚀**

If you have questions, open an issue on GitHub or reach out to the Base/WalletConnect communities.
