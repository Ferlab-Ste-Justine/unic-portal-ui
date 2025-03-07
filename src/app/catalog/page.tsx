'use client';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';

import ResourcesTable from '@/components/CatalogTables/ResourcesTable';
import TablesTable from '@/components/CatalogTables/TablesTable';
import VariablesTable from '@/components/CatalogTables/VariablesTable';
import PageLayout from '@/components/PageLayout';
import useHash from '@/lib/hooks/useHash';
import { useLang } from '@/store/global';

import styles from './page.module.css';

const CatalogPage = () => {
  useLang();
  const { hash, setHash } = useHash();
  const tab = hash.split('?')[0]; // Remove query params if present
  const items = [
    { label: intl.get('entities.resource.Resources'), key: 'resources', children: <ResourcesTable /> },
    { label: intl.get('entities.table.Tables'), key: 'tables', children: <TablesTable /> },
    { label: intl.get('entities.variable.Variables'), key: 'variables', children: <VariablesTable /> },
  ];
  const isValidTab = items.some((item) => item.key === tab);
  const [activeTab, setActiveTab] = useState(isValidTab ? tab : items[0].key);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (isValidTab) {
      setActiveTab(tab);
      setHash('');
    }
  }, [isValidTab, setHash, tab]);

  return (
    <PageLayout title={intl.get('screen.catalog.title')} className={styles.pageLayout}>
      <Tabs type='card' items={items} activeKey={activeTab} className={styles.tabs} onChange={handleTabChange} />
    </PageLayout>
  );
};

export default CatalogPage;
