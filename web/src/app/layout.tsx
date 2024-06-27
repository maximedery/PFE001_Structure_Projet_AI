import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainNav } from '@/components/global/main-nav';

import './globals.css';
import 'gantt-task-react/dist/index.css';
import { ReactQueryClientProvider } from '@/lib/react-query/ReactQueryClientProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetWorkspaceList } from '@/services/get-workspace-list';
import { AppHeader } from '@/components/global/app-header';

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
          <div className="flex flex-col h-screen">
            <AppHeader />
            <MainNav className="px-2 border-b" />
            <main className="overflow-hidden h-full">{children}</main>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
