import { IProvider } from '~/interfaces/provider';
import { ReactQueryProvider } from './react-query.provider';
import { SearchProvider } from './search.provider';

export function AppProvider({ children }: IProvider) {
  return (
    <ReactQueryProvider>
      <SearchProvider>{children}</SearchProvider>
    </ReactQueryProvider>
  );
}
