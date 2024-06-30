import { useQuery } from '@tanstack/react-query';

import { useQueryParam } from '@/helpers/use-query-params';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';

import { getQueryKey } from './_query-keys';

async function getProjectList(
  client: TypedSupabaseClient,
  workspaceId: string | null,
) {
  if (!workspaceId) throw new Error('Workspace ID is required');

  const { data } = await client
    .from('Project')
    .select()
    .eq('workspaceId', workspaceId)
    .throwOnError();

  if (!data) throw new Error('No data found');

  return data;
}

export const useGetProjectList = () => {
  const client = useSupabaseBrowser();
  const workspaceId = useQueryParam('workspaceId');

  return useQuery({
    queryKey: getQueryKey({ workspaceId }, 'projects', 'list'),
    queryFn: () => getProjectList(client, workspaceId),
  });
};
