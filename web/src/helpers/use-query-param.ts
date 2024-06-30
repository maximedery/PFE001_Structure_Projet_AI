import { useParams } from 'next/navigation';

export const useQueryParam = (paramKey: string) => {
  const params = useParams();
  const paramValue = params[paramKey];

  const result = typeof paramValue === 'string' ? paramValue : null;

  return result;
};
