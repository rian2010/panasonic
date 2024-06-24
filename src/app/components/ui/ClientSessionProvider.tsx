// app/components/ClientSessionProvider.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface ClientSessionProviderProps {
  children: ReactNode;
}

const ClientSessionProvider = ({ children }: ClientSessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionProvider;

