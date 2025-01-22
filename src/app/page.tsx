'use client';
import { gql, useQuery } from '@apollo/client';
import intl from 'react-intl-universal';

import Loading from '@/components/Loading';
import PageLayout from '@/components/PageLayout';
import { useLang } from '@/store/global';

const GET_STATS = gql`
  query getStats {
    getVariables {
      #count
      var_id
    }
    getTables {
      #count
      tab_id
    }
  }
`;

const HomePage = () => {
  useLang();
  const { data, loading, error } = useQuery(GET_STATS);

  return (
    <PageLayout title={intl.get('screen.home.title')} subTitle={intl.get('screen.home.subTitle')}>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {loading && <Loading />}
      {error && <p>Error: {JSON.stringify(error, null, 2)}</p>}
    </PageLayout>
  );
};

export default HomePage;
