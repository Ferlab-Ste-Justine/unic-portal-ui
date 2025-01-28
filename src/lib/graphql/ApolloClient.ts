import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

import config from '@/config';

const { PORTAL_API_URL } = config;

// Create an HTTP link for the GraphQL API
const httpLink = createHttpLink({
  uri: `${PORTAL_API_URL}/graphql`,
});

// Use setContext to dynamically add the Authorization header
const authLink = setContext(async (_, { headers }) => {
  const session = await getSession(); // Retrieve session from next-auth
  const token = session?.user?.accessToken; // Extract token from the session

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // Add the token if available
    },
  };
});

// Combine the auth link and the HTTP link
const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first', // Caching for regular queries
    },
  },
});

export default client;
