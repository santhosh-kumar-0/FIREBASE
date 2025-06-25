'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LockType = 'password' | 'face' | 'pattern';

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  unlockBackground: string;
  setUnlockBackground: (background: string) => void;
  lockType: LockType;
  setLockType: (lockType: LockType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [unlockBackground, setUnlockBackground] = useState('bg-background');
  const [lockType, setLockType] = useState<LockType>('password');

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        unlockBackground,
        setUnlockBackground,
        lockType,
        setLockType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
