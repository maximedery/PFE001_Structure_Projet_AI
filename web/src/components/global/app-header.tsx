'use client';

import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useGetWorkspaceList } from '@/services/get-workspace-list';
import { isConnectedAtom } from '@/stores/general';

import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Logo } from './logo';
import { UserNavigation } from './user-navigation';

export function AppHeader() {
  const router = useRouter();
  const { data: workspaces } = useGetWorkspaceList();
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);

  const workspaceId = undefined;

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleLogoOnClick = () => {
    if (isConnected) {
      router.push('/workspaces');
    } else {
      router.push('/');
    }
  };

  return (
    <div
      className={cn(
        'flex items-center border-b px-2 py-2',
        isConnected ? 'px-2' : 'px-16',
      )}
    >
      <Logo size={isConnected ? 'default' : 'lg'} onClick={handleLogoOnClick} />
      {isConnected && !!workspaceId && (
        <Select
          value={workspaceId || undefined}
          onValueChange={(newValue) => {
            // setCurrentWorkspaceId(newValue);
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
      )}
      <span className="flex-1" />
      {isConnected && <UserNavigation />}
      {!isConnected && (
        <div className="flex gap-2">
          <Button variant="ghost" size={'sm'} onClick={handleConnect}>
            Sign in
          </Button>
          <Button
            variant="default"
            size={'sm'}
            className="rounded-none"
            onClick={handleConnect}
          >
            Plan my projects
          </Button>
        </div>
      )}
    </div>
  );
}
