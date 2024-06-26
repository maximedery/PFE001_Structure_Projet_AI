import './globals.css';
import 'gantt-task-react/dist/index.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import { AppHeader } from '@/components/global/app-header';
import { ReactQueryClientProvider } from '@/lib/react-query/react-query-client-provider';
import { SupabaseAuthProvider } from '@/lib/supabase/supabase-auth-provider';

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
    <SupabaseAuthProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <body className={inter.className} suppressHydrationWarning={true}>
            <div className="flex h-screen flex-col">
              <AppHeader />
              <main className="h-full overflow-hidden">{children}</main>
            </div>
          </body>
        </html>
      </ReactQueryClientProvider>
    </SupabaseAuthProvider>
  );
}
