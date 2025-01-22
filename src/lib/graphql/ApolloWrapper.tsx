import { ApolloProvider } from '@apollo/client';

import client from '@/lib/graphql/ApolloClient';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
