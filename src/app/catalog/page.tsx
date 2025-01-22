import { gql } from '@apollo/client';
import intl from 'react-intl-universal';

import PageLayout from '@/components/PageLayout';
import client from '@/lib/graphql/ApolloClient';

const GET_CATALOG_DATA = gql`
  query getCatalogData {
    getVariables {
      var_id
      var_name
    }
    getResources {
      rs_id
      rs_name
    }
    getTables {
      tab_id
      tab_name
    }
  }
`;

const CatalogPage = async () => {
  // SSR example
  const { data } = await client.query({ query: GET_CATALOG_DATA });

  return (
    <PageLayout title={intl.get('screen.catalog.title')}>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </PageLayout>
  );
};

export default CatalogPage;
