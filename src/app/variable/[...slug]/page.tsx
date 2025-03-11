'use client';

import { ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import Empty from '@ferlab/ui/core/components/Empty/index';
import { Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import intl from 'react-intl-universal';

import getHistory from '@/app/variable/[...slug]/utils/getHistory';
import getSummaryDescriptions from '@/app/variable/[...slug]/utils/getSummaryDescriptions';
import EntityCard from '@/components/EntityPage/EntityCard/EntityCard';
import EntityDescriptions from '@/components/EntityPage/EntityDescription/EntityDescriptions';
import { GET_VARIABLE_ENTITY } from '@/lib/graphql/queries/getVariableEntity.query';
import { useLang } from '@/store/global';
import { LANG } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';

import styles from './page.module.css';

const MAX_TABLE_HEIGHT = 272;

const EntityVariablePage = () => {
  const { slug } = useParams() as { slug: string };

  const resourceCode = decodeURIComponent(slug[0]);
  const tabName = decodeURIComponent(slug[1]);
  const varName = decodeURIComponent(slug[2]);

  const variables: QueryOptions = {
    match: [
      { field: 'resource.rs_code', value: resourceCode },
      { field: 'table.tab_name', value: tabName },
      { field: 'var_name', value: varName },
    ],
    size: 1,
  };
  const [scroll, setScroll] = useState<{ y: number } | undefined>(undefined);

  const lang = useLang();

  const { data, loading } = useQuery(GET_VARIABLE_ENTITY, { variables });

  const tableRef = useCallback(
    (node: any) => {
      const height = node?.clientHeight ?? 0;
      if (height > MAX_TABLE_HEIGHT) {
        setScroll({ y: MAX_TABLE_HEIGHT });
      } else setScroll(undefined);
    },
    [loading, data],
  );

  const variable: IVariableEntity = data?.getVariables?.hits[0];

  if (!variable && !loading) {
    return <Empty description={intl.get('entities.no_data')} imageType='row' size='large' />;
  }

  const dataSource = variable?.value_set?.values || [];

  const columns = [
    {
      title: 'Values',
      dataIndex: 'vsval_code',
      key: 'vsval_code',
      width: 360,
    },
    {
      title: 'Libelle',
      dataIndex: lang === LANG.EN ? 'vsval_label_en' : 'vsval_label_fr',
      key: 'vsval_label_en',
    },
  ];

  return (
    <div>
      <div className={styles.titleHeader}>
        <Link className={styles.titleHeaderLink} href={'/catalog'}>
          <ReadOutlined />
          <div className={styles.titleSeparator}>/</div>
        </Link>
        <Link className={styles.titleHeaderLink} href={`/resource/${variable?.resource?.rs_code}`}>
          {variable?.resource?.rs_name}
          <div className={styles.titleSeparator}>/</div>
        </Link>
        <Link
          className={styles.titleHeaderLink}
          href={`/table/${variable?.resource?.rs_code}/${variable?.table?.tab_name}`}
        >
          {variable?.table?.tab_name}
          <div className={styles.titleSeparator}>/</div>
        </Link>
        <Title className={styles.title} level={4}>
          {variable?.var_name}
        </Title>
      </div>

      <div className={styles.entityPageContainer}>
        <EntityCard id={'summary'} loading={loading} title={intl.get('global.summary')}>
          <EntityDescriptions descriptions={getSummaryDescriptions(lang, variable)} />
        </EntityCard>
        <EntityCard id={'currentVersion'} loading={loading} title={intl.get('global.categories')}>
          <Table
            className={styles.entityTable}
            ref={tableRef}
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
            size='small'
            scroll={scroll}
          />
        </EntityCard>
        <EntityCard id={'summary'} loading={loading} title={intl.get('global.summary')}>
          <EntityDescriptions descriptions={getHistory(lang, variable)} />
        </EntityCard>
      </div>
    </div>
  );
};

export default EntityVariablePage;
