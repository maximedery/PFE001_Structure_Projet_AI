import { useMutation, useQueryClient } from '@tanstack/react-query';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';
import { useGetWorkspace } from './get-workspace';

type UpdateOptions = Database['public']['Tables']['Workspace']['Update'];

type UpdateWorkspaceInput = {
  id: string;
} & UpdateOptions;

async function updateWorkspace(
  client: TypedSupabaseClient,
  inputValues: UpdateWorkspaceInput,
) {
  const { data, error } = await client
    .from('Workspace')
    .update({
      name: inputValues.name,
      start: inputValues.start,
      end: inputValues.end,
      workingDays: inputValues.workingDays,
      nbOfEmployees: inputValues.nbOfEmployees,
    })
    .eq('id', inputValues.id)
    .select();

  if (error) throw new Error('Error updating workspace');

  return data[0];
}

type UseGetWorkspaceData = ReturnType<typeof useGetWorkspace>['data'];

export const useUpdateWorkspace = () => {
  const client = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputValues: UpdateWorkspaceInput) =>
      updateWorkspace(client, inputValues),
    onMutate: async (newWorkspace) => {
      await queryClient.cancelQueries({
        queryKey: getQueryKey('workspaces', { workspaceId: newWorkspace.id }),
      });

      const previousWorkspace = queryClient.getQueryData(
        getQueryKey('workspaces', { workspaceId: newWorkspace.id }),
      ) as UseGetWorkspaceData;

      queryClient.setQueryData(
        getQueryKey('workspaces', { workspaceId: newWorkspace.id }),
        { ...previousWorkspace, ...newWorkspace },
      );

      return { previousWorkspace, newWorkspace };
    },
    onError: (err, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData(
        getQueryKey('workspaces', { workspaceId: context.newWorkspace.id }),
        context?.previousWorkspace,
      );
    },
    onSettled: (newWorkspace) => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('workspaces', {
          workspaceId: newWorkspace?.id || null,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: getQueryKey('workspaces', 'list'),
      });
    },
  });
};
