# Smart Contract Deployment Guide

## Option 1: Deploy with Remix (Easiest)

### Step 1: Prepare Contracts
1. Go to [Remix IDE](https://remix.ethereum.org)
2. Create new files: `BaseStorage.sol` and `BaseNFT.sol`
3. Copy the contract code from the `/contracts` folder

### Step 2: Compile
1. Go to "Solidity Compiler" tab (left sidebar)
2. Select compiler version `0.8.20` or higher
3. Click "Compile BaseStorage.sol"
4. Click "Compile BaseNFT.sol"

### Step 3: Deploy to Base Sepolia (Testnet)
1. Get Base Sepolia ETH from [Base Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
2. Go to "Deploy & Run Transactions" tab
3. Select "Injected Provider - MetaMask" (ensure MetaMask is on Base Sepolia)
4. Network details:
   - Network Name: Base Sepolia
   - RPC URL: https://sepolia.base.org
   - Chain ID: 84532
   - Currency: ETH
   - Block Explorer: https://sepolia.basescan.org

5. Deploy BaseStorage:
   - Select "BaseStorage" contract
   - Click "Deploy"
   - Confirm transaction in MetaMask
   - Copy deployed address

6. Deploy BaseNFT:
   - Select "BaseNFT" contract
   - Click "Deploy"
   - Confirm transaction
   - Copy deployed address

### Step 4: Verify Contracts on Basescan
1. Go to [Base Sepolia Basescan](https://sepolia.basescan.org)
2. Search for your contract address
3. Click "Contract" → "Verify and Publish"
4. Select:
   - Compiler Type: Solidity (Single file)
   - Compiler Version: v0.8.20
   - License: MIT
5. Copy-paste your contract code
6. Click "Verify and Publish"

### Step 5: Deploy to Base Mainnet (Production)
1. Get Base ETH (bridge from Ethereum mainnet at [bridge.base.org](https://bridge.base.org))
2. Switch MetaMask to Base Mainnet:
   - Network Name: Base
   - RPC URL: https://mainnet.base.org
   - Chain ID: 8453
   - Currency: ETH
   - Block Explorer: https://basescan.org

3. Repeat deploy steps for mainnet
4. Verify on [basescan.org](https://basescan.org)

## Option 2: Deploy with Foundry (Advanced)

### Prerequisites
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Setup
```bash
# Initialize Foundry project
forge init --no-commit

# Copy contracts to src/
cp contracts/BaseStorage.sol src/
cp contracts/BaseNFT.sol src/

# Create .env file
echo "PRIVATE_KEY=your_private_key_here" > .env
echo "BASE_SEPOLIA_RPC=https://sepolia.base.org" >> .env
echo "BASE_MAINNET_RPC=https://mainnet.base.org" >> .env
echo "BASESCAN_API_KEY=your_api_key" >> .env
```

### Deploy Script
Create `script/Deploy.s.sol`:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/BaseStorage.sol";
import "../src/BaseNFT.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        BaseStorage storage = new BaseStorage();
        BaseNFT nft = new BaseNFT();

        console.log("BaseStorage deployed at:", address(storage));
        console.log("BaseNFT deployed at:", address(nft));

        vm.stopBroadcast();
    }
}
```

### Deploy Commands
```bash
# Deploy to Base Sepolia
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC \
  --broadcast \
  --verify \
  -vvvv

# Deploy to Base Mainnet
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_MAINNET_RPC \
  --broadcast \
  --verify \
  -vvvv
```

## Post-Deployment

### Update Frontend Environment Variables
Add deployed addresses to `.env.local`:
```
NEXT_PUBLIC_BASE_STORAGE_ADDRESS=0xYourBaseStorageAddress
NEXT_PUBLIC_NFT_MINTER_ADDRESS=0xYourBaseNFTAddress
```

### Test Contracts
Use Basescan's "Read Contract" and "Write Contract" tabs to test:
1. BaseStorage:
   - Call `retrieve()` (should return 0)
   - Call `store(42)`
   - Call `retrieve()` (should return 42)

2. BaseNFT:
   - Call `totalSupply()` (should return 0)
   - Call `mint(your_address)` with 0.001 ETH
   - Call `totalSupply()` (should return 1)

## Troubleshooting

### Common Issues
1. **"Insufficient funds"**: Get testnet ETH from Base faucet
2. **"Wrong network"**: Double-check RPC URL and Chain ID
3. **Verification failed**: Ensure exact compiler version and optimization settings match
4. **Transaction stuck**: Increase gas price or reset MetaMask account

### Resources
- [Base Documentation](https://docs.base.org)
- [Base Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- [Base Bridge](https://bridge.base.org)
- [Basescan](https://basescan.org)
