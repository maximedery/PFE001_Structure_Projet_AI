import { useQuery } from '@tanstack/react-query';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';

import { getQueryKey } from './_query-keys';

async function getWorkspaceList(client: TypedSupabaseClient) {
  const { data, error } = await client
    .from('Workspace')
    .select('*, Task(count)')
    .order('name', { ascending: true })
    .throwOnError();

  if (error) throw new Error('Error fetching workspaces');
  if (!data) throw new Error('No data found');

  const workspaces = data.map((workspace) => ({
    ...workspace,
    taskCount: workspace.Task[0].count,
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
