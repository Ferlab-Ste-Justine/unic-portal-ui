'use client';
import { gql, useQuery } from '@apollo/client';
import intl from 'react-intl-universal';
import { EQPProjectsCard, HospitalSystemsCard, ResearchProjectsCard, WarehouseCard } from 'src/components/HomeCards';

import Loading from '@/components/Loading';
import PageLayout from '@/components/PageLayout';
import { useLang } from '@/store/global';

import styles from './page.module.css';

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
  console.log('HomePage data', data);

  return (
    <PageLayout
      title={intl.get('screen.home.title')}
      subTitle={intl.get('screen.home.subTitle')}
      className={styles.pageLayout}
    >
      {loading && <Loading />}
      {error && <p>Error: {JSON.stringify(error, null, 2)}</p>}
      <WarehouseCard
        stats={[
          { value: '2300', label: 'Value' },
          { value: '12', label: 'Value' },
          { value: '12', label: 'Value' },
          { value: '14', label: 'ValueValue' },
        ]}
      />
      <ResearchProjectsCard
        stats={[
          { value: '30', label: 'Value' },
          { value: '2300', label: 'ValueValue' },
        ]}
      />
      <EQPProjectsCard
        stats={[
          { value: '30', label: 'Value' },
          { value: '2900', label: 'ValueValue' },
        ]}
      />
      <HospitalSystemsCard
        stats={[
          { value: '30', label: 'Value' },
          { value: '2900', label: 'ValueValue' },
        ]}
      />
    </PageLayout>
  );
};

export default HomePage;
