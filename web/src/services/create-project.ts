import { useMutation, useQueryClient } from '@tanstack/react-query';
import cuid from 'cuid';
import randomColor from 'randomcolor';

import { useQueryParam } from '@/helpers/use-query-params';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

type InsertOptions = Database['public']['Tables']['Project']['Insert'];

type CreateProjectInput = Pick<InsertOptions, 'name' | 'color'>;

async function createProject(
  client: TypedSupabaseClient,
  inputValues: CreateProjectInput,
  workspaceId: string | null,
) {
  if (!workspaceId) throw new Error('Workspace ID is required');

  const { data, error } = await client
    .from('Project')
    .insert({
      id: cuid(),
      name: inputValues.name,
      color: inputValues.color || randomColor(),
      workspaceId,
    })
    .select();

  if (error) throw new Error('Error creating project');

  return data;
}

export const useCreateProject = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();
  const workspaceId = useQueryParam('workspaceId');

  return useMutation({
    mutationFn: (inputValues: CreateProjectInput) =>
      createProject(client, inputValues, workspaceId),
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
