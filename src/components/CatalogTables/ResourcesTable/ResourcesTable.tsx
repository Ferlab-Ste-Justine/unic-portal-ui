import { useQuery } from '@apollo/client';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useLang } from '@/store/global';
import { useUser } from '@/store/user';
import { updateUserConfig } from '@/store/user/thunks';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_RESOURCES_QUERY_SORT,
  LANG,
} from '@/types/constants';
import { IResourceEntity } from '@/types/entities';
import formatQuerySortList from '@/utils/formatQuerySortList';
import scrollToTop from '@/utils/scrollToTop';

import { GET_RESOURCES } from './getResources.query';
import styles from './ResourcesTable.module.css';

const SCROLL_WRAPPER_ID = 'resources-table-scroll-wrapper';

const ResourcesTable = () => {
  const lang = useLang();
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_RESOURCES_QUERY_SORT,
    size: userInfo?.config?.catalog?.tables?.resources?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });
  const variables = {
    sort: queryConfig.sort,
    size: queryConfig.size,
    searchAfter: queryConfig.searchAfter,
  };
  const { data, loading } = useQuery(GET_RESOURCES, { variables });
  const total = data?.getResources?.total || 0;
  const hits = data?.getResources?.hits?.map((e: IResourceEntity) => ({ ...e, key: e.rs_id })) || [];
  const searchAfter = { tail: data?.getResources?.search_after };

  const getColumns = (): ProColumnType[] => [
    {
      dataIndex: 'rs_name',
      key: 'rs_name',
      title: intl.get('global.name'),
      sorter: { multiple: 1 },
      render: (key: string) => key || '-',
    },
    {
      dataIndex: 'rs_type',
      key: 'rs_type',
      title: intl.get('global.type'),
      sorter: { multiple: 1 },
      render: (key: string) => key || '-',
    },
    {
      dataIndex: 'rs_last_update',
      key: 'rs_last_update',
      title: intl.get('global.updatedAt'),
      sorter: { multiple: 1 },
      render: (key: string) => key || '-',
    },
    {
      dataIndex: 'tables',
      key: 'tables',
      title: intl.get('entities.table.Tables'),
      sorter: { multiple: 1 },
      render: (tables: any[]) => tables?.length || '-',
    },
    {
      dataIndex: 'variables',
      key: 'variables',
      title: intl.get('entities.variable.Variables'),
      sorter: { multiple: 1 },
      render: (variables: any[]) => variables?.length || '-',
    },
    {
      dataIndex: 'rs_description_fr',
      key: 'rs_description_fr',
      title: intl.get('global.description'),
      defaultHidden: lang === LANG.EN,
      render: (key: string) => key || '-',
    },
    {
      dataIndex: 'rs_description_en',
      key: 'rs_description_en',
      title: intl.get('global.description'),
      defaultHidden: lang === LANG.FR,
      render: (key: string) => key || '-',
    },
  ];

  /** first page button reset */
  useEffect(() => {
    if (queryConfig.firstPageFlag || !queryConfig.searchAfter) return;
    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  return (
    <div className={styles.container}>
      <ProTable
        tableId={'resources-table'}
        loading={loading}
        columns={getColumns()}
        dataSource={hits}
        bordered
        pagination={{
          current: pageIndex,
          searchAfter,
          queryConfig,
          setQueryConfig,
          onChange: (page: number) => {
            scrollToTop(SCROLL_WRAPPER_ID);
            setPageIndex(page);
          },
          onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
            dispatch(
              // @ts-expect-error - unknown action
              updateUserConfig({
                catalog: { tables: { resources: { ...userInfo?.config.catalog?.tables?.resources, viewPerQuery } } },
              }),
            );
          },
          defaultViewPerQuery: queryConfig.size,
        }}
        onChange={(_pagination, _filter, sorter) => {
          setPageIndex(DEFAULT_PAGE_INDEX);
          setQueryConfig({
            pageIndex: DEFAULT_PAGE_INDEX,
            size: queryConfig.size,
            sort: formatQuerySortList(sorter) as [],
          });
        }}
        headerConfig={{
          itemCount: {
            pageIndex: pageIndex,
            pageSize: queryConfig.size,
            total: total,
          },
          enableColumnSort: true,
          onColumnSortChange: (newState) =>
            // @ts-expect-error - unknown action
            dispatch(updateUserConfig({ catalog: { tables: { resources: { columns: newState } } } })),
          extra: [
            // <SetsManagementDropdown
            //   results={results}
            //   selectedKeys={selectedKeys}
            //   selectedAllResults={selectedAllResults}
            //   sqon={getCurrentSqon()}
            //   type={SetType.VARIANT}
            //   key="variants-set-management"
            // />,
          ],
        }}
      />
    </div>
  );
};

export default ResourcesTable;
