import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useQueryParam } from '@/helpers/use-query-params';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

type DeleteProjectInput = {
  id: Database['public']['Tables']['Project']['Row']['id'];
};

async function deleteProject(
  client: TypedSupabaseClient,
  inputValues: DeleteProjectInput,
) {
  const { data, error } = await client
    .from('Project')
    .delete()
    .eq('id', inputValues.id)
    .select();

  if (error) throw new Error('Error deleting project');

  return data;
}

export const useDeleteProject = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();
  const workspaceId = useQueryParam('workspaceId');

  return useMutation({
    mutationFn: (inputValues: DeleteProjectInput) =>
      deleteProject(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey({ workspaceId }, 'projects', 'list'),
      });
      queryClient.invalidateQueries({
        queryKey: getQueryKey({ workspaceId }, 'project-task-setting-list'),
      });
    },
  });
};
