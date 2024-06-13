import {useQuery} from 'react-query';

const apiUrl = 'http://127.0.0.1:8000/' // to put in an env file

export const fetchHelloWorld = async() => {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error('There was an error with the response.')
  }

  return res.json();
};

export function useHelloWorldQuery() {
  
  const[] = useQuery('', () => fetchHelloWorld());
};