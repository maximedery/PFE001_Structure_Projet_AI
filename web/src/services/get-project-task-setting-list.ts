import { useQuery } from '@tanstack/react-query';

import { useQueryParam } from '@/helpers/use-query-param';
import useSupabaseBrowser from '@/lib/supabase/supabase-client';
import { TypedSupabaseClient } from '@/lib/supabase/types';
import { Database } from '@/utils/database.types';

import { getQueryKey } from './_query-keys';

export type ProjectTaskSettingListRow =
  | ProjectTaskSettingListProjectRow
  | ProjectTaskSettingListTaskRow;

export type ProjectTaskSettingListProjectRow = {
  type: 'project';
  code: string;
  subRows: ProjectTaskSettingListRow[];
} & Database['public']['Tables']['Project']['Row'];

export type ProjectTaskSettingListTaskRow = {
  type: 'task';
  code: string;
  predecessorIds: string[];
  projectName: Database['public']['Tables']['Project']['Row']['name'];
} & Database['public']['Tables']['Task']['Row'];

async function getProjectTaskSettingList(
  client: TypedSupabaseClient,
  workspaceId: string | null,
): Promise<ProjectTaskSettingListRow[]> {
  if (!workspaceId) throw new Error('Workspace ID is required');

  // Fetch projects and tasks separately
  const { data: projects, error: projectError } = await client
    .from('Project')
    .select()
    .eq('workspaceId', workspaceId)
    .order('name', { ascending: true });

  if (projectError) throw new Error(projectError.message);
  if (!projects) throw new Error('No projects found');

  const { data: tasks, error: taskError } = await client
    .from('Task')
    .select('*, Project(*)')
    .eq('workspaceId', workspaceId)
    .order('name', { ascending: true });

  if (taskError) throw new Error(taskError.message);
  if (!tasks) throw new Error('No tasks found');

  const { data: taskHierarchies, error: hierarchyError } = await client
    .from('TaskHierarchy')
    .select();

  if (hierarchyError) throw new Error(hierarchyError.message);
  if (!taskHierarchies) throw new Error('No task hierarchies found');

  // Create a map of successorId to predecessorIds
  const predecessorMap: { [key: string]: string[] } = {};
  taskHierarchies.forEach((hierarchy) => {
    if (!predecessorMap[hierarchy.successorId]) {
      predecessorMap[hierarchy.successorId] = [];
    }
    predecessorMap[hierarchy.successorId].push(hierarchy.predecessorId);
  });

  // Group tasks by project
  const projectMap: { [key: string]: ProjectTaskSettingListProjectRow } = {};
  let projectCode = 1;

  projects.forEach((project) => {
    projectMap[project.id] = {
      type: 'project',
      id: project.id,
      color: project.color,
      name: project.name,
      code: projectCode.toString(),
      workspaceId: project.workspaceId,
      subRows: [],
    };
    projectCode += 1;
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
        workspaceId: project.workspaceId,
        subRows: [],
      };
      projectCode += 1;
    }

    const taskCode = projectMap[project.id].subRows.length + 1;

    const taskRow: ProjectTaskSettingListTaskRow = {
      type: 'task',
      id: task.id,
      name: task.name,
      code: `${projectMap[project.id].code}-${taskCode}`,
      manHours: task.manHours,
      start: task.start,
      end: task.end,
      cost: task.cost,
      importance: task.importance,
      weatherEffect: task.weatherEffect,
      projectId: task.projectId,
      projectName: project.name,
      predecessorIds: predecessorMap[task.id] || [],
      workspaceId: task.workspaceId,
    };

    projectMap[project.id].subRows.push(taskRow);
  });

  return Object.values(projectMap);
}

export const useGetProjectTaskSettingList = () => {
  const client = useSupabaseBrowser();
  const workspaceId = useQueryParam('workspaceId');

  return useQuery({
    queryKey: getQueryKey({ workspaceId }, 'project-task-setting-list'),
    queryFn: () => getProjectTaskSettingList(client, workspaceId),
    enabled: !!workspaceId,
  });
};
