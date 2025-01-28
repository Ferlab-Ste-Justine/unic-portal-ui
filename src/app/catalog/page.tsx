'use client';
import { Tabs } from 'antd';
import intl from 'react-intl-universal';

import PageLayout from '@/components/PageLayout';

const CatalogPage = () => {
  const items = [
    { label: 'Tab 1', key: 'item-1', children: 'Content 1' },
    { label: 'Tab 2', key: 'item-2', children: 'Content 2' },
  ];

  return (
    <PageLayout title={intl.get('screen.catalog.title')}>
      <Tabs items={items} />
    </PageLayout>
  );
};

export default CatalogPage;
