'use client';

import { useContext, createContext, useState, SetStateAction, Dispatch } from 'react';

type FeedContextProviderProps = {
  children: React.ReactNode;
}

export type Feed = {
  id: number,
  title?: string,
  description?: string,
  url: string,
  items: unknown[],
}

type FeedContextState = {
  selectedFeed: Feed | null;
  setSelectedFeed: Dispatch<SetStateAction<Feed | null>>;
}

const FeedContext = createContext<FeedContextState | null>(null);

export const FeedContextProvider = ({ children }: FeedContextProviderProps) => {
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);

  const state: FeedContextState = {
    selectedFeed,
    setSelectedFeed,
  }

  return (
    <FeedContext.Provider value={state}>
      {children}
    </FeedContext.Provider>
  );
}

export const useFeedContext = () => {
  const context = useContext(FeedContext);

  if (!context) {
    throw Error('Need to be used inside FeedContext provider');
  }

  return context;
}
