import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IProvider } from '~/interfaces/provider';

const client = new QueryClient();

export function ReactQueryProvider({ children }: IProvider) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
