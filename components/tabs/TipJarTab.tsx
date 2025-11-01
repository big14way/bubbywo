'use client';

import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useBalance } from 'wagmi';
import { parseEther } from 'viem';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/components/Toast';

// Default tip jar address (can be changed by users)
const DEFAULT_TIP_ADDRESS = '0x0000000000000000000000000000000000000000';

export function TipJarTab() {
  const { address, isConnected } = useAccount();
  const { showToast } = useToast();
  const [tipAmount, setTipAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState(DEFAULT_TIP_ADDRESS);
  const [customAddress, setCustomAddress] = useState('');

  // Get balance of tip jar
  const { data: tipJarBalance } = useBalance({
    address: recipientAddress as `0x${string}`,
    query: {
      enabled: recipientAddress !== DEFAULT_TIP_ADDRESS && recipientAddress.startsWith('0x'),
    },
  });

  // Send transaction
  const { data: hash, sendTransaction, isPending: isSendPending, error: sendError } = useSendTransaction();

  // Wait for transaction
  const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isTxSuccess) {
      showToast('Tip sent successfully! 🎉', 'success');
      setTipAmount('');
    }
  }, [isTxSuccess, showToast]);

  useEffect(() => {
    if (sendError) {
      showToast(`Error: ${sendError.message.slice(0, 100)}`, 'error');
    }
  }, [sendError, showToast]);

  const handleSendTip = async () => {
    if (!tipAmount || isNaN(Number(tipAmount)) || Number(tipAmount) <= 0) {
      showToast('Please enter a valid tip amount', 'warning');
      return;
    }

    if (!recipientAddress || !recipientAddress.startsWith('0x') || recipientAddress.length !== 42) {
      showToast('Please enter a valid recipient address', 'warning');
      return;
    }

    try {
      sendTransaction({
        to: recipientAddress as `0x${string}`,
        value: parseEther(tipAmount),
      });
    } catch (error) {
      console.error('Error sending tip:', error);
    }
  };

  const quickAmounts = ['0.001', '0.01', '0.1'];

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Connect your wallet to send tips</p>
      </div>
    );
  }

  const isLoading = isSendPending || isTxLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">💝 Tip Jar</h3>
            <p className="text-purple-100">Support builders on Base</p>
          </div>
          <div className="text-6xl">🪙</div>
        </div>
      </div>

      {/* Recipient Selection */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Address</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => setRecipientAddress(DEFAULT_TIP_ADDRESS)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                recipientAddress === DEFAULT_TIP_ADDRESS
                  ? 'border-base-blue bg-base-blue-light text-base-blue font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Default Tip Jar
            </button>
            <button
              onClick={() => setRecipientAddress(customAddress || DEFAULT_TIP_ADDRESS)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                recipientAddress !== DEFAULT_TIP_ADDRESS
                  ? 'border-base-blue bg-base-blue-light text-base-blue font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Custom Address
            </button>
          </div>
          {recipientAddress !== DEFAULT_TIP_ADDRESS && (
            <input
              type="text"
              value={customAddress}
              onChange={(e) => {
                setCustomAddress(e.target.value);
                setRecipientAddress(e.target.value);
              }}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-base-blue focus:border-transparent"
            />
          )}
          {recipientAddress !== DEFAULT_TIP_ADDRESS && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Current Address:</p>
              <p className="text-sm font-mono break-all">{recipientAddress}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tip Amount */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tip Amount (ETH)</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setTipAmount(amount)}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                  tipAmount === amount
                    ? 'border-base-blue bg-base-blue-light text-base-blue font-semibold'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {amount} ETH
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="tip-input" className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom amount
            </label>
            <input
              id="tip-input"
              type="number"
              step="0.001"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              placeholder="0.00"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-base-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleSendTip}
            disabled={isLoading || !tipAmount || recipientAddress === DEFAULT_TIP_ADDRESS}
            className="btn-primary w-full"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                {isSendPending ? 'Confirm in wallet...' : 'Sending...'}
              </>
            ) : (
              `Send ${tipAmount || '0'} ETH`
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      {tipJarBalance && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tip Jar Balance</h3>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-orange-600">
                {parseFloat(tipJarBalance.formatted).toFixed(6)} {tipJarBalance.symbol}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
      )}

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

      {/* Warning */}
      {recipientAddress === DEFAULT_TIP_ADDRESS && (
        <div className="card bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800">
            ⚠️ Please set a custom recipient address to send tips
          </p>
        </div>
      )}
    </div>
  );
}
