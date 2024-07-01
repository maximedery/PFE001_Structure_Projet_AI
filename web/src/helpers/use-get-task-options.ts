import { useMemo } from 'react';

import {
  ProjectTaskSettingListProjectRow,
  useGetProjectTaskSettingList,
} from '@/services/get-project-task-setting-list';

export const useGetTaskOptions = (props: { projectId?: string }) => {
  const { data: projectTaskSettingList } = useGetProjectTaskSettingList();

  return useMemo(() => {
    if (!props.projectId || !projectTaskSettingList) {
      return [];
    }

    const project = projectTaskSettingList.find(
      (
        projectTaskSetting,
      ): projectTaskSetting is ProjectTaskSettingListProjectRow =>
        projectTaskSetting.id === props.projectId,
    );

    const predecessorOptions =
      project?.subRows.map((task) => ({
        value: task.id,
        label: `${task.code} / ${task.name || 'Untitled'}`,
      })) || [];

    return predecessorOptions;
  }, [projectTaskSettingList, props.projectId]);
};
