# 🚀 Deployment Checklist

Use this checklist to ensure smooth deployment to production.

## Pre-Deployment

### Local Development
- [ ] All features work locally (`npm run dev`)
- [ ] No console errors or warnings
- [ ] Environment variables set in `.env.local`
- [ ] Build succeeds (`npm run build`)
- [ ] Production build runs (`npm start`)

### Smart Contracts
- [ ] BaseStorage.sol deployed to Base Sepolia
- [ ] BaseNFT.sol deployed to Base Sepolia
- [ ] Both contracts verified on Basescan
- [ ] Contract addresses updated in `.env.local`
- [ ] Test contract interactions (read/write)

### Testing
- [ ] Connect wallet flow works
- [ ] Wrong network detection works
- [ ] Storage tab: store value, increment
- [ ] NFT tab: mint NFT
- [ ] Tip jar tab: send tip
- [ ] All transactions confirm successfully
- [ ] Toast notifications appear
- [ ] Mobile responsiveness checked
- [ ] Test on different browsers (Chrome, Firefox, Safari)

## GitHub

### Repository Setup
- [ ] Create new GitHub repository (public)
- [ ] Add README.md with screenshots
- [ ] Add SETUP.md guide
- [ ] Add LICENSE file (MIT recommended)
- [ ] Add .gitignore (exclude .env.local, node_modules)
- [ ] Commit all code
- [ ] Push to GitHub

### Commands
```bash
git init
git add .
git commit -m "Initial commit: Base Builder Vault"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/base-builder-vault.git
git push -u origin main
```

## Vercel Deployment

### Setup
- [ ] Sign up / log in to [Vercel](https://vercel.com)
- [ ] Click "New Project"
- [ ] Import GitHub repository
- [ ] Configure project:
  - Framework: Next.js
  - Root Directory: ./
  - Build Command: `npm run build`
  - Output Directory: `.next`

### Environment Variables
Add these in Vercel dashboard:
- [ ] `NEXT_PUBLIC_PROJECT_ID` = `1eebe528ca0ce94a99ceaa2e915058d7`
- [ ] `NEXT_PUBLIC_BASE_STORAGE_ADDRESS` = `0xYourStorageAddress`
- [ ] `NEXT_PUBLIC_NFT_MINTER_ADDRESS` = `0xYourNFTAddress`

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (2-3 minutes)
- [ ] Check deployment logs for errors
- [ ] Visit deployed URL

## Post-Deployment Testing

### Production Checks
- [ ] Visit Vercel URL
- [ ] Connect wallet
- [ ] Check network auto-switch
- [ ] Test Storage tab
- [ ] Test NFT tab
- [ ] Test Tip Jar tab
- [ ] Verify transactions on Basescan
- [ ] Test on mobile device
- [ ] Test on different wallets (MetaMask, Coinbase Wallet)
- [ ] Check loading states
- [ ] Check error handling (disconnect wallet, wrong network)

### Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify no console errors
- [ ] Check page load time < 3s

## Mainnet (Optional)

### Prerequisites
- [ ] Have real ETH on Base mainnet
- [ ] Understand mainnet = real money
- [ ] Contracts thoroughly tested on testnet

### Deployment
- [ ] Switch MetaMask to Base mainnet
- [ ] Deploy BaseStorage.sol to Base mainnet
- [ ] Deploy BaseNFT.sol to Base mainnet
- [ ] Verify contracts on basescan.org (not sepolia)
- [ ] Update Vercel environment variables:
  - `NEXT_PUBLIC_BASE_STORAGE_ADDRESS` = mainnet address
  - `NEXT_PUBLIC_NFT_MINTER_ADDRESS` = mainnet address
- [ ] Redeploy on Vercel (Settings → Deployments → Redeploy)

### Mainnet Testing
- [ ] Test with small amounts first
- [ ] Verify contract addresses are correct
- [ ] Check gas fees are reasonable
- [ ] Test all features on mainnet

## Documentation

### README.md Must Include
- [ ] Project title and description
- [ ] Live demo link
- [ ] Tech stack
- [ ] Features list
- [ ] Setup instructions
- [ ] Contract addresses
- [ ] Screenshots/GIF
- [ ] License

### Additional Docs
- [ ] SETUP.md with step-by-step guide
- [ ] ARCHITECTURE.md (technical details)
- [ ] WALLETCONNECT_SUBMISSION.md (program submission)
- [ ] contracts/deployment-guide.md

## Demo Materials

### Video/GIF
- [ ] Record full user flow (connect → transaction)
- [ ] Show wallet selection modal
- [ ] Show transaction confirmation
- [ ] Show success states
- [ ] Include mobile demo
- [ ] Keep under 3 minutes
- [ ] Upload to Loom/YouTube
- [ ] Convert to GIF for README

### Screenshots
- [ ] Landing page
- [ ] Connect wallet modal
- [ ] Storage tab (connected state)
- [ ] NFT minting interface
- [ ] Tip jar tab
- [ ] Transaction confirmation
- [ ] Mobile view
- [ ] Basescan verification

## Submission

### WalletConnect + Base Builder Program
- [ ] Gather all materials:
  - GitHub repo URL
  - Live demo URL
  - Demo video link
  - Contract addresses
  - Basescan verification links
- [ ] Fill out submission form
- [ ] Include screenshots
- [ ] Write clear description
- [ ] Submit!

### Promotion
- [ ] Tweet about project (#BaseBuilders #WalletConnect)
- [ ] Share in Base Discord
- [ ] Post on LinkedIn
- [ ] Write dev.to/Medium article
- [ ] Share in r/ethdev

## Maintenance

### Monitor
- [ ] Set up error tracking (Sentry, optional)
- [ ] Monitor Vercel analytics
- [ ] Watch GitHub issues
- [ ] Check transaction success rates

### Iterate
- [ ] Fix reported bugs
- [ ] Add requested features
- [ ] Update dependencies
- [ ] Improve documentation
- [ ] Respond to community questions

## Troubleshooting

### Common Issues

**Build fails on Vercel:**
- Check Node.js version (should be 18+)
- Verify all dependencies in package.json
- Check environment variables are set
- Review build logs for specific errors

**Transactions fail in production:**
- Verify contract addresses are correct
- Check network configuration (Base vs Sepolia)
- Ensure contracts are verified on Basescan
- Test with different wallets

**Wallet won't connect:**
- Verify NEXT_PUBLIC_PROJECT_ID is correct
- Check Reown/WalletConnect dashboard
- Clear browser cache
- Try incognito mode

**Wrong network warning persists:**
- Check network configuration in wagmi.ts
- Verify RPC URLs are correct
- Test manual network switch in wallet

## Final Checklist

Before announcing your project:
- [ ] ✅ All features work in production
- [ ] ✅ Contracts verified on Basescan
- [ ] ✅ Documentation is complete
- [ ] ✅ Demo video is ready
- [ ] ✅ GitHub repo is public and polished
- [ ] ✅ Mobile experience is smooth
- [ ] ✅ No console errors
- [ ] ✅ Fast loading times
- [ ] ✅ Clear error messages
- [ ] ✅ Transaction links work

---

**🎉 Congratulations on your deployment!**

Your Base Builder Vault is now live and ready for users!
