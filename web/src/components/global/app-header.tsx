'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetWorkspaceList } from '@/services/get-workspace-list';
import { currentWorkspaceIdAtom } from '@/stores/general';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function AppHeader() {
  const { data: workspaces } = useGetWorkspaceList();
  const [currentWorkspaceId, setCurrentWorkspaceId] = useAtom(
    currentWorkspaceIdAtom,
  );

  return (
    <div className="flex items-center border-b px-2 py-1.5">
      <Image
        src="/logo.svg"
        alt="Tanzim"
        width={32}
        height={32}
        className="h-8 w-auto"
      />
      <div className="mt-px text-center text-xl font-semibold leading-none text-primary">
        Tanzim
      </div>
      <Select
        value={currentWorkspaceId || undefined}
        onValueChange={(newValue) => {
          setCurrentWorkspaceId(newValue);
        }}
      >
        <SelectTrigger className="ml-4 w-[180px]">
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
      <Avatar className="size-8 cursor-pointer">
        <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
