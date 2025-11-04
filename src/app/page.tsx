'use client';
import { useQuery } from '@apollo/client';
import intl from 'react-intl-universal';
import { EQPProjectsCard, HospitalSystemsCard, ResearchProjectsCard, WarehouseCard } from 'src/components/HomeCards';

import PageLayout from '@/components/PageLayout';
import { GET_RESOURCES_STATS } from '@/lib/graphql/queries/getStats';
import { useLang } from '@/store/global';

import styles from './page.module.css';

const HomePage = () => {
  useLang();
  const { data } = useQuery(GET_RESOURCES_STATS);
  const warehouseStats = data?.getResourcesStats?.warehouse;
  const researchProjectStats = data?.getResourcesStats?.research_project;
  const eqpStats = data?.getResourcesStats?.eqp;
  const sourceSystemStats = data?.getResourcesStats?.source_system;

  return (
    <PageLayout
      title={intl.get('screen.home.title')}
      className={styles.pageLayout}
      classNameContainer={styles.pageLayoutContainer}
    >
      <HospitalSystemsCard stats={sourceSystemStats} />
      <WarehouseCard stats={warehouseStats} />
      <ResearchProjectsCard stats={researchProjectStats} />
      <EQPProjectsCard stats={eqpStats} />
    </PageLayout>
  );
};

export default HomePage;
