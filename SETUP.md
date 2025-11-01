# 🚀 Complete Setup Guide

This guide walks you through setting up Base Builder Vault from scratch.

## Step 1: Install Dependencies

```bash
cd basebuilder
npm install
```

This will install all necessary packages including:
- Next.js 14
- React 18
- Wagmi 2.x & Viem
- @reown/appkit & adapter
- Tailwind CSS
- TypeScript

## Step 2: Environment Configuration

Your `.env.local` file is already set up with your Project ID:

```env
NEXT_PUBLIC_PROJECT_ID=1eebe528ca0ce94a99ceaa2e915058d7
NEXT_PUBLIC_BASE_STORAGE_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_NFT_MINTER_ADDRESS=0x0000000000000000000000000000000000000000
```

**Note:** Contract addresses are placeholders. You'll update these after deployment.

## Step 3: Get Test ETH

Before deploying contracts, you need Base Sepolia ETH:

1. Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
2. Connect your wallet
3. Request testnet ETH (may need to verify on social media)
4. Wait for ETH to arrive (~1-2 minutes)

## Step 4: Add Base Sepolia to MetaMask

If Base Sepolia isn't in your MetaMask:

1. Open MetaMask
2. Click network dropdown → "Add network"
3. Enter these details:
   - **Network Name:** Base Sepolia
   - **RPC URL:** `https://sepolia.base.org`
   - **Chain ID:** `84532`
   - **Currency Symbol:** ETH
   - **Block Explorer:** `https://sepolia.basescan.org`
4. Save and switch to Base Sepolia

## Step 5: Deploy Smart Contracts

### Using Remix IDE (Easiest)

1. **Open Remix:** [remix.ethereum.org](https://remix.ethereum.org)

2. **Create BaseStorage.sol:**
   - Click "New File" icon
   - Name: `BaseStorage.sol`
   - Copy content from `contracts/BaseStorage.sol`

3. **Create BaseNFT.sol:**
   - Click "New File" icon
   - Name: `BaseNFT.sol`
   - Copy content from `contracts/BaseNFT.sol`

4. **Compile Contracts:**
   - Go to "Solidity Compiler" tab (left sidebar)
   - Select compiler version: `0.8.20` or higher
   - Click "Compile BaseStorage.sol"
   - Click "Compile BaseNFT.sol"
   - Check for green checkmarks (no errors)

5. **Deploy BaseStorage:**
   - Go to "Deploy & Run Transactions" tab
   - Environment: Select "Injected Provider - MetaMask"
   - MetaMask will popup → Select Base Sepolia network
   - Contract dropdown: Select "BaseStorage"
   - Click orange "Deploy" button
   - Confirm transaction in MetaMask
   - Wait for deployment (~10 seconds)
   - Copy deployed address (shown in "Deployed Contracts" section)

6. **Deploy BaseNFT:**
   - Same process as above
   - Contract dropdown: Select "BaseNFT"
   - Click "Deploy"
   - Confirm in MetaMask
   - Copy deployed address

7. **Save Contract Addresses:**
   ```env
   NEXT_PUBLIC_BASE_STORAGE_ADDRESS=0xYOUR_STORAGE_ADDRESS
   NEXT_PUBLIC_NFT_MINTER_ADDRESS=0xYOUR_NFT_ADDRESS
   ```

## Step 6: Verify Contracts on Basescan

Verification makes your contracts readable on the explorer:

1. **Go to Basescan:**
   - Visit [sepolia.basescan.org](https://sepolia.basescan.org)
   - Paste your contract address in search bar

2. **Start Verification:**
   - Click "Contract" tab
   - Click "Verify and Publish" button
   - If prompted, sign in (create free account)

3. **Enter Verification Details:**
   - Compiler Type: `Solidity (Single file)`
   - Compiler Version: `v0.8.20+commit.a1b79de6`
   - License Type: `MIT`
   - Click "Continue"

4. **Paste Contract Code:**
   - Copy entire contract code from your `.sol` file
   - Paste into "Enter the Solidity Contract Code" field
   - Optimization: Select "No"
   - Click "Verify and Publish"

5. **Success!**
   - You should see "Contract Source Code Verified" ✅
   - Now anyone can read your contract on Basescan

6. **Repeat for Both Contracts** (BaseStorage and BaseNFT)

## Step 7: Update Environment Variables

Edit `.env.local` with your deployed addresses:

```env
NEXT_PUBLIC_PROJECT_ID=1eebe528ca0ce94a99ceaa2e915058d7
NEXT_PUBLIC_BASE_STORAGE_ADDRESS=0xYourActualBaseStorageAddress
NEXT_PUBLIC_NFT_MINTER_ADDRESS=0xYourActualNFTMinterAddress
```

**Important:** Replace the `0x000...` placeholders with real addresses!

## Step 8: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 9: Test the App

### Test Wallet Connection:
1. Click "Connect Wallet" button
2. Select MetaMask (or other wallet)
3. Approve connection
4. See your address and balance appear

### Test Storage Tab:
1. Click "Storage" tab
2. Current value should show (likely 0)
3. Enter a number (e.g., 42) in input field
4. Click "Store Value" button
5. Confirm transaction in MetaMask
6. Wait for confirmation toast
7. Value should update to 42

### Test Increment:
1. Note current value
2. Click "+1 Increment" button
3. Confirm transaction
4. Value should increase by 1

### Test NFT Minting:
1. Click "NFT Minter" tab
2. See total supply (should be 0)
3. Click "Mint for 0.001 ETH" button
4. Confirm transaction (0.001 ETH + gas)
5. Wait for success toast
6. Total supply increases to 1
7. Your balance shows 1 NFT

### Test Tip Jar:
1. Click "Tip Jar" tab
2. Click "Custom Address" button
3. Enter a test address (or your own)
4. Select a quick amount (e.g., 0.001 ETH)
5. Click "Send" button
6. Confirm transaction
7. Check recipient balance updates

## Step 10: Deploy to Production (Vercel)

### Create GitHub Repository:

```bash
git init
git add .
git commit -m "Initial commit: Base Builder Vault"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/base-builder-vault.git
git push -u origin main
```

### Deploy on Vercel:

1. Go to [vercel.com](https://vercel.com/new)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your `base-builder-vault` repository
5. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. **Add Environment Variables:**
   Click "Environment Variables" section:
   ```
   Name: NEXT_PUBLIC_PROJECT_ID
   Value: 1eebe528ca0ce94a99ceaa2e915058d7

   Name: NEXT_PUBLIC_BASE_STORAGE_ADDRESS
   Value: 0xYourStorageAddress

   Name: NEXT_PUBLIC_NFT_MINTER_ADDRESS
   Value: 0xYourNFTAddress
   ```

7. Click "Deploy"
8. Wait 2-3 minutes for build
9. Get your live URL (e.g., `https://base-builder-vault.vercel.app`)

### Test Production:
1. Visit your Vercel URL
2. Connect wallet
3. Test all features (Storage, NFT, Tip Jar)
4. Verify transactions on Basescan

## Step 11: Deploy to Base Mainnet (Optional)

**⚠️ WARNING: Mainnet uses real ETH. Only deploy when ready!**

### Get Base Mainnet ETH:
1. Visit [bridge.base.org](https://bridge.base.org)
2. Bridge ETH from Ethereum mainnet to Base
3. Wait for bridge confirmation (~10 min)

### Add Base Mainnet to MetaMask:
- **Network Name:** Base
- **RPC URL:** `https://mainnet.base.org`
- **Chain ID:** `8453`
- **Currency:** ETH
- **Explorer:** `https://basescan.org`

### Deploy Contracts:
- Follow same Remix process as Step 5
- Switch MetaMask to Base mainnet
- Deploy both contracts
- Verify on [basescan.org](https://basescan.org)

### Update Production:
- Update Vercel env vars with mainnet addresses
- Redeploy on Vercel

## Troubleshooting

### "Transaction failed" error:
- **Cause:** Insufficient ETH for gas
- **Fix:** Get more test ETH from faucet

### "Contract not deployed" warning:
- **Cause:** Wrong contract address in `.env.local`
- **Fix:** Double-check addresses from Remix deployment
- **Fix:** Restart dev server after updating `.env.local`

### Wallet won't connect:
- **Cause:** Wrong Project ID
- **Fix:** Verify `NEXT_PUBLIC_PROJECT_ID` matches Reown dashboard
- **Cause:** Browser cache
- **Fix:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### "Wrong network" modal appears:
- **Cause:** Connected to wrong chain
- **Fix:** Click "Switch to Base" button in modal
- **Fix:** Manually switch in MetaMask to Base Sepolia

### NFT mint fails:
- **Cause:** Insufficient ETH (need 0.001 + gas)
- **Fix:** Ensure balance > 0.002 ETH
- **Cause:** Max supply reached
- **Fix:** Check total supply on NFT tab

### Vercel build fails:
- **Cause:** Missing environment variables
- **Fix:** Add all three NEXT_PUBLIC_* variables in Vercel dashboard
- **Cause:** Node version mismatch
- **Fix:** Set Node version to 18+ in Vercel settings

## Next Steps

✅ You're ready to use Base Builder Vault!

### For WalletConnect Submission:
1. Create demo video/GIF showing wallet connect → transaction flow
2. Write submission description highlighting:
   - AppKit integration
   - Base chain features
   - User experience focus
3. Submit GitHub repo + Vercel URL + demo

### For Further Development:
- Add transaction history component
- Implement event listeners for real-time updates
- Add more contract interactions
- Integrate IPFS for NFT metadata
- Add analytics (PostHog, Mixpanel)

## Resources

- **Base Docs:** [docs.base.org](https://docs.base.org)
- **AppKit Docs:** [docs.reown.com/appkit](https://docs.reown.com/appkit)
- **Wagmi Docs:** [wagmi.sh](https://wagmi.sh)
- **Remix IDE:** [remix.ethereum.org](https://remix.ethereum.org)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)

---

**Need help?** Open an issue on GitHub!
