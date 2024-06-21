type QueryKeyCombinations =
  | ['projects']
  | ['projects', 'list']
  | ['tasks']
  | ['tasks', 'setting-list'];

export const getQueryKey = (
  ...args: QueryKeyCombinations
): QueryKeyCombinations => args;
