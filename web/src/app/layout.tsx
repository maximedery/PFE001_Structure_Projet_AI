import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainNav } from '@/components/app/main-nav';

import './globals.css';
import 'gantt-task-react/dist/index.css';

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
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="flex flex-col h-screen">
          <div className="border-b">
            <div className="flex items-center px-2">
              <MainNav />
            </div>
          </div>
          <main className="overflow-hidden h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
