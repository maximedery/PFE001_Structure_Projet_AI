import { useMutation, useQueryClient } from '@tanstack/react-query';
import cuid from 'cuid';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

type InsertOptions = Database['public']['Tables']['Task']['Insert'];

type CreateTaskInput = {
  predecessorIds?: string[];
} & Omit<InsertOptions, 'id'>;

async function createTask(
  client: TypedSupabaseClient,
  inputValues: CreateTaskInput,
) {
  const { data, error } = await client
    .from('Task')
    .insert({
      id: cuid(),
      name: inputValues.name,
      start: inputValues.start,
      end: inputValues.end,
      manHours: inputValues.manHours,
      cost: inputValues.cost,
      importance: inputValues.importance,
      weatherEffect: inputValues.weatherEffect,
      projectId: inputValues.projectId,
    })
    .select();

  if (error) throw new Error('Error creating task');

  // Link predecessors if any
  if (inputValues.predecessorIds && inputValues.predecessorIds.length) {
    const linkData = inputValues.predecessorIds.map((predecessorId) => ({
      predecessorId,
      successorId: data[0].id,
    }));

    const { error: linkError } = await client
      .from('TaskHierarchy')
      .insert(linkData);

    if (linkError)
      throw new Error(`Error linking predecessors: ${linkError.message}`);
  }

  return data;
}

export const useCreateTask = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: CreateTaskInput) =>
      createTask(client, inputValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('project-task-setting-list'),
      });
    },
  });
};
