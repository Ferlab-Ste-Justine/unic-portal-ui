import { useQuery } from '@apollo/client';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { SelectProps } from 'antd';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import InputSelect from '@/components/CatalogTables/InputSelect';
import styles from '@/components/CatalogTables/ResourcesTable/ResourcesTable.module.css';
import { GET_TABLES } from '@/lib/graphql/queries/getTables';
import { useLang } from '@/store/global';
import { useUser } from '@/store/user';
import { updateUserConfig } from '@/store/user/thunks';
import { IQueryConfig } from '@/types/constants';
import { ITableEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_TABLES_FIELD_SORT,
  DEFAULT_TABLES_QUERY_SORT,
} from '@/utils/constants';
import formatQuerySortList from '@/utils/formatQuerySortList';
import scrollToTop from '@/utils/scrollToTop';
import { getProTableDictionary, getRSLabelNameByType } from '@/utils/translation';

import getColumns from './getColumns';

const SCROLL_WRAPPER_ID = 'tables-table-scroll-wrapper';

const TablesTable = () => {
  const lang = useLang();
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  /** queryConfig use for ProTable */
  const [queryConfig, setQueryConfig] = useState<IQueryConfig>({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_TABLES_QUERY_SORT,
    size: userInfo?.config?.catalog?.tables?.tables?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });

  /** variables use for Query */
  const _variables: QueryOptions = {
    sort: queryConfig.sort,
    size: queryConfig.size,
    search_after: queryConfig.searchAfter,
  };

  const [variables, setVariables] = useState<QueryOptions>(_variables);
  const handleSetVariables = (newVariables: QueryOptions) => {
    setVariables({ ...variables, ...newVariables });
  };

  const { data, loading } = useQuery(GET_TABLES, { variables });
  const total = data?.getTables?.total || 0;
  const hits: ITableEntity[] = data?.getTables?.hits?.map((e: ITableEntity) => ({ ...e, key: e.tab_id })) || [];
  const searchAfter = {
    head: queryConfig.operations?.previous
      ? data?.getTables?.search_after
      : [hits[0]?.[DEFAULT_TABLES_FIELD_SORT]?.toString()],
    tail: queryConfig.operations?.previous
      ? [hits[0]?.[DEFAULT_TABLES_FIELD_SORT]?.toString()]
      : data?.getTables?.search_after,
  };
  const dataSource = queryConfig.operations?.previous ? hits.reverse() : hits;

  const rs_type_options: SelectProps['options'] = data?.getResourcesType?.map((rs_type: string) => ({
    value: rs_type,
    label: getRSLabelNameByType(rs_type),
  }));
  const [rsTypeOptions, setRsTypeOptions] = useState(rs_type_options);

  useEffect(() => {
    if (!loading) {
      setRsTypeOptions(
        data?.getResourcesType?.map((rs_type: string) => ({
          value: rs_type,
          label: getRSLabelNameByType(rs_type),
        })),
      );
    }
  }, [data?.getResourcesType, loading]);

  useEffect(() => {
    if (queryConfig.firstPageFlag || !queryConfig.searchAfter) return;
    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  return (
    <div className={styles.container}>
      <div className={styles.filtersRow}>
        {/*//TODO: ADD InputSearch here for UNICWEB-36*/}
        <InputSelect
          options={rsTypeOptions}
          selectField='rs_type'
          title={intl.get('screen.catalog.resources.select')}
          placeholder={intl.get('screen.catalog.selectPlaceholder')}
          handleSetVariables={handleSetVariables}
        />
      </div>
      <ProTable
        tableId={'tables-table'}
        loading={loading}
        columns={getColumns(lang)}
        dataSource={dataSource}
        bordered
        initialColumnState={userInfo?.config.catalog?.tables?.tables?.columns}
        dictionary={getProTableDictionary()}
        showSorterTooltip={false}
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
                catalog: { tables: { tables: { ...userInfo?.config.catalog?.tables?.tables, viewPerQuery } } },
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
            sort: formatQuerySortList(sorter),
          } as IQueryConfig);
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
            dispatch(updateUserConfig({ catalog: { tables: { tables: { columns: newState } } } })),
        }}
      />
    </div>
  );
};

export default TablesTable;
