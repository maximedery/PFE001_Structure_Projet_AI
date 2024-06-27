import './globals.css';
import 'gantt-task-react/dist/index.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import { AppHeader } from '@/components/global/app-header';
import { MainNav } from '@/components/global/main-nav';
import { ReactQueryClientProvider } from '@/lib/react-query/react-query-client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tanzim - AI Planner',
  description: 'Optimization of schedule for the construction sector.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <div className="flex h-screen flex-col">
            <AppHeader />
            <MainNav className="border-b px-2" />
            <main className="h-full overflow-hidden">{children}</main>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
