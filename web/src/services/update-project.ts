import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';
import { getQueryKey } from './_query-keys';

type UpdateOptions = Database['public']['Tables']['Project']['Update'];

type UpdateProjectInput = {
  id: string;
} & UpdateOptions;

async function updateProject(
  client: TypedSupabaseClient,
  inputValues: UpdateProjectInput
) {
  const { data, error } = await client
    .from('Project')
    .update({
      name: inputValues.name,
      color: inputValues.color,
    })
    .eq('id', inputValues.id)
    .select();

  if (error) throw new Error('Error updating project');

  return data;
}

export const useUpdateProject = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: UpdateProjectInput) =>
      updateProject(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('projects', 'list'),
      });
      queryClient.invalidateQueries({
        queryKey: getQueryKey('project-task-setting-list'),
      });
    },
  });
};
