import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getInfinitePost } from 'api/getPost';
import { queryPostKey } from 'constants/QueryKey';

export const useGetInfinitePost = (
  currentPage: 'Home' | 'Scrape',
  page: number = 0
) => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: queryPostKey });

  return useInfiniteQuery(
    queryPostKey,
    ({ pageParam = 0 }) => getInfinitePost(currentPage, page),
    {
      getNextPageParam: (lastPage) =>
        lastPage?.meta?.offset > lastPage?.meta?.hits
          ? undefined
          : lastPage?.meta?.offset + 1,
      staleTime: 1000 * 12,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: queryPostKey, exact: true }),
    }
  );
};
