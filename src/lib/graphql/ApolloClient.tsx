import { ApolloClient, InMemoryCache } from '@apollo/client';

import config from '@/config';

const { DATA_API_URL } = config;

const client = new ApolloClient({
  uri: `${DATA_API_URL}/graphql`,
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      ResourceType: {
        keyFields: ['rs_id'],
      },
      TableType: {
        keyFields: ['tab_id'],
      },
      VariableType: {
        keyFields: ['var_id'],
      },
    },
  }),
});

export default client;
