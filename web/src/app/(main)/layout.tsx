'use client';

import 'gantt-task-react/dist/index.css';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

import DeleteProjectDialog from '@/components/global/delete-project-dialog';
import DeleteTaskDialog from '@/components/global/delete-task-dialog';
import { MainNav } from '@/components/global/main-nav';
import ProjectDialog from '@/components/global/project-dialog';
import TaskDialog from '@/components/global/task-dialog';
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
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  return (
    <>
      <div className="flex h-screen flex-col">
        <MainNav className="border-b px-2" />
        <main className="h-full overflow-hidden">{children}</main>
      </div>
      <ProjectDialog />
      <TaskDialog />
      <DeleteProjectDialog />
      <DeleteTaskDialog />
    </>
  );
}
