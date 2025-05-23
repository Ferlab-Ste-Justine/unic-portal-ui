'use client';

import { ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import Empty from '@ferlab/ui/core/components/Empty/index';
import GridCard from '@ferlab/ui/core/view/v2/GridCard/index';
import Title from 'antd/lib/typography/Title';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import intl from 'react-intl-universal';

import SummaryContent from '@/app/table/[...slug]/SummaryContent/SummaryContent';
import getHistory from '@/app/table/[...slug]/utils/getHistory';
import EntityCard from '@/components/EntityPage/EntityCard';
import EntityCardSummary from '@/components/EntityPage/EntityCardSummary/EntityCardSummary';
import EntityDescriptions from '@/components/EntityPage/EntityDescription/EntityDescriptions';
import { GET_TABLE_ENTITY } from '@/lib/graphql/queries/getTableEntity.query';
import { useLang } from '@/store/global';
import { ITableEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';

import styles from './page.module.css';
import getVariablesDescriptions from './utils/getVariablesDescriptions';

const EntityTablePage = () => {
  const { slug } = useParams() as { slug: string };

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

  const table: ITableEntity = data?.getTables?.hits[0];

  if (!table && !loading) {
    return <Empty description={intl.get('entities.no_data')} imageType='row' size='large' />;
  }

  return (
    <>
      <div className={styles.titleHeader}>
        <Link className={styles.titleHeaderLink} href={'/catalog'}>
          <ReadOutlined />
          <div className={styles.titleSeparator}>/</div>
        </Link>
        <Link className={styles.titleHeaderLink} href={`/resource/${table?.resource?.rs_code}`}>
          {table?.resource?.rs_name}
          <div className={styles.titleSeparator}>/</div>
        </Link>
        <Title className={styles.title} level={4}>
          {table?.tab_name}
        </Title>
      </div>

      <div className={styles.entityPageContainer}>
        <div className={styles.summaryContentContainer}>
          <GridCard
            id={'summary'}
            loading={loading}
            style={{ padding: 24 }}
            content={
              <EntityCardSummary
                type={intl.get('entities.table.Table')}
                name={<div>{table?.tab_name}</div>}
                content={SummaryContent(table)}
              />
            }
          />
        </div>
        <EntityCard id={'variables'} loading={loading} title={intl.get('entities.variable.Variables')}>
          <EntityDescriptions descriptions={getVariablesDescriptions(lang, table)} />
        </EntityCard>
        <EntityCard id={'history'} loading={loading} title={intl.get('global.history')}>
          <EntityDescriptions descriptions={getHistory(lang, table)} />
        </EntityCard>
      </div>
    </>
  );
};

export default EntityTablePage;
