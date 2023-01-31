import { createContext, useContext } from 'react';

interface IContext {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchContext = createContext<null | IContext>(null);
SearchContext.displayName = 'SearchContext';

export function useSearchContext(): IContext {
  const context = useContext(SearchContext);
  if (context === null) throw new Error('SearchContext is not defined yet');
  return context;
}
