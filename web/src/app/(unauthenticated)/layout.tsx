'use client';

import 'gantt-task-react/dist/index.css';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

import { isConnectedAtom } from '@/stores/general';

dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isConnected = useAtomValue(isConnectedAtom);

  useLayoutEffect(() => {
    if (isConnected) {
      router.push('/settings');
    }
  }, [isConnected, router]);

  return children;
}
