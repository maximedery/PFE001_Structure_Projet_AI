'use client';

import { useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { isAuthenticatedAtom } from '@/stores/general';

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  useEffect(() => {
    if (
      (pathname === '/' || pathname === '/login') &&
      !isAuthenticated.isLoading &&
      isAuthenticated.value
    ) {
      router.push('/workspaces');
    }
  }, [isAuthenticated.isLoading, isAuthenticated.value, pathname, router]);

  return children;
}
