'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { BaseNFTABI } from '@/contracts/abis/BaseNFTABI';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/components/Toast';
import { parseEther } from 'viem';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_MINTER_ADDRESS as `0x${string}`;
const MINT_PRICE = '0.001'; // ETH

export function NFTTab() {
  const { address, isConnected } = useAccount();
  const { showToast } = useToast();

  // Read total supply
  const { data: totalSupply, refetch: refetchSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BaseNFTABI,
    functionName: 'totalSupply',
    query: {
      enabled: isConnected && !!CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
      refetchInterval: 5000,
    },
  });

  // Read max supply
  const { data: maxSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BaseNFTABI,
    functionName: 'MAX_SUPPLY',
    query: {
      enabled: isConnected && !!CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  });

  // Read user balance
  const { data: userBalance, refetch: refetchBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BaseNFTABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && !!CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
      refetchInterval: 5000,
    },
  });

  // Mint NFT
  const { data: hash, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();

  // Wait for transaction
  const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isTxSuccess) {
      showToast('NFT minted successfully! 🎉', 'success');
      refetchSupply();
      refetchBalance();
    }
  }, [isTxSuccess, showToast, refetchSupply, refetchBalance]);

  useEffect(() => {
    if (writeError) {
      showToast(`Error: ${writeError.message.slice(0, 100)}`, 'error');
    }
  }, [writeError, showToast]);

  const handleMint = async () => {
    if (!address) {
      showToast('Please connect your wallet', 'warning');
      return;
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: BaseNFTABI,
        functionName: 'mint',
        args: [address],
        value: parseEther(MINT_PRICE),
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Connect your wallet to mint NFTs</p>
      </div>
    );
  }

  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-yellow-800 font-medium mb-2">Contract Not Deployed</p>
          <p className="text-yellow-700 text-sm">
            Please deploy the BaseNFT contract and update NEXT_PUBLIC_NFT_MINTER_ADDRESS in .env.local
          </p>
        </div>
      </div>
    );
  }

  const isLoading = isWritePending || isTxLoading;
  const mintedPercentage = maxSupply ? (Number(totalSupply || 0) / Number(maxSupply)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Collection Stats */}
      <div className="card bg-gradient-to-br from-base-blue to-base-blue-dark text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Base Builder NFT</h3>
          <span className="text-4xl">🖼️</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Total Minted</p>
            <p className="text-3xl font-bold">{totalSupply?.toString() ?? '0'}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Max Supply</p>
            <p className="text-3xl font-bold">{maxSupply?.toString() ?? '0'}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500"
              style={{ width: `${mintedPercentage}%` }}
            />
          </div>
          <p className="text-blue-100 text-xs mt-2">{mintedPercentage.toFixed(2)}% minted</p>
        </div>
      </div>

      {/* Your NFTs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Collection</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">NFTs Owned</p>
            <p className="text-3xl font-bold text-base-blue">{userBalance?.toString() ?? '0'}</p>
          </div>
          <div className="text-5xl">
            {Number(userBalance || 0) > 0 ? '✨' : '📦'}
          </div>
        </div>
      </div>

      {/* Mint Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mint NFT</h3>
        <div className="bg-base-blue-light rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Mint Price</span>
            <span className="text-2xl font-bold text-base-blue">{MINT_PRICE} ETH</span>
          </div>
          <p className="text-sm text-gray-600">
            Each mint supports the Base Builder community
          </p>
        </div>
        <button
          onClick={handleMint}
          disabled={isLoading || Number(totalSupply || 0) >= Number(maxSupply || 0)}
          className="btn-primary w-full"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              {isWritePending ? 'Confirm in wallet...' : 'Minting...'}
            </>
          ) : Number(totalSupply || 0) >= Number(maxSupply || 0) ? (
            'Sold Out'
          ) : (
            `Mint for ${MINT_PRICE} ETH`
          )}
        </button>
        {Number(totalSupply || 0) >= Number(maxSupply || 0) && (
          <p className="text-center text-red-600 text-sm mt-2">
            Maximum supply reached. No more NFTs available.
          </p>
        )}
      </div>

      {/* Transaction Hash */}
      {hash && (
        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm font-medium text-blue-900 mb-2">Transaction Submitted</p>
          <a
            href={`https://basescan.org/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-base-blue hover:underline break-all"
          >
            {hash}
          </a>
        </div>
      )}
    </div>
  );
}
