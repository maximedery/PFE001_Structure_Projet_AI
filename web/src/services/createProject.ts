import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import randomColor from 'randomcolor';
import cuid from 'cuid';
import { Database } from '@/utils/database.types';

type InsertOptions = Database['public']['Tables']['Project']['Insert'];

interface CreateProjectInput {
  name: InsertOptions['name'];
  color?: InsertOptions['color'];
}

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
    .select(); // Ensure you select data to return it

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
      queryClient.invalidateQueries({ queryKey: ['projects', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', 'setting-list'] });
    },
  });
};
