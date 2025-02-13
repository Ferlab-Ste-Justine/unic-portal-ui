'use client';

import { ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import Empty from '@ferlab/ui/core/components/Empty/index';
import Title from 'antd/lib/typography/Title';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import intl from 'react-intl-universal';

import getSummaryDescriptions from '@/app/table/[...slug]/utils/getSummaryDescriptions';
import EntityDescriptions from '@/components/EntityPage/EntityDescription';
import { GET_TABLE_ENTITY } from '@/lib/graphql/queries/getTableEntity.query';
import { useLang } from '@/store/global';
import { ITableTEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';

import styles from './page.module.css';

const EntityTablePage = () => {
  const { slug } = useParams() as { slug: string };

  console.log(slug);

  const resourceCode = decodeURI(slug[0]);
  const tabName = decodeURI(slug[1]);

  const variables: QueryOptions = {
    match: [
      { field: 'resource.rs_code', value: resourceCode },
      { field: 'tab_name', value: tabName },
    ],
    size: 1,
  };

  const lang = useLang();

  const { data, loading } = useQuery(GET_TABLE_ENTITY, { variables });

  console.log('data', data);

  const table: ITableTEntity = data?.getTables?.hits[0];

  if (!table && !loading) {
    return <Empty description={intl.get('entities.no_data')} imageType='row' size='large' />;
  }

  return (
    <div>
      <div className={styles.titleHeader}>
        <ReadOutlined />
        <div className={styles.titleSeparator}>/</div>
        <Link href={`/resource/${table?.resource?.rs_code}`}>{table?.resource.rs_name}</Link>
        <div className={styles.titleSeparator}>/</div>
        <Title className={styles.title} level={4}>
          {table?.tab_name}
        </Title>
      </div>

      <div className={styles.entityPageContainer}>
        <EntityDescriptions
          id={'summary'}
          loading={loading}
          descriptions={getSummaryDescriptions(lang, table)}
          title={intl.get('global.summary')}
        />
        {/*<EntityDescriptions*/}
        {/*  id={'variables'}*/}
        {/*  loading={loading}*/}
        {/*  descriptions={getVariablesDescriptions(lang, resource)}*/}
        {/*  title={intl.get('entities.variable.Variables')}*/}
        {/*/>*/}
        {/*<EntityDescriptions*/}
        {/*  id={'currentVersion'}*/}
        {/*  loading={loading}*/}
        {/*  descriptions={getCurrentVersionDescriptions(lang, resource)}*/}
        {/*  title={intl.get('global.currentVersion')}*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default EntityTablePage;
