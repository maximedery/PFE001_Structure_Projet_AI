'use client';

import { useSetAtom } from 'jotai';
import { Ellipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getTailwindColorValue } from '@/helpers/get-tailwind-color-value';
import { useGetWorkspaceList } from '@/services/get-workspace-list';
import {
  deleteWorkspaceDialogStateAtom,
  workspaceDialogStateAtom,
} from '@/stores/dialogs';

export default function WorkspacesPage() {
  const setWorkspaceDialogState = useSetAtom(workspaceDialogStateAtom);
  const setDeleteWorkspaceDialogState = useSetAtom(
    deleteWorkspaceDialogStateAtom,
  );

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
        <Button
          size={'sm'}
          onClick={() => {
            setWorkspaceDialogState({ isOpen: true });
          }}
        >
          New workspace
        </Button>
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
              className="group flex h-[175px] cursor-pointer flex-col rounded-lg border px-4 py-2 hover:bg-slate-50"
              onClick={() => handleWorkspaceClick(workspace.id)}
            >
              <div className="flex items-center">
                <div className="font-medium">
                  {workspace.name || 'Untitled'}
                </div>
                <span className="flex-1" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size={'icon'}>
                      <Ellipsis
                        size={18}
                        color={getTailwindColorValue('slate-950')}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        setWorkspaceDialogState({
                          isOpen: true,
                          id: workspace.id,
                          defaultValues: {
                            ...workspace,
                          },
                        });
                      }}
                    >
                      Edit Workspace
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteWorkspaceDialogState({
                          isOpen: true,
                          id: workspace.id,
                          name: workspace.name,
                        });
                      }}
                      className="text-red-500"
                    >
                      Delete Workspace
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-1 text-xs">
                {workspace.taskCount === 0
                  ? 'No tasks created.'
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
