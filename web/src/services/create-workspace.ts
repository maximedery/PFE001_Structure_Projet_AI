import { useMutation, useQueryClient } from '@tanstack/react-query';
import cuid from 'cuid';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

type InsertOptions = Database['public']['Tables']['Workspace']['Insert'];

type CreateWorkspaceInput = Pick<InsertOptions, 'name'>;

async function createWorkspace(
  client: TypedSupabaseClient,
  inputValues: CreateWorkspaceInput,
) {
  const { data, error } = await client
    .from('Workspace')
    .insert({
      id: cuid(),
      name: inputValues.name,
    })
    .select();

  if (error) throw new Error('Error creating workspace');

  return data;
}

export const useCreateWorkspace = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: CreateWorkspaceInput) =>
      createWorkspace(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('workspaces', 'list'),
      });
    },
  });
};
