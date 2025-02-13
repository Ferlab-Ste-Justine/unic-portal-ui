'use client';

import { ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import Empty from '@ferlab/ui/core/components/Empty/index';
import Title from 'antd/lib/typography/Title';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import intl from 'react-intl-universal';

import { GET_VARIABLE_ENTITY } from '@/lib/graphql/queries/getVariableEntity.query';
import { useLang } from '@/store/global';
import { IVariableEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';

import styles from './page.module.css';
import EntityDescriptions from '@/components/EntityPage/EntityDescription';
import getSummaryDescriptions from '@/app/variable/[...slug]/utils/getSummaryDescriptions';

const EntityVariablePage = () => {
  const { slug } = useParams() as { slug: string };

  const resourceCode = decodeURI(slug[0]);
  const tabName = decodeURI(slug[1]);
  const varName = decodeURI(slug[2]);

  const variables: QueryOptions = {
    match: [
      { field: 'resource.rs_code', value: resourceCode },
      { field: 'table.tab_name', value: tabName },
      { field: 'var_name', value: varName },
    ],
    size: 1,
  };

  const lang = useLang();

  const { data, loading } = useQuery(GET_VARIABLE_ENTITY, { variables });

  const variable: IVariableEntity = data?.getVariables?.hits[0];

  console.log(variable);

  if (!variable && !loading) {
    return <Empty description={intl.get('entities.no_data')} imageType='row' size='large' />;
  }

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
        <EntityDescriptions
          id={'summary'}
          loading={loading}
          descriptions={getSummaryDescriptions(lang, variable)}
          title={intl.get('global.summary')}
        />
        {/*<EntityDescriptions*/}
        {/*  id={'variables'}*/}
        {/*  loading={loading}*/}
        {/*  descriptions={getVariablesDescriptions(lang, table)}*/}
        {/*  title={intl.get('entities.variable.Variables')}*/}
        {/*/>*/}
        {/*<EntityDescriptions*/}
        {/*  id={'currentVersion'}*/}
        {/*  loading={loading}*/}
        {/*  descriptions={getHistory(lang, table)}*/}
        {/*  title={intl.get('global.history')}*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default EntityVariablePage;
