import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';
import { useQuery } from '@tanstack/react-query';

export type Row = ProjectRow | TaskRow;

type ProjectRow = {
  type: 'project';
  code: string;
  subRows: Row[];
} & Database['public']['Tables']['Project']['Row'];

type TaskRow = {
  type: 'task';
  code: string;
} & Database['public']['Tables']['Task']['Row'];

async function getSettingTaskList(client: TypedSupabaseClient): Promise<Row[]> {
  const { data, error } = await client.from('Task').select('*, Project(*)');

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data found');

  // Group tasks by project
  const projectMap: { [key: string]: ProjectRow } = {};
  let projectCode = 1;

  data.forEach((task) => {
    const project = task.Project;

    if (!project) return;

    if (!projectMap[project.id]) {
      projectMap[project.id] = {
        type: 'project',
        id: project.id,
        color: project.color,
        name: project.name || 'Untitled',
        code: projectCode.toString(),
        subRows: [],
      };
      projectCode++;
    }

    const taskCode = projectMap[project.id].subRows.length + 1;

    const taskRow: TaskRow = {
      type: 'task',
      id: task.id,
      name: task.name || 'Untitled',
      code: `${projectMap[project.id].code}-${taskCode}`,
      duration: task.duration,
      start: task.start,
      end: task.end,
      cost: task.cost,
      importance: task.importance,
      weatherEffect: task.weatherEffect,
      projectId: task.projectId,
    };

    projectMap[project.id].subRows.push(taskRow);
  });

  return Object.values(projectMap);
}

export const useGetSettingTaskList = () => {
  const client = useSupabaseBrowser();

  return useQuery({
    queryKey: ['tasks', 'setting-list'],
    queryFn: () => getSettingTaskList(client),
  });
};
