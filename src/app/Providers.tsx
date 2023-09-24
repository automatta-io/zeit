'use client';

import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}