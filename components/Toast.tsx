'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: 'bg-green-50 border-green-500',
    error: 'bg-red-50 border-red-500',
    warning: 'bg-yellow-50 border-yellow-500',
    info: 'bg-blue-50 border-blue-500',
  };

  const textColors = {
    success: 'text-green-900',
    error: 'text-red-900',
    warning: 'text-yellow-900',
    info: 'text-blue-900',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 z-50 ${
        bgColors[type]
      } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
    >
      <div className="flex items-start gap-3">
        <span className={`text-xl font-bold ${textColors[type]}`}>{icons[type]}</span>
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColors[type]}`}>{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`text-lg font-bold ${textColors[type]} hover:opacity-70`}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: ToastType }>>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => (
    <>
      {toasts.map((toast, index) => (
        <div key={toast.id} style={{ bottom: `${index * 80 + 16}px` }} className="fixed right-4">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </>
  );

  return { showToast, ToastContainer };
}
