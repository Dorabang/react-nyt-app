import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getInfinitePost, getPost } from 'api/getPost';

export const useGetPost = (
  query?: string | undefined,
  period?: string | undefined,
  country?: string[] | undefined
) =>
  useQuery<any[] | undefined>({
    queryKey: ['post'],
    queryFn: () => getPost(query, period, country),
  });

export const useGetInfinitePost = (
  query?: string | undefined,
  period?: string | undefined,
  country?: string[] | undefined
) =>
  useInfiniteQuery(
    ['post'],
    ({ pageParam = 1 }) =>
      getInfinitePost({
        query: query,
        period: period,
        glocations: country,
        page: pageParam,
      }),
    {
      getNextPageParam: (_, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    }
  );
