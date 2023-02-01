import { useState } from 'react';
import { SearchContext } from '~/contexts/search.context';
import { IApiResponse } from '~/interfaces/api';
import { IProvider } from '~/interfaces/provider';
import { useMemo } from 'react';
import { useGetBooks } from '~/hooks/useGetBooks';

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

  const { error, fetchMore, isLoading, isLoadingOnSearch } = useGetBooks({
    query,
    onSuccess: setBooks
  });

  return (
    <SearchContext.Provider
      value={{
        error,
        query,
        isLoading,
        isLoadingOnSearch,
        setQuery,
        books,
        booksToRead,
        booksToReadIds,
        setBookToRead: handleSetBooksToRead,
        removeBookToRead: handleRemoveBookToRead,
        loadMore: fetchMore
      }}>
      {children}
    </SearchContext.Provider>
  );
}
