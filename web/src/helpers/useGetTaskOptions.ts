import {
  ProjectTaskSettingListProjectRow,
  useGetProjectTaskSettingList,
} from '@/services/get-project-task-setting-list';
import { useMemo } from 'react';

export const useGetTaskOptions = (props: { projectId?: string }) => {
  const { data: projectTaskSettingList } = useGetProjectTaskSettingList();

  return useMemo(() => {
    if (!props.projectId || !projectTaskSettingList) {
      return [];
    }

    const project = projectTaskSettingList.find(
      (project): project is ProjectTaskSettingListProjectRow =>
        project.id === props.projectId
    );

    const predecessorOptions =
      project?.subRows.map((task) => ({
        value: task.id,
        label: `${task.code} / ${task.name || 'Untitled'}`,
      })) || [];

    return predecessorOptions;
  }, [projectTaskSettingList, props.projectId]);
};
