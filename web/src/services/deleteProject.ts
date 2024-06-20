import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

type DeleteProjectInput = {
  id: Database['public']['Tables']['Project']['Row']['id'];
};

async function deleteProject(
  client: TypedSupabaseClient,
  inputValues: DeleteProjectInput
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

  return useMutation({
    mutationFn: (inputValues: DeleteProjectInput) =>
      deleteProject(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', 'setting-list'] });
    },
  });
};
