import { useMutation, useQueryClient } from '@tanstack/react-query';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

type UpdateOptions = Database['public']['Tables']['Task']['Update'];

type UpdateTaskInput = {
  id: string;
  predecessorIds?: string[];
} & UpdateOptions;

async function updateTask(
  client: TypedSupabaseClient,
  inputValues: UpdateTaskInput,
) {
  // Unlink all current predecessors
  const { error: unlinkError } = await client
    .from('TaskHierarchy')
    .delete()
    .eq('successorId', inputValues.id);

  if (unlinkError)
    throw new Error(`Error unlinking predecessors: ${unlinkError.message}`);

  // Link new predecessors if any
  if (inputValues.predecessorIds && inputValues.predecessorIds.length) {
    const linkData = inputValues.predecessorIds.map((predecessorId) => ({
      predecessorId,
      successorId: inputValues.id,
    }));
    const { error: linkError } = await client
      .from('TaskHierarchy')
      .insert(linkData);

    if (linkError)
      throw new Error(`Error linking new predecessors: ${linkError.message}`);
  }

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
        queryKey: getQueryKey('project-task-setting-list'),
      });
    },
  });
};
