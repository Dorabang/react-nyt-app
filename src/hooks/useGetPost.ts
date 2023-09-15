import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getDefaultPost, getFilteredPost } from 'api/getPost';
import { queryDefaultPostKey, queryFilteredPostKey } from 'constants/QueryKey';

export const useGetDefaultPost = (page: number = 0) => {
  return useInfiniteQuery(
    queryDefaultPostKey,
    ({ pageParam = 0 }) => getDefaultPost(page),
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
  return useInfiniteQuery(
    queryFilteredPostKey,
    ({ pageParam = 0 }) => getFilteredPost(currentPage, page),
    {
      getNextPageParam: (lastPage) =>
        lastPage?.meta?.offset > lastPage?.meta?.hits
          ? undefined
          : lastPage?.meta?.offset.length + 1,
      staleTime: 1000 * 12,
      refetchOnWindowFocus: false,
    }
  );
};
