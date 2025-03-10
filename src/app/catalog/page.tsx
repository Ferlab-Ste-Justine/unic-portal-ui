'use client';
import { Tabs } from 'antd';
import intl from 'react-intl-universal';

import ResourcesTable from '@/components/CatalogTables/ResourcesTable';
import TablesTable from '@/components/CatalogTables/TablesTable';
import VariablesTable from '@/components/CatalogTables/VariablesTable';
import PageLayout from '@/components/PageLayout';
import { useLang } from '@/store/global';

import styles from './page.module.css';

const CatalogPage = () => {
  useLang();
  const items = [
    { label: intl.get('entities.resource.Resources'), key: 'ResourcesTable', children: <ResourcesTable /> },
    { label: intl.get('entities.table.Tables'), key: 'TablesTable', children: <TablesTable /> },
    { label: intl.get('entities.variable.Variables'), key: 'VariablesTable', children: <VariablesTable /> },
  ];

  return (
    <PageLayout title={intl.get('screen.catalog.title')} className={styles.pageLayout}>
      <Tabs type='card' items={items} defaultActiveKey={'ResourcesTable'} className={styles.tabs} />
    </PageLayout>
  );
};

export default CatalogPage;
