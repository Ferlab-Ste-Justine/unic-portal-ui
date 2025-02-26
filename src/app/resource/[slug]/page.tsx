'use client';

import { ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import Empty from '@ferlab/ui/core/components/Empty/index';
import Title from 'antd/lib/typography/Title';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import intl from 'react-intl-universal';

import getCurrentVersionDescriptions from '@/app/resource/[slug]/utils/getCurrentVersionDescriptions';
import getSummaryDescriptions from '@/app/resource/[slug]/utils/getSummaryDescriptions';
import getVariablesDescriptions from '@/app/resource/[slug]/utils/getVariablesDescriptions';
import EntityDescriptions from '@/components/EntityPage/EntityDescription';
import { GET_RESOURCE_ENTITY } from '@/lib/graphql/queries/getResourceEntity.query';
import { useLang } from '@/store/global';
import { IResourceEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';

import styles from './page.module.css';

const EntityResourcePage = () => {
  const { slug } = useParams() as { slug: string };

  const resourceCode = decodeURI(slug);

  const variables: QueryOptions = {
    match: [
      { field: 'rs_code', value: resourceCode },
      // rs_is_project should be true for Project resource type.
      // { field: 'rs_is_project', value: 'true' },
    ],
    size: 1,
  };
  const lang = useLang();

  const { data, loading } = useQuery(GET_RESOURCE_ENTITY, { variables });

  const resource: IResourceEntity = data?.getResources?.hits[0];

  if (!resource && !loading) {
    return <Empty description={intl.get('entities.no_data')} imageType='row' size='large' />;
  }

  return (
    <div>
      <div className={styles.titleHeader}>
        <Link className={styles.titleHeaderLink} href={'/catalog'}>
          <ReadOutlined />
          <div className={styles.titleSeparator}>/</div>
        </Link>
        <Title className={styles.title} level={4}>
          {resource?.rs_name}
        </Title>
      </div>

      <div className={styles.entityPageContainer}>
        <EntityDescriptions
          id={'summary'}
          loading={loading}
          descriptions={getSummaryDescriptions(lang, resource)}
          title={intl.get('global.summary')}
        />
        <EntityDescriptions
          id={'variables'}
          loading={loading}
          descriptions={getVariablesDescriptions(lang, resource)}
          title={intl.get('entities.variable.Variables')}
        />
        <EntityDescriptions
          id={'currentVersion'}
          loading={loading}
          descriptions={getCurrentVersionDescriptions(lang, resource)}
          title={intl.get('global.currentVersion')}
        />
      </div>
    </div>
  );
};

export default EntityResourcePage;
