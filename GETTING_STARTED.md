# 🚀 Getting Started with Base Builder Vault

Welcome! This guide will get you from zero to a working dApp in under 10 minutes.

## What You'll Build

By the end of this guide, you'll have:
- ✅ A running Next.js dApp on localhost
- ✅ Smart contracts deployed on Base Sepolia testnet
- ✅ Wallet connected via WalletConnect
- ✅ Working features: Storage, NFT minting, Tip jar

## Prerequisites

Before starting, ensure you have:
- [ ] **Node.js 18+** installed ([Download](https://nodejs.org))
- [ ] **MetaMask** wallet extension ([Install](https://metamask.io))
- [ ] **Code editor** (VS Code recommended)
- [ ] **Terminal** access

**Time required:** 10-15 minutes

---

## Step 1: Install Dependencies (1 min)

Open terminal in the `basebuilder` folder and run:

```bash
npm install
```

This installs all required packages:
- Next.js, React, TypeScript
- Wagmi, Viem (Web3 libraries)
- WalletConnect AppKit
- Tailwind CSS

**Expected output:** Package installation messages, no errors.

---

## Step 2: Get Test ETH (2 min)

You need Base Sepolia testnet ETH to deploy contracts and interact with them.

### Option A: Base Sepolia Faucet (Recommended)
1. Visit [Base Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
2. Connect your MetaMask wallet
3. Request testnet ETH
4. Wait 1-2 minutes for ETH to arrive

### Option B: Bridge from Ethereum Sepolia
1. Get Sepolia ETH from [Alchemy Faucet](https://sepoliafaucet.com)
2. Bridge to Base Sepolia via [Base Bridge](https://bridge.base.org)

**Check balance:** Open MetaMask → Base Sepolia network → Should see ~0.1 ETH

---

## Step 3: Add Base Sepolia to MetaMask (1 min)

If you don't have Base Sepolia network in MetaMask:

1. Open MetaMask
2. Click network dropdown (top)
3. Click "Add network"
4. Click "Add network manually"
5. Enter these details:
   ```
   Network Name: Base Sepolia
   RPC URL: https://sepolia.base.org
   Chain ID: 84532
   Currency Symbol: ETH
   Block Explorer: https://sepolia.basescan.org
   ```
6. Click "Save"
7. Switch to Base Sepolia network

---

## Step 4: Deploy Smart Contracts (3 min)

### Using Remix IDE (Easiest Method)

**4.1. Open Remix**
- Visit [remix.ethereum.org](https://remix.ethereum.org)
- Wait for IDE to load

**4.2. Create BaseStorage.sol**
- Click "+" icon (create new file)
- Name it: `BaseStorage.sol`
- Copy content from your local `contracts/BaseStorage.sol`
- Paste into Remix editor

**4.3. Create BaseNFT.sol**
- Click "+" icon again
- Name it: `BaseNFT.sol`
- Copy content from your local `contracts/BaseNFT.sol`
- Paste into Remix

**4.4. Compile Contracts**
- Click "Solidity Compiler" tab (left sidebar, 2nd icon)
- Select compiler version: `0.8.20` or higher
- Click "Compile BaseStorage.sol" (blue button)
- Wait for green checkmark ✓
- Click "Compile BaseNFT.sol"
- Wait for green checkmark ✓

**4.5. Deploy BaseStorage**
- Click "Deploy & Run Transactions" tab (3rd icon)
- Environment: Select "Injected Provider - MetaMask"
- MetaMask popup → Select Base Sepolia → Connect
- Contract dropdown: Select "BaseStorage"
- Click orange "Deploy" button
- Confirm transaction in MetaMask
- Wait ~10 seconds
- See "Deployed Contracts" section below
- Click copy icon next to contract name
- **Save this address!** You'll need it next

**4.6. Deploy BaseNFT**
- Contract dropdown: Select "BaseNFT"
- Click "Deploy" button
- Confirm in MetaMask
- Wait ~10 seconds
- Copy deployed address
- **Save this address!**

**Example addresses (yours will be different):**
```
BaseStorage: 0x1234567890abcdef1234567890abcdef12345678
BaseNFT:     0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
```

---

## Step 5: Update Environment Variables (1 min)

Open `.env.local` in your code editor:

```env
NEXT_PUBLIC_PROJECT_ID=1eebe528ca0ce94a99ceaa2e915058d7
NEXT_PUBLIC_BASE_STORAGE_ADDRESS=0xYOUR_STORAGE_ADDRESS_HERE
NEXT_PUBLIC_NFT_MINTER_ADDRESS=0xYOUR_NFT_ADDRESS_HERE
```

**Replace:**
- `0xYOUR_STORAGE_ADDRESS_HERE` → Your BaseStorage address from Step 4.5
- `0xYOUR_NFT_ADDRESS_HERE` → Your BaseNFT address from Step 4.6

**Save the file** (Cmd+S / Ctrl+S)

---

## Step 6: Run Development Server (30 sec)

In terminal:

```bash
npm run dev
```

**Expected output:**
```
✓ Ready in 2.3s
○ Local: http://localhost:3000
```

**Open browser:** [http://localhost:3000](http://localhost:3000)

You should see the Base Builder Vault homepage!

---

## Step 7: Test the dApp (3 min)

### Connect Wallet

1. Click blue **"Connect Wallet"** button (top right)
2. WalletConnect modal appears
3. Click **"MetaMask"**
4. MetaMask popup → Click **"Connect"**
5. Success! You should see:
   - Your address (shortened, e.g., `0x1234...5678`)
   - Your ETH balance

### Test Storage Tab (Already Selected)

1. See "Current Stored Value" card → shows `0` (initial)
2. Scroll to "Store New Value" card
3. Enter a number, e.g., `42`
4. Click blue **"Store Value"** button
5. MetaMask popup → Click **"Confirm"**
6. Wait ~5-10 seconds
7. Green toast notification: ✓ "Value stored successfully!"
8. "Current Stored Value" updates to `42`
9. Your stats show:
   - Your Last Value: `42`
   - Your Total Updates: `1`

### Test Increment

1. Click **"+1 Increment"** button
2. Confirm in MetaMask
3. Wait for confirmation
4. Value increases to `43`

### Test NFT Minter Tab

1. Click **"NFT Minter"** tab (top)
2. See collection stats:
   - Total Minted: `0`
   - Max Supply: `10000`
3. Click **"Mint for 0.001 ETH"** button
4. MetaMask popup → Confirm (0.001 ETH + gas fee)
5. Wait ~10 seconds
6. Success toast ✓
7. Stats update:
   - Total Minted: `1`
   - Your NFTs: `1`

### Test Tip Jar Tab

1. Click **"Tip Jar"** tab
2. Click **"Custom Address"** button
3. Enter any address (your own or friend's):
   ```
   0x742d35Cc6634C0532925a3b844Bc454e4438f44e
   ```
4. Click **"0.001"** quick amount button
5. Click **"Send 0.001 ETH"** button
6. Confirm in MetaMask
7. Wait for confirmation
8. Success! Transaction sent

### Verify on Basescan

1. After any transaction, see "Transaction Submitted" card
2. Click the transaction hash link (blue underlined)
3. Opens Basescan in new tab
4. See transaction details:
   - Status: Success ✓
   - Block number
   - From/To addresses
   - Gas used

---

## 🎉 Congratulations!

You now have a fully working Web3 dApp!

### What You've Accomplished

✅ Installed a Next.js dApp
✅ Deployed smart contracts to Base Sepolia
✅ Connected wallet via WalletConnect
✅ Stored data on-chain
✅ Minted an NFT
✅ Sent ETH transaction
✅ Verified transactions on Basescan

---

## Next Steps

### Explore Features

**Storage Tab:**
- Try storing different numbers
- Watch real-time updates (green "🟢 Live" indicator)
- Click to pause/resume polling
- Check your user stats

**NFT Tab:**
- Mint more NFTs
- Watch progress bar fill up
- See your collection grow

**Tip Jar:**
- Send tips to different addresses
- Try different amounts
- Monitor recipient balance

### Customize the dApp

**Easy Customizations:**
- Change colors in `tailwind.config.ts`
- Edit text in components
- Modify contract logic
- Add new features

**Advanced:**
- Add new contract functions
- Create new tabs
- Integrate additional protocols
- Deploy to mainnet

### Deploy to Production

When ready to share your dApp:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "My Base Builder Vault"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Import GitHub repo
   - Add environment variables
   - Click Deploy
   - Get live URL!

3. **Submit to WalletConnect:**
   - Follow [WALLETCONNECT_SUBMISSION.md](WALLETCONNECT_SUBMISSION.md)
   - Create demo video
   - Share your work!

---

## Troubleshooting

### "Contract not deployed" warning appears
**Fix:** Double-check contract addresses in `.env.local`, restart dev server

### Transactions fail
**Fix:** Ensure sufficient ETH balance in MetaMask on Base Sepolia

### Wallet won't connect
**Fix:** Clear browser cache, try incognito mode, check Project ID

### Value doesn't update after storing
**Fix:** Wait 10-15 seconds, refresh page if needed

### Build errors
**Fix:** Delete `node_modules` and `.next` folders, run `npm install` again

---

## Learning Resources

### Documentation
- [SETUP.md](SETUP.md) - Detailed setup guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - How everything works
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete overview

### Web3 Concepts
- [Base Documentation](https://docs.base.org)
- [WalletConnect Docs](https://docs.reown.com/appkit)
- [Wagmi Tutorial](https://wagmi.sh/react/getting-started)

### Solidity Learning
- [Solidity by Example](https://solidity-by-example.org)
- [Remix Documentation](https://remix-ide.readthedocs.io)

---

## Get Help

**Issues?**
- Check [README.md](README.md) FAQ section
- Review error messages carefully
- Search [Base Discord](https://discord.gg/base)

**Want to Contribute?**
- Fork the repo
- Make improvements
- Submit pull request

---

## What's Next?

You've just built your first production-ready Web3 dApp! 🚀

Consider:
- 🌟 Adding your own smart contract
- 🌟 Implementing new features
- 🌟 Deploying to Base mainnet
- 🌟 Sharing with the community
- 🌟 Submitting to WalletConnect program

**Happy building on Base!** ⚡

---

**Questions?** Open an issue on GitHub or ask in the Base Discord.

**Built with ❤️ for the WalletConnect + Base Builder Program**
