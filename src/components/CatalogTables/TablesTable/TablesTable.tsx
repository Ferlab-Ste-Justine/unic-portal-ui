import { useQuery } from '@apollo/client';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { SelectProps } from 'antd';
import { OptionProps } from 'antd/lib/select';
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

  /** queryConfig use for ProTable */
  const [queryConfig, setQueryConfig] = useState<IQueryConfig>({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_TABLES_QUERY_SORT,
    size: userInfo?.config?.catalog?.tables?.tables?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });

  /** variables use for Query */
  const initialVariables: QueryOptions = {
    sort: queryConfig.sort,
    size: queryConfig.size,
    search_after: queryConfig.searchAfter,
  };

  const [variables, setVariables] = useState<QueryOptions>(initialVariables);
  const handleSetVariables = (newVariables: QueryOptions) => {
    setVariables((v) => ({
      ...v,
      ...newVariables,
    }));
    /** reset pagination on filters changes */
    setQueryConfig((q) => ({
      ...q,
      searchAfter: undefined,
      pageIndex: DEFAULT_PAGE_INDEX,
    }));
  };

  const { data, loading } = useQuery(GET_TABLES, { variables });
  const total = data?.getTables?.total || 0;
  const hits: ITableEntity[] = data?.getTables?.hits?.map((e: ITableEntity) => ({ ...e, key: e.tab_id })) || [];
  const head = queryConfig.operations?.previous ? hits[hits.length - 1]?.search_after : hits[0]?.search_after;
  const tail = queryConfig.operations?.previous ? hits[0]?.search_after : hits[hits.length - 1]?.search_after;
  const searchAfter = { head, tail };
  const dataSource = queryConfig.operations?.previous ? hits.reverse() : hits;

  const [rsTypeOptions, setRsTypeOptions] = useState<SelectProps['options']>();
  const [rsNameOptions, setRsNameOptions] = useState<SelectProps['options']>();

  //TODO adjusted it for UNICWEB-36
  const hasFilter = !!variables.orGroups?.length || !!variables.match?.length;
  const handleClearFilters = () => {
    setVariables(initialVariables);
    /** reset pagination on filters changes */
    setQueryConfig((q) => ({
      ...q,
      searchAfter: undefined,
      pageIndex: DEFAULT_PAGE_INDEX,
    }));
  };

  useEffect(() => {
    if (!loading) {
      setRsNameOptions(
        data?.getTablesResourceNames?.map((value: string) => ({
          value,
          label: value,
        })),
      );
      setRsTypeOptions(
        data?.getTablesResourceTypes
          ?.map((value: string) => ({
            value,
            label: getRSLabelNameByType(value),
          }))
          ?.sort((a: OptionProps, b: OptionProps) => a.label.localeCompare(b.label)),
      );
    }
  }, [data?.getTablesResourceNames, data?.getTablesResourceTypes, loading, lang]);

  useEffect(() => {
    setVariables((v) => ({
      ...v,
      sort: queryConfig.sort,
      size: queryConfig.size,
      search_after: queryConfig.searchAfter,
    }));
  }, [queryConfig.sort, queryConfig.size, queryConfig.searchAfter]);

  return (
    <div className={styles.container}>
      <div className={styles.filtersRow}>
        <InputSelect
          operator={'match'}
          options={rsNameOptions}
          selectField='resource.rs_name'
          title={intl.get('entities.resource.Resource')}
          placeholder={intl.get('entities.resource.filterBy')}
          handleSetVariables={handleSetVariables}
          variables={variables}
        />
        <InputSelect
          operator={'orGroups'}
          mode={'tags'}
          options={rsTypeOptions}
          selectField='resource.rs_type'
          title={intl.get('entities.resource.typeOf')}
          placeholder={intl.get('global.select')}
          handleSetVariables={handleSetVariables}
          variables={variables}
          showSearch={false}
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
        size={'small'}
        pagination={{
          current: queryConfig.pageIndex,
          searchAfter,
          queryConfig,
          setQueryConfig,
          onChange: (page: number) => {
            scrollToTop(SCROLL_WRAPPER_ID);
            setQueryConfig((q) => ({
              ...q,
              pageIndex: page,
              sort: page === 1 ? DEFAULT_TABLES_QUERY_SORT : q.sort,
              searchAfter: page === 1 ? undefined : q.searchAfter,
              operations: page === 1 ? undefined : q.operations,
            }));
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
          setQueryConfig({
            pageIndex: DEFAULT_PAGE_INDEX,
            size: queryConfig.size,
            sort: formatQuerySortList(sorter, DEFAULT_TABLES_QUERY_SORT),
          });
        }}
        headerConfig={{
          hasFilter,
          clearFilter: handleClearFilters,
          itemCount: {
            pageIndex: queryConfig.pageIndex,
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
