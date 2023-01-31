import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { SearchContext } from '~/contexts/search.context';
import { IApiResponse } from '~/interfaces/api';
import { IProvider } from '~/interfaces/provider';
import { useMemo } from 'react';

export function SearchProvider({ children }: IProvider) {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<IApiResponse['results']>([]);
  const [booksToRead, setBooksToRead] = useState<IApiResponse['results']>([]);
  const booksToReadIds = useMemo(
    () => booksToRead.map(({ id }) => id),
    [booksToRead]
  );

  function handleSetBooksToRead(id: number) {
    const book = books.find(({ id: _id }) => _id === id);
    if (book) {
      setBooksToRead([...booksToRead, book]);
    }
  }

  function handleRemoveBookToRead(id: number) {
    const _booksToRead = booksToRead.filter(({ id: _id }) => _id !== id);
    setBooksToRead(_booksToRead);
  }

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
      setBooks(results);
    }
  });

  const isLoading = useMemo(
    () =>
      (status === 'loading' && fetchStatus === 'fetching') ||
      isFetchingNextPage,
    [status, fetchStatus, isFetchingNextPage]
  );

  async function handleLoadMore() {
    if (!hasNextPage || isLoading) return;
    return await fetchNextPage();
  }

  const isLoadingOnSearch = useMemo(
    () => fetchStatus === 'fetching' && !isFetchingNextPage,
    [fetchStatus, isFetchingNextPage]
  );

  const booksCount = data?.pages[0].count || 0;

  return (
    <SearchContext.Provider
      value={{
        query,
        isLoading,
        isLoadingOnSearch,
        setQuery,
        books,
        booksCount,
        booksToRead,
        booksToReadIds,
        setBookToRead: handleSetBooksToRead,
        removeBookToRead: handleRemoveBookToRead,
        loadMore: handleLoadMore
      }}>
      {children}
    </SearchContext.Provider>
  );
}
