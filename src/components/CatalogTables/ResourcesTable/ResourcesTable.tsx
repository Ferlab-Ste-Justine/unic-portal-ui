import { useQuery } from '@apollo/client';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
// import { SelectProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { GET_RESOURCES } from '@/lib/graphql/queries/getResources';
// uncomment and test for UNICWEB-40
// import FiltersTable from '@/components/CatalogTables/FiltersTable';
import { useLang } from '@/store/global';
import { useUser } from '@/store/user';
import { updateUserConfig } from '@/store/user/thunks';
import { IResourceEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_RESOURCES_QUERY_SORT,
} from '@/utils/constants';
import formatQuerySortList from '@/utils/formatQuerySortList';
import scrollToTop from '@/utils/scrollToTop';

import getColumns from './getColumns';
import styles from './ResourcesTable.module.css';

const SCROLL_WRAPPER_ID = 'resources-table-scroll-wrapper';

// uncomment and test for UNICWEB-40
// const search_fields = [
//   'rs_code',
//   'rs_description_en',
//   'rs_description_fr',
//   'rs_name',
//   'rs_project_pi',
//   'rs_projet_erb',
//   'rs_title',
// ];

const ResourcesTable = () => {
  const lang = useLang();
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  /** queryConfig use for ProTable */
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_RESOURCES_QUERY_SORT,
    size: userInfo?.config?.catalog?.tables?.resources?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });

  /** variables use for Query */
  const variables: QueryOptions = {
    sort: queryConfig.sort,
    size: queryConfig.size,
    search_after: queryConfig.searchAfter,
  };
  // uncomment for UNICWEB-40
  // const { data, loading, refetch } = useQuery(GET_RESOURCES, { variables });
  const { data, loading } = useQuery(GET_RESOURCES, { variables });
  const total = data?.getResources?.total || 0;
  const hits: IResourceEntity[] = data?.getResources?.hits?.map((e: IResourceEntity) => ({ ...e, key: e.rs_id })) || [];
  const searchAfter = { tail: data?.getResources?.search_after };
  // uncomment for UNICWEB-40
  // const rs_types_options: SelectProps['options'] = data?.getResourcesType?.map((value: string) => ({
  //   value,
  //   label: value,
  // }));

  // console.log('hits==', hits);

  const handleFilterBy = () => {
    //TODO Do it for UNICWEB-40
  };

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
      {/*// uncomment for UNICWEB-40*/}
      {/*<FiltersTable*/}
      {/*  options={rs_types_options}*/}
      {/*  search_fields={search_fields}*/}
      {/*  refetch={refetch}*/}
      {/*  variables={variables}*/}
      {/*  selectField='rs_type'*/}
      {/*/>*/}
      <ProTable
        key={Math.random()} //Force the re-render with random key each render to display conditionally rs_description_fr and rs_description_en
        tableId={'resources-table'}
        loading={loading}
        columns={getColumns(lang, handleFilterBy)}
        dataSource={hits}
        bordered
        initialColumnState={userInfo?.config.catalog?.tables?.resources?.columns}
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
        }}
      />
    </div>
  );
};

export default ResourcesTable;
