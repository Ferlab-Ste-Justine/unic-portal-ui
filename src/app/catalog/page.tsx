'use client';
import { gql, useQuery } from '@apollo/client';
import intl from 'react-intl-universal';

import PageLayout from '@/components/PageLayout';

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

const CatalogPage = () => {
  const { data } = useQuery(GET_CATALOG_DATA);

  return (
    <PageLayout title={intl.get('screen.catalog.title')}>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </PageLayout>
  );
};

export default CatalogPage;
