'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import { type AppStore, createAppStore, initAppStore } from '@/stores/app-store';

export const AppStoreContext = createContext<StoreApi<AppStore> | null>(null);

export interface AppStoreProviderProps {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AppStore>>();
  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore());
  }

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useAppStore must be use within FundStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
