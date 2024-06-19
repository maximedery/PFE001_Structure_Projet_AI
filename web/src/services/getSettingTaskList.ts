import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';

export type Row = ProjectRow | TaskRow;

interface ProjectRow {
  type: 'project';
  id: string;
  name: string;
  code: string;
  subRows: Row[];
}

interface TaskRow {
  type: 'task';
  id: string;
  name: string;
  code: string;
  duration: number | null;
  start: string | null;
  end: string | null;
}

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
        name: project.name,
        code: projectCode.toString(),
        subRows: [],
      };
      projectCode++;
    }

    const taskCode = projectMap[project.id].subRows.length + 1;

    const taskRow: TaskRow = {
      type: 'task',
      id: task.id,
      name: task.name,
      code: `${projectMap[project.id].code}-${taskCode}`,
      duration: task.duration,
      start: task.start,
      end: task.end,
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
