import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getInfinitePost, getPost } from 'api/getPost';
import { queryPostKey } from 'constants/QueryKey';

export const useGetPost = (
  query?: string | undefined,
  period?: string | undefined,
  glocations?: string[] | undefined,
  page?: number | undefined
) => {
  const queryClient = useQueryClient();

  return useQuery<any[] | undefined>({
    queryKey: queryPostKey,
    queryFn: () => getPost(query, period, glocations, page),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: queryPostKey });
    },
  });
};

export const useGetInfinitePost = (
  query?: string | undefined,
  period?: string | undefined,
  glocations?: string[] | undefined,
  page: number = 0
) => {
  const queryClient = useQueryClient();
  return useInfiniteQuery(
    queryPostKey,
    ({ pageParam }) =>
      getInfinitePost({
        query: query,
        period: period,
        glocations: glocations,
        page: page,
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: queryPostKey }),
      getNextPageParam: (lastPage, allPages) => {
        console.log(
          '🚀 ~ file: useGetPost.ts:46 ~ lastPage:',
          lastPage?.meta?.offset
        );
        /* 
        return lastPage.meta.offset < allPages[0].meta.hits
          ? lastPage.meta.offset + 10
          : allPages[0].meta.hits; */
      },
    }
  );
};
