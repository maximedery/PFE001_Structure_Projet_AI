import { useQuery } from '@tanstack/react-query';

import { useQueryParam } from '@/helpers/use-query-param';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';

import { getQueryKey } from './_query-keys';

async function getWorkspace(
  client: TypedSupabaseClient,
  workspaceId: string | null,
) {
  if (!workspaceId) throw new Error('Workspace ID is required');

  const { data, error } = await client
    .from('Workspace')
    .select('*')
    .eq('id', workspaceId)
    .single()
    .throwOnError();

  if (error) throw new Error('Error fetching workspaces');
  if (!data) throw new Error('No data found');

  return data;
}

export const useGetWorkspace = () => {
  const client = useSupabaseBrowser();
  const workspaceId = useQueryParam('workspaceId');

  return useQuery({
    queryKey: getQueryKey('workspaces', { workspaceId }),
    queryFn: () => getWorkspace(client, workspaceId),
  });
};
