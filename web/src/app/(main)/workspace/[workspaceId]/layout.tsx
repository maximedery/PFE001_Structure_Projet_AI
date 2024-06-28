import React from 'react';

import { MainNav } from '@/components/global/main-nav';

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <MainNav className="border-b px-2" />
      <div className="h-full overflow-hidden">{children}</div>
    </div>
  );
}
