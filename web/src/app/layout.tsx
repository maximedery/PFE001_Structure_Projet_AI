import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainNav } from '@/components/global/main-nav';

import './globals.css';
import 'gantt-task-react/dist/index.css';
import { ReactQueryClientProvider } from '@/lib/react-query/ReactQueryClientProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetWorkspaceList } from '@/services/get-workspace-list';

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
            <div className="border-b">
              <div className="flex flex-col">
                <div className="border-b flex items-center px-2 py-1.5">
                  <img src="/logo.svg" alt="Tanzim" className="h-8 w-auto" />
                  <div className="font-semibold text-primary text-xl leading-none text-center mt-px">
                    Tanzim
                  </div>
                  <span className="flex-1" />
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <MainNav className="px-2" />
              </div>
            </div>
            <main className="overflow-hidden h-full">{children}</main>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
