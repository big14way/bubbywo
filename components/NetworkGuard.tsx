'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { useEffect, useState } from 'react';

interface NetworkGuardProps {
  children: React.ReactNode;
}

export function NetworkGuard({ children }: NetworkGuardProps) {
  const { chain, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const [showModal, setShowModal] = useState(false);

  const isCorrectNetwork = chain?.id === base.id || chain?.id === baseSepolia.id;

  useEffect(() => {
    if (isConnected && !isCorrectNetwork) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isConnected, isCorrectNetwork]);

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: base.id });
      setShowModal(false);
    } catch (error) {
      console.error('Failed to switch network:', error);
      // Try testnet as fallback
      try {
        await switchChain({ chainId: baseSepolia.id });
        setShowModal(false);
      } catch (fallbackError) {
        console.error('Failed to switch to testnet:', fallbackError);
      }
    }
  };

  if (!isConnected || isCorrectNetwork) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wrong Network
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Please switch to Base network to use this dApp. You're currently on{' '}
                <span className="font-semibold">{chain?.name}</span>.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSwitchNetwork}
                  className="btn-primary w-full"
                >
                  Switch to Base
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-secondary w-full"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
