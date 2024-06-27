'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetWorkspaceList } from '@/services/get-workspace-list';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useAtom } from 'jotai';
import { currentWorkspaceIdAtom } from '@/stores/general';

export function AppHeader() {
  const { data: workspaces, error, isLoading } = useGetWorkspaceList();
  const [currentWorkspaceId, setCurrentWorkspaceId] = useAtom(
    currentWorkspaceIdAtom
  );

  return (
    <div className="border-b flex items-center px-2 py-1.5">
      <img src="/logo.svg" alt="Tanzim" className="h-8 w-auto" />
      <div className="font-semibold text-primary text-xl leading-none text-center mt-px">
        Tanzim
      </div>
      <Select
        value={currentWorkspaceId || undefined}
        onValueChange={(newValue) => {
          setCurrentWorkspaceId(newValue);
        }}
      >
        <SelectTrigger className="w-[180px] ml-4">
          <SelectValue placeholder="Select a workspace" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              {workspace.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="flex-1" />
      <Avatar className="h-8 w-8 cursor-pointer">
        <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
