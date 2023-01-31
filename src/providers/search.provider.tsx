import { useQuery } from '@tanstack/react-query';
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

  useQuery({
    queryKey: ['search', query],
    enabled: query !== '',
    queryFn: async () => {
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
    onSuccess: ({ results }) => setBooks(results)
  });

  return (
    <SearchContext.Provider
      value={{
        setQuery,
        books,
        booksToRead,
        booksToReadIds,
        setBookToRead: handleSetBooksToRead,
        removeBookToRead: handleRemoveBookToRead
      }}>
      {children}
    </SearchContext.Provider>
  );
}
