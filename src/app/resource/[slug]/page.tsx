'use client';

import { ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import Empty from '@ferlab/ui/core/components/Empty/index';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import intl from 'react-intl-universal';

import SummaryContent from '@/app/resource/[slug]/SummaryContent/SummaryContent';
import getCurrentVersionDescriptions from '@/app/resource/[slug]/utils/getCurrentVersionDescriptions';
import getVariablesDescriptions from '@/app/resource/[slug]/utils/getVariablesDescriptions';
import EntityCard from '@/components/EntityPage/EntityCard';
import EntityCardSummary from '@/components/EntityPage/EntityCardSummary/EntityCardSummary';
import EntityDescriptions from '@/components/EntityPage/EntityDescription/EntityDescriptions';
import { GET_RESOURCE_ENTITY } from '@/lib/graphql/queries/getResourceEntity.query';
import { useLang } from '@/store/global';
import { IResourceEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';
import getTagColorByType from '@/utils/getTagColorByType';
import { getRSLabelNameByType } from '@/utils/translation';

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
        <div className={styles.summaryContentContainer}>
          <GridCard
            id={'summary'}
            loading={loading}
            style={{ padding: 24 }}
            content={
              <EntityCardSummary
                type={resource?.rs_type}
                name={<div>{resource?.rs_name}</div>}
                content={SummaryContent(resource)}
                extraTag={
                  <Tag color={getTagColorByType(resource?.rs_type)}>{getRSLabelNameByType(resource?.rs_type)}</Tag>
                }
              />
            }
          />
        </div>
        <EntityCard id={'variables'} loading={loading} title={intl.get('entities.variable.Variables')}>
          <EntityDescriptions descriptions={getVariablesDescriptions(lang, resource)} />
        </EntityCard>
        <EntityCard id={'currentVersion'} loading={loading} title={intl.get('global.currentVersion')}>
          <EntityDescriptions descriptions={getCurrentVersionDescriptions(lang, resource)} />
        </EntityCard>
      </div>
    </div>
  );
};

export default EntityResourcePage;
