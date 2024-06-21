import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';
import { useQuery } from '@tanstack/react-query';
import { getQueryKey } from './_queryKeys';

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
  // Fetch projects and tasks separately
  const { data: projects, error: projectError } = await client
    .from('Project')
    .select()
    .order('name', { ascending: true });

  if (projectError) throw new Error(projectError.message);
  if (!projects) throw new Error('No projects found');

  const { data: tasks, error: taskError } = await client
    .from('Task')
    .select('*, Project(*)')
    .order('name', { ascending: true });

  if (taskError) throw new Error(taskError.message);
  if (!tasks) throw new Error('No tasks found');

  // Group tasks by project
  const projectMap: { [key: string]: ProjectRow } = {};
  let projectCode = 1;

  projects.forEach((project) => {
    projectMap[project.id] = {
      type: 'project',
      id: project.id,
      color: project.color,
      name: project.name,
      code: projectCode.toString(),
      subRows: [],
    };
    projectCode++;
  });

  tasks.forEach((task) => {
    const project = task.Project;

    if (!project) return;

    if (!projectMap[project.id]) {
      projectMap[project.id] = {
        type: 'project',
        id: project.id,
        color: project.color,
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
    queryKey: getQueryKey('tasks', 'setting-list'),
    queryFn: () => getSettingTaskList(client),
  });
};
