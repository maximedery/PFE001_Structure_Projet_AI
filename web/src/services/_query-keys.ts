type QueryKeyCombinations =
  | ['projects']
  | ['projects', 'list']
  | ['project-task-setting-list'];

export const getQueryKey = (
  ...args: QueryKeyCombinations
): QueryKeyCombinations => args;
