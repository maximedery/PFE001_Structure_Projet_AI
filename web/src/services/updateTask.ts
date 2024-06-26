import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';
import { getQueryKey } from './_queryKeys';

type UpdateOptions = Database['public']['Tables']['Task']['Update'];

type UpdateTaskInput = {
  id: string;
} & UpdateOptions;

async function updateTask(
  client: TypedSupabaseClient,
  inputValues: UpdateTaskInput
) {
  const { data, error } = await client
    .from('Task')
    .update({
      name: inputValues.name,
      start: inputValues.start,
      end: inputValues.end,
      duration: inputValues.duration,
      cost: inputValues.cost,
      importance: inputValues.importance,
      weatherEffect: inputValues.weatherEffect,
      projectId: inputValues.projectId,
    })
    .eq('id', inputValues.id)
    .select();

  if (error) throw new Error('Error updating task');

  return data;
}

export const useUpdateTask = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: UpdateTaskInput) =>
      updateTask(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('tasks', 'setting-list'),
      });
    },
  });
};
