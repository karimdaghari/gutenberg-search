import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { SearchContext } from '~/contexts/search.context';
import { IApiResponse } from '~/interfaces/api';
import { IProvider } from '~/interfaces/provider';

export function SearchProvider({ children }: IProvider) {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<IApiResponse['results']>([]);
  const { data, error } = useQuery({
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
    <SearchContext.Provider value={{ setQuery, books }}>
      {children}
    </SearchContext.Provider>
  );
}
