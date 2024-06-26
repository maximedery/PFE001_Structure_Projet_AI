import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import cuid from 'cuid';
import { Database } from '@/utils/database.types';
import { getQueryKey } from './_query-keys';

type InsertOptions = Database['public']['Tables']['Task']['Insert'];

type CreateTaskInput = Omit<InsertOptions, 'id'>;

async function createTask(
  client: TypedSupabaseClient,
  inputValues: CreateTaskInput
) {
  const { data, error } = await client
    .from('Task')
    .insert({
      id: cuid(),
      name: inputValues.name,
      start: inputValues.start,
      end: inputValues.end,
      duration: inputValues.duration,
      cost: inputValues.cost,
      importance: inputValues.importance,
      weatherEffect: inputValues.weatherEffect,
      projectId: inputValues.projectId,
    })
    .select();

  if (error) throw new Error('Error creating task');

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
        queryKey: getQueryKey('tasks'),
      });
    },
  });
};
