'use client';

import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { formatEther } from 'viem';

export function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  if (!isConnected) {
    return (
      <button onClick={() => open()} className="btn-primary">
        Connect Wallet
      </button>
    );
  }

  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{chain?.name}</span>
          <span className="font-mono text-sm font-semibold">{shortAddress}</span>
        </div>
        {balance && (
          <div className="text-right">
            <span className="text-sm font-semibold text-base-blue">
              {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => open()}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
        >
          Change
        </button>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
