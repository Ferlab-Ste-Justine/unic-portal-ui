'use client';

import { ReadOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import Empty from '@ferlab/ui/core/components/Empty/index';
import { Input, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import intl from 'react-intl-universal';

import getHistory from '@/app/variable/[...slug]/utils/getHistory';
import getSummaryDescriptions from '@/app/variable/[...slug]/utils/getSummaryDescriptions';
import EntityCard from '@/components/EntityPage/EntityCard/EntityCard';
import EntityDescriptions from '@/components/EntityPage/EntityDescription/EntityDescriptions';
import EntityDownloadTSVButton from '@/components/EntityPage/EntityDownloadTSVButton';
import { GET_VARIABLE_ENTITY } from '@/lib/graphql/queries/getVariableEntity.query';
import { useLang } from '@/store/global';
import { LANG } from '@/types/constants';
import { IValueType, IVariableEntity } from '@/types/entities';

import styles from './page.module.css';

const MAX_TABLE_HEIGHT = 272;

const EntityVariablePage = () => {
  const [scroll, setScroll] = useState<{ y: number } | undefined>(undefined);
  const [search, setSearch] = useState('');

  const { slug } = useParams() as { slug: string };
  const resourceCode = decodeURIComponent(slug[0]);
  const tabName = decodeURIComponent(slug[1]);
  const varName = decodeURIComponent(slug[2]);
  const lang = useLang();

  const { data, loading } = useQuery(GET_VARIABLE_ENTITY, {
    variables: {
      match: [
        { field: 'resource.rs_code', value: resourceCode },
        { field: 'table.tab_name', value: tabName },
        { field: 'var_name', value: varName },
      ],
      size: 1,
    },
  });

  const tableRef = useCallback((node: any) => {
    const height = node?.clientHeight ?? 0;
    if (height > MAX_TABLE_HEIGHT) {
      setScroll({ y: MAX_TABLE_HEIGHT });
    } else setScroll(undefined);
  }, []);

  const variable: IVariableEntity = data?.getVariables?.hits[0];

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm.length > 2 ? searchTerm : '');
  };

  const onPressEnter = () => {
    handleSearch(search);
  };

  if (!variable && !loading) {
    return <Empty description={intl.get('entities.no_data')} imageType='row' size='large' />;
  }

  const dataSource = variable?.value_set?.values.map((v: IValueType) => ({ ...v, key: v.vsval_code })) || [];

  const onChangeSearch = debounce(handleSearch, 500);

  const filterArray = (arr: IValueType[]) => {
    const lowerCaseSearch = search.toLowerCase();

    return arr.filter((obj) => Object.values(obj).some((value) => value.toLowerCase().includes(lowerCaseSearch)));
  };

  const columns = [
    {
      title: intl.get('entities.value'),
      dataIndex: 'vsval_code',
      key: 'vsval_code',
      label: intl.get('entities.value'),
      width: 360,
    },
    {
      title: intl.get('entities.label'),
      dataIndex: lang === LANG.EN ? 'vsval_label_en' : 'vsval_label_fr',
      label: intl.get('entities.label'),
      key: lang === LANG.EN ? 'vsval_label_en' : 'vsval_label_fr',
    },
  ];

  const filteredData = filterArray(dataSource);

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
        {variable?.value_set?.values?.length > 0 && (
          <EntityCard
            id={'categories'}
            loading={loading}
            title={intl.get('global.categories')}
            extra={
              <EntityDownloadTSVButton
                variableName={variable?.var_name}
                columns={columns}
                data={filteredData}
                disabled={filteredData.length === 0}
              />
            }
          >
            <Input
              placeholder={intl.get('global.research')}
              onChange={(e) => onChangeSearch(e.target.value)}
              onPressEnter={onPressEnter}
              allowClear
              suffix={<SearchOutlined className={styles.icon} />}
            />
            <Table
              className={styles.entityTable}
              ref={tableRef}
              dataSource={filteredData}
              columns={columns}
              bordered
              pagination={false}
              size='small'
              scroll={scroll}
            />
          </EntityCard>
        )}
        <EntityCard id={'history'} loading={loading} title={intl.get('global.history')}>
          <EntityDescriptions descriptions={getHistory(lang, variable)} />
        </EntityCard>
      </div>
    </div>
  );
};

export default EntityVariablePage;
