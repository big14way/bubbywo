# ⚡ Quick Start Guide

Get Base Builder Vault running in 5 minutes!

## Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] MetaMask wallet installed
- [ ] Base Sepolia ETH ([Get from faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

## 1. Install Dependencies (1 min)
```bash
cd basebuilder
npm install
```

## 2. Environment Setup (Already Done!)
Your `.env.local` is configured with:
```env
NEXT_PUBLIC_PROJECT_ID=1eebe528ca0ce94a99ceaa2e915058d7
```

## 3. Deploy Contracts (2 min)

**Quick Remix Method:**
1. Open [remix.ethereum.org](https://remix.ethereum.org)
2. Create files `BaseStorage.sol` & `BaseNFT.sol` (copy from `/contracts`)
3. Compile with Solidity 0.8.20
4. Switch MetaMask to Base Sepolia
5. Deploy both contracts
6. Copy addresses

## 4. Update Contract Addresses (30 sec)
Edit `.env.local`:
```env
NEXT_PUBLIC_BASE_STORAGE_ADDRESS=0xYourAddress
NEXT_PUBLIC_NFT_MINTER_ADDRESS=0xYourAddress
```

## 5. Run Dev Server (30 sec)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 6. Test Features (1 min)
- ✅ Connect wallet
- ✅ Store a value (Storage tab)
- ✅ Mint an NFT (NFT tab)
- ✅ Send a tip (Tip Jar tab)

## Done! 🎉

### Next Steps:
- Verify contracts on [Basescan](https://sepolia.basescan.org)
- Deploy to production via [Vercel](https://vercel.com)
- Customize for your use case

### Need Help?
- See [SETUP.md](SETUP.md) for detailed guide
- See [README.md](README.md) for full documentation
- Open GitHub issue for support

---

**Pro Tips:**
- Use Live mode toggle in Storage tab for real-time updates
- Transaction hashes are clickable (opens Basescan)
- App auto-switches to Base if on wrong network
