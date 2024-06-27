import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';
import { getQueryKey } from './_query-keys';

async function getWorkspaceList(client: TypedSupabaseClient) {
  const { data, error } = await client
    .from('Workspace')
    .select()
    .throwOnError();

  if (error) throw new Error('Error fetching workspaces');
  if (!data) throw new Error('No data found');

  return data;
}

export const useGetWorkspaceList = () => {
  const client = useSupabaseBrowser();

  return useQuery({
    queryKey: getQueryKey('workspaces', 'list'),
    queryFn: () => getWorkspaceList(client),
  });
};
