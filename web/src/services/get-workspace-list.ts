import { useQuery } from '@tanstack/react-query';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';

import { getQueryKey } from './_query-keys';

async function getWorkspaceList(client: TypedSupabaseClient) {
  const { data, error } = await client
    .from('Workspace')
    .select('*, Task(count)')
    .throwOnError();

  if (error) throw new Error('Error fetching workspaces');
  if (!data) throw new Error('No data found');

  const workspaces = data.map((workspace) => ({
    ...workspace,
    taskCount: workspace.Task.length,
  }));

  return workspaces;
}

export const useGetWorkspaceList = () => {
  const client = useSupabaseBrowser();

  return useQuery({
    queryKey: getQueryKey('workspaces', 'list'),
    queryFn: () => getWorkspaceList(client),
  });
};
