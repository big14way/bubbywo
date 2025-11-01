'use client';

import { useState } from 'react';
import { ConnectButton } from '@/components/ConnectButton';
import { NetworkGuard } from '@/components/NetworkGuard';
import { StorageTab } from '@/components/tabs/StorageTab';
import { NFTTab } from '@/components/tabs/NFTTab';
import { TipJarTab } from '@/components/tabs/TipJarTab';
import { useToast } from '@/components/Toast';

type Tab = 'storage' | 'nft' | 'tipjar';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('storage');
  const { ToastContainer } = useToast();

  const tabs = [
    { id: 'storage' as Tab, label: 'Storage', icon: '💾' },
    { id: 'nft' as Tab, label: 'NFT Minter', icon: '🖼️' },
    { id: 'tipjar' as Tab, label: 'Tip Jar', icon: '💝' },
  ];

  return (
    <NetworkGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 backdrop-blur-sm bg-white/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-base-blue rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">B</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Base Builder Vault</h1>
                  <p className="text-sm text-gray-500">Built on Base with WalletConnect</p>
                </div>
              </div>
              <ConnectButton />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs Navigation */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
              <div className="grid grid-cols-3 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-base-blue text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300">
            {activeTab === 'storage' && <StorageTab />}
            {activeTab === 'nft' && <NFTTab />}
            {activeTab === 'tipjar' && <TipJarTab />}
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
              <p className="text-sm text-gray-600 mb-2">
                Built for the WalletConnect + Base Builder Program
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <a
                  href="https://docs.base.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-base-blue transition-colors"
                >
                  Base Docs
                </a>
                <span>•</span>
                <a
                  href="https://reown.com/appkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-base-blue transition-colors"
                >
                  AppKit Docs
                </a>
                <span>•</span>
                <a
                  href="https://basescan.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-base-blue transition-colors"
                >
                  Basescan
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </NetworkGuard>
  );
}
