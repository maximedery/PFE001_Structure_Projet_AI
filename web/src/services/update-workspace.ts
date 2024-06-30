import { useMutation, useQueryClient } from '@tanstack/react-query';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

type UpdateOptions = Database['public']['Tables']['Workspace']['Update'];

type UpdateWorkspaceInput = {
  id: string;
} & UpdateOptions;

async function updateWorkspace(
  client: TypedSupabaseClient,
  inputValues: UpdateWorkspaceInput,
) {
  const { data, error } = await client
    .from('Workspace')
    .update({
      name: inputValues.name,
    })
    .eq('id', inputValues.id)
    .select();

  if (error) throw new Error('Error updating workspace');

  return data;
}

export const useUpdateWorkspace = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: UpdateWorkspaceInput) =>
      updateWorkspace(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('workspaces', 'list'),
      });
    },
  });
};
