'use client';

import 'gantt-task-react/dist/index.css';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import DeleteProjectDialog from '@/components/global/delete-project-dialog';
import DeleteTaskDialog from '@/components/global/delete-task-dialog';
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
  const pathname = usePathname();
  const isConnected = useAtomValue(isConnectedAtom);

  useEffect(() => {
    if (pathname.startsWith('/workspace') && !isConnected) {
      router.push('/');
    }
  }, [isConnected, pathname, router]);

  return (
    <>
      <div className="h-full overflow-hidden">{children}</div>
      <ProjectDialog />
      <TaskDialog />
      <DeleteProjectDialog />
      <DeleteTaskDialog />
    </>
  );
}
