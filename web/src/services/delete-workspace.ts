import { useMutation, useQueryClient } from '@tanstack/react-query';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

type DeleteWorkspaceInput = {
  id: Database['public']['Tables']['Workspace']['Row']['id'];
};

async function deleteWorkspace(
  client: TypedSupabaseClient,
  inputValues: DeleteWorkspaceInput,
) {
  const { data, error } = await client
    .from('Workspace')
    .delete()
    .eq('id', inputValues.id)
    .select();

  if (error) throw new Error('Error deleting workspace');

  return data;
}

export const useDeleteWorkspace = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: DeleteWorkspaceInput) =>
      deleteWorkspace(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('workspaces', 'list'),
      });
    },
  });
};
