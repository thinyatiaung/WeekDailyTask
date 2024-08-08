import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';

interface UseQueryHookProps {
  queryKey: any;
  queryFn: () => Promise<any>;
  payload?: any;
  params?: any;
}

export const useQueryHook = ({ queryKey, queryFn, payload }: UseQueryHookProps) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
  })
};

export const useQueryByIdHook = ({ queryKey, queryFn, params }: UseQueryHookProps) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: queryFn
  });
};