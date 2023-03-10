import { createContext, useContext } from 'react';
import { IApiResponse } from '~/interfaces/api';

export interface IContext {
  error?: Error;
  isLoading: boolean;
  isLoadingOnSearch: boolean;
  query: string;
  setQuery: (query: string) => void;
  books: IApiResponse['results'];
  setBookToRead: (id: number) => void;
  removeBookToRead: (id: number) => void;
  booksToRead: IContext['books'];
  booksToReadIds: number[];
  loadMore: () => Promise<unknown>;
}

export const SearchContext = createContext<null | IContext>(null);
SearchContext.displayName = 'SearchContext';

export function useSearchContext(): IContext {
  const context = useContext(SearchContext);
  if (context === null) throw new Error('SearchContext is not defined yet');
  return context;
}
