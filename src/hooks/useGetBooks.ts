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
    fetchStatus
  } = useInfiniteQuery({
    queryKey: ['search', query],
    enabled: query !== '',
    queryFn: async ({ pageParam = null }) => {
      const fetchBooks = async ({
        url,
        params = undefined
      }: {
        url: string;
        params?: Record<string, any>;
      }) => {
        const { data } = await axios.get<IApiResponse>(url, {
          params
        });
        return data;
      };

      try {
        const { results, ...rest } = await fetchBooks({
          url: pageParam ?? 'https://gutendex.com/books/',
          params: pageParam ? undefined : { search: query }
        });

        // Filter out results that don't have a cover image
        const _results = results.filter(
          ({ formats }) => formats['image/jpeg'] || formats['image/png']
        );

        const response: IApiResponse = {
          ...rest,
          results: _results
        };

        return response;
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

  async function handleLoadMore() {
    if (!hasNextPage || isLoading) return;
    return await fetchNextPage();
  }

  return {
    isLoading,
    isLoadingOnSearch,
    fetchMore: handleLoadMore,
    error: error as Error | undefined
  };
}
