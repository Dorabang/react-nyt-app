import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getDefaultPost, getFilteredPost } from 'api/getPost';
import { queryDefaultPostKey, queryFilteredPostKey } from 'constants/QueryKey';

export const useGetDefaultPost = (
  currentPage: 'Home' | 'Scrape',
  page: number = 0
) => {
  const queryClient = useQueryClient();
  console.log('defaultPost');
  return useInfiniteQuery(
    queryDefaultPostKey,
    ({ pageParam }) => getDefaultPost(currentPage, page),
    {
      getNextPageParam: (lastPage) =>
        lastPage?.meta?.offset > lastPage?.meta?.hits
          ? undefined
          : lastPage?.meta?.offset + 1,
      staleTime: 1000 * 12,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetFilteredPost = (
  currentPage: 'Home' | 'Scrape',
  page: number = 0
) => {
  const queryClient = useQueryClient();
  console.log('filteredPost');

  return useInfiniteQuery(
    queryFilteredPostKey,
    ({ pageParam }) => getFilteredPost(currentPage, page),
    {
      getNextPageParam: (lastPage) =>
        lastPage?.meta?.offset > lastPage?.meta?.hits
          ? undefined
          : lastPage?.meta?.offset + 1,
      staleTime: 1000 * 12,
      refetchOnWindowFocus: false,
    }
  );
};
