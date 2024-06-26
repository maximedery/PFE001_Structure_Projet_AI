import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';
import { useQuery } from '@tanstack/react-query';
import { getQueryKey } from './_query-keys';

export type SettingTaskListRow =
  | SettingTaskListProjectRow
  | SettingTaskListTaskRow;

type SettingTaskListProjectRow = {
  type: 'project';
  code: string;
  subRows: SettingTaskListRow[];
} & Database['public']['Tables']['Project']['Row'];

type SettingTaskListTaskRow = {
  type: 'task';
  code: string;
  predecessorIds: string[];
} & Database['public']['Tables']['Task']['Row'];

async function getSettingTaskList(
  client: TypedSupabaseClient
): Promise<SettingTaskListRow[]> {
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
  const projectMap: { [key: string]: SettingTaskListProjectRow } = {};
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

    const taskRow: SettingTaskListTaskRow = {
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
      predecessorIds: [],
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
