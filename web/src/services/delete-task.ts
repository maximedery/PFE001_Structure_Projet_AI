import { useMutation, useQueryClient } from '@tanstack/react-query';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

type DeleteTaskInput = {
  id: Database['public']['Tables']['Task']['Row']['id'];
};

async function deleteTask(
  client: TypedSupabaseClient,
  inputValues: DeleteTaskInput,
) {
  const { data, error } = await client
    .from('Task')
    .delete()
    .eq('id', inputValues.id)
    .select();

  if (error) throw new Error('Error deleting task');

  return data;
}

export const useDeleteTask = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: DeleteTaskInput) =>
      deleteTask(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('project-task-setting-list'),
      });
    },
  });
};
