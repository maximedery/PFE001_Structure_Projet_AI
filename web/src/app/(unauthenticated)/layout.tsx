'use client';

import { useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { isConnectedAtom } from '@/stores/general';

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isConnected = useAtomValue(isConnectedAtom);

  useEffect(() => {
    if (pathname === '/' && isConnected) {
      router.push('/workspaces');
    }
  }, [isConnected, pathname, router]);

  return children;
}
