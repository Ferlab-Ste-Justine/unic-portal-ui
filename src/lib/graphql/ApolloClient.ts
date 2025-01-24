import { ApolloClient, InMemoryCache } from '@apollo/client';

import config from '@/config';

const { PORTAL_API_URL } = config;

const client = new ApolloClient({
  uri: `${PORTAL_API_URL}/graphql`,
  cache: new InMemoryCache({
    addTypename: true,
  }),
});

export default client;
