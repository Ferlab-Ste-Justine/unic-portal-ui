'use client';
import { useQuery } from '@apollo/client';
import intl from 'react-intl-universal';
import { EQPProjectsCard, HospitalSystemsCard, ResearchProjectsCard, WarehouseCard } from 'src/components/HomeCards';

import Loading from '@/components/Loading';
import PageLayout from '@/components/PageLayout';
import { GET_RESOURCES_STATS } from '@/lib/graphql/queries/getStats';
import { useLang } from '@/store/global';

import styles from './page.module.css';

const HomePage = () => {
  useLang();
  const {
    data: WarehouseData,
    loading,
    error,
  } = useQuery(GET_RESOURCES_STATS, {
    variables: { filterBy: [{ field: 'rs_type', value: 'warehouse' }] },
  });
  const warehouseStats = WarehouseData?.getResources?.hits?.[0]?.stat_etl;

  return (
    <PageLayout
      title={intl.get('screen.home.title')}
      subTitle={intl.get('screen.home.subTitle')}
      className={styles.pageLayout}
    >
      {loading && <Loading />}
      {error && <p>Error: {JSON.stringify(error, null, 2)}</p>}
      <WarehouseCard stats={warehouseStats} />
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
