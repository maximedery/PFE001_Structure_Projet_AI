import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import randomColor from 'randomcolor';
import cuid from 'cuid';
import { Database } from '@/utils/database.types';
import { getQueryKey } from './_query-keys';

type InsertOptions = Database['public']['Tables']['Project']['Insert'];

type CreateProjectInput = Omit<InsertOptions, 'id'>;

async function createProject(
  client: TypedSupabaseClient,
  inputValues: CreateProjectInput
) {
  const { data, error } = await client
    .from('Project')
    .insert({
      id: cuid(),
      name: inputValues.name,
      color: inputValues.color || randomColor(),
    })
    .select();

  if (error) throw new Error('Error creating project');

  return data;
}

export const useCreateProject = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: CreateProjectInput) =>
      createProject(client, inputValues),
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
