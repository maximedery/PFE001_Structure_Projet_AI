'use client';

import { useAtomValue } from 'jotai';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useGetWorkspaceList } from '@/services/get-workspace-list';
import { isAuthenticatedAtom } from '@/stores/general';

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
  const params = useParams();
  const { data: workspaces } = useGetWorkspaceList();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  const workspaceId =
    typeof params.workspaceId === 'string' ? params.workspaceId : null;

  const handleConnect = () => {
    router.push('/login');
  };

  const handleLogoOnClick = () => {
    if (isAuthenticated.value) {
      router.push('/workspaces');
    } else {
      router.push('/');
    }
  };

  return (
    <div
      className={cn(
        'flex items-center border-b px-2 py-2',
        isAuthenticated.value ? 'px-2' : 'px-16',
      )}
    >
      <Logo
        size={isAuthenticated.value ? 'default' : 'lg'}
        onClick={handleLogoOnClick}
      />
      {isAuthenticated.value && !!workspaceId && (
        <Select
          value={workspaceId || undefined}
          onValueChange={(newValue) => {
            router.push(`/workspace/${newValue}/settings`);
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
      {isAuthenticated.value && <UserNavigation />}
      {!isAuthenticated.value && (
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
