import { createContext, useContext } from 'react';
import { IApiResponse } from '~/interfaces/api';

interface IContext {
  setQuery: (query: string) => void;
  books: IApiResponse['results'];
}

export const SearchContext = createContext<null | IContext>(null);
SearchContext.displayName = 'SearchContext';

export function useSearchContext(): IContext {
  const context = useContext(SearchContext);
  if (context === null) throw new Error('SearchContext is not defined yet');
  return context;
}
