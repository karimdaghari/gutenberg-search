import { useInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useMemo } from 'react';
import { IContext } from '~/contexts/search.context';
import { IApiResponse } from '~/interfaces/api';

interface Props {
  query: IContext['query'];
  onSuccess: (data: IApiResponse['results']) => unknown;
}

export function useGetBooks({ query, onSuccess }: Props) {
  const {
    error,
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
      try {
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
      } catch (error: AxiosError | Error | unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            throw new Error(
              'It appears the API is experiencing issues. Please try again later!'
            );
          } else if (error.request) {
            throw new Error(
              'It appears an issue occurred on your end. Please check your internet connexion and try again later!'
            );
          } else throw new Error(error.message, { cause: error.cause });
        } else if (error instanceof Error) {
          throw new Error(
            error?.message ??
              "We're sorry, something went wrong. Please try again later!",
            { cause: error?.cause }
          );
        } else
          throw new Error(
            'Something went terribly wrong here. Please get in touch with us!'
          );
      }
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

  return {
    isLoading,
    isLoadingOnSearch,
    count,
    fetchMore: handleLoadMore,
    error: error as Error | undefined
  };
}
