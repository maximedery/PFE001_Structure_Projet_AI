type QueryKeyCombinations =
  | ['projects']
  | ['projects', 'list']
  | ['project-task-setting-list']
  | ['workspaces']
  | ['workspaces', 'list'];

export const getQueryKey = (
  ...args: QueryKeyCombinations
): QueryKeyCombinations => args;
