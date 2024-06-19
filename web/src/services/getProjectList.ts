import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';

async function getProjectList(client: TypedSupabaseClient) {
  const { data } = await client.from('Project').select().throwOnError();

  if (!data) throw new Error('No data found');

  return data;
}

export const useGetProjectList = () => {
  const client = useSupabaseBrowser();

  return useQuery({
    queryKey: ['projects', 'list'],
    queryFn: () => getProjectList(client),
  });
};
