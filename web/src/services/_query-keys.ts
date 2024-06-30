type WorkspaceIdObject = { workspaceId: string | null };

type QueryKeyCombinations =
  | [WorkspaceIdObject]
  | [WorkspaceIdObject, 'projects']
  | [WorkspaceIdObject, 'projects', 'list']
  | [WorkspaceIdObject, 'project-task-setting-list']
  | ['workspaces']
  | ['workspaces', 'list'];

export const getQueryKey = (
  ...args: QueryKeyCombinations
): QueryKeyCombinations => args;
