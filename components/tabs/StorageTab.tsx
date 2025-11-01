'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { BaseStorageABI } from '@/contracts/abis/BaseStorageABI';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/components/Toast';
import { parseEther, formatEther } from 'viem';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BASE_STORAGE_ADDRESS as `0x${string}`;

export function StorageTab() {
  const { address, isConnected } = useAccount();
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState('');
  const [isPolling, setIsPolling] = useState(true);

  // Read current stored value
  const { data: storedValue, isLoading: isReadLoading, refetch: refetchValue } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BaseStorageABI,
    functionName: 'retrieve',
    query: {
      enabled: isConnected && !!CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
      refetchInterval: isPolling ? 3000 : false,
    },
  });

  // Read user-specific value
  const { data: userValue } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BaseStorageABI,
    functionName: 'getUserValue',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && !!CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
      refetchInterval: isPolling ? 3000 : false,
    },
  });

  // Read user storage count
  const { data: userCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BaseStorageABI,
    functionName: 'getUserStorageCount',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && !!CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
      refetchInterval: isPolling ? 3000 : false,
    },
  });

  // Write contract hook
  const { data: hash, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();

  // Wait for transaction
  const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isTxSuccess) {
      showToast('Value stored successfully!', 'success');
      setInputValue('');
      refetchValue();
    }
  }, [isTxSuccess, showToast, refetchValue]);

  useEffect(() => {
    if (writeError) {
      showToast(`Error: ${writeError.message.slice(0, 100)}`, 'error');
    }
  }, [writeError, showToast]);

  const handleStore = async () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      showToast('Please enter a valid number', 'warning');
      return;
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: BaseStorageABI,
        functionName: 'store',
        args: [BigInt(inputValue)],
      });
    } catch (error) {
      console.error('Error storing value:', error);
    }
  };

  const handleIncrement = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: BaseStorageABI,
        functionName: 'increment',
      });
    } catch (error) {
      console.error('Error incrementing:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Connect your wallet to use the storage feature</p>
      </div>
    );
  }

  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-yellow-800 font-medium mb-2">Contract Not Deployed</p>
          <p className="text-yellow-700 text-sm">
            Please deploy the BaseStorage contract and update NEXT_PUBLIC_BASE_STORAGE_ADDRESS in .env.local
          </p>
        </div>
      </div>
    );
  }

  const isLoading = isWritePending || isTxLoading;

  return (
    <div className="space-y-6">
      {/* Current Global Value */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Stored Value</h3>
          <button
            onClick={() => setIsPolling(!isPolling)}
            className={`text-xs px-3 py-1 rounded-full ${
              isPolling ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isPolling ? '🟢 Live' : '⚫ Paused'}
          </button>
        </div>
        {isReadLoading ? (
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-5xl font-bold text-base-blue">{storedValue?.toString() ?? '0'}</p>
            <p className="text-sm text-gray-500 mt-2">Global stored value</p>
          </div>
        )}
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <p className="text-sm text-gray-500 mb-1">Your Last Value</p>
          <p className="text-2xl font-bold text-gray-900">{userValue?.toString() ?? '0'}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500 mb-1">Your Total Updates</p>
          <p className="text-2xl font-bold text-gray-900">{userCount?.toString() ?? '0'}</p>
        </div>
      </div>

      {/* Store Value Form */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Store New Value</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="value-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter a number to store
            </label>
            <input
              id="value-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., 42"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-base-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleStore}
              disabled={isLoading || !inputValue}
              className="btn-primary flex-1"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  {isWritePending ? 'Confirm in wallet...' : 'Storing...'}
                </>
              ) : (
                'Store Value'
              )}
            </button>
            <button
              onClick={handleIncrement}
              disabled={isLoading}
              className="btn-secondary"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : '+1 Increment'}
            </button>
          </div>
        </div>
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
