// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "./BaseStorage.sol";
import "./BaseNFT.sol";

contract DeployScript is Script {
    function run() external {
        // Get private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy BaseStorage
        BaseStorage baseStorage = new BaseStorage();
        console.log("BaseStorage deployed at:", address(baseStorage));

        // Deploy BaseNFT
        BaseNFT baseNFT = new BaseNFT();
        console.log("BaseNFT deployed at:", address(baseNFT));

        vm.stopBroadcast();
    }
}
