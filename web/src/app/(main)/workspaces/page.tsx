'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useGetWorkspaceList } from '@/services/get-workspace-list';

export default function WorkspacesPage() {
  const router = useRouter();
  const { data: workspaces, isLoading } = useGetWorkspaceList();

  const handleWorkspaceClick = (workspaceId: string) => {
    router.push(`/workspace/${workspaceId}/settings`);
  };

  return (
    <div className="flex-col p-4">
      <div className="flex items-center">
        <div className="text-xl font-semibold">Your Workspaces</div>
        <span className="flex-1" />
        <Button size={'sm'}>New workspace</Button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-3 flex items-center justify-center">
            <LoadingSpinner className="text-gray-300" />
          </div>
        ) : workspaces && workspaces.length > 0 ? (
          workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="group h-[175px] cursor-pointer rounded-lg border p-4 hover:bg-slate-50"
              onClick={() => handleWorkspaceClick(workspace.id)}
            >
              <div className="flex items-center">
                <div className="font-medium">{workspace.name}</div>
                <span className="flex-1" />
                <div className="relative transition-all duration-300 group-hover:translate-x-1">
                  <ChevronRight
                    size={18}
                    className="text-slate-400 transition-all duration-300 group-hover:text-slate-500"
                  />
                </div>
              </div>
              <div className="mt-1 text-xs">
                {workspace.taskCount === 0
                  ? 'No tasks added. Get started by creating one!'
                  : workspace.taskCount === 1
                    ? '1 task created.'
                    : `${workspace.taskCount} tasks created.`}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 mt-6 text-center text-gray-500">
            No workspaces available. Please create a new workspace.
          </div>
        )}
      </div>
    </div>
  );
}
