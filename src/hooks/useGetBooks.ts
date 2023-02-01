import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { IContext } from '~/contexts/search.context';
import { IApiResponse } from '~/interfaces/api';

interface Props {
  query: IContext['query'];
  onSuccess: (data: IApiResponse['results']) => unknown;
}

export function useGetBooks({ query, onSuccess }: Props) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    fetchStatus,
    data
  } = useInfiniteQuery({
    queryKey: ['search', query],
    enabled: query !== '',
    queryFn: async ({ pageParam = null }) => {
      if (pageParam) {
        const { data } = await axios.get<IApiResponse>(pageParam);
        return data;
      }
      const { data } = await axios.get<IApiResponse>(
        'https://gutendex.com/books',
        {
          params: {
            search: query
          }
        }
      );
      return data;
    },
    getNextPageParam: ({ next }) => next,
    onSuccess: ({ pages }) => {
      const results = pages.flatMap(({ results }) => results);
      onSuccess(results);
    }
  });

  const isLoading = useMemo(
    () =>
      (status === 'loading' && fetchStatus === 'fetching') ||
      isFetchingNextPage,
    [status, fetchStatus, isFetchingNextPage]
  );

  const isLoadingOnSearch = useMemo(
    () => fetchStatus === 'fetching' && !isFetchingNextPage,
    [fetchStatus, isFetchingNextPage]
  );

  const count = useMemo(() => data?.pages[0].count || 0, [data]);

  async function handleLoadMore() {
    if (!hasNextPage || isLoading) return;
    return await fetchNextPage();
  }

  return { isLoading, isLoadingOnSearch, count, fetchMore: handleLoadMore };
}
