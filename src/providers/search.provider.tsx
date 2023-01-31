import { useState } from 'react';
import { SearchContext } from '~/contexts/search.context';
import { IProvider } from '~/interfaces/provider';

export function SearchProvider({ children }: IProvider) {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
