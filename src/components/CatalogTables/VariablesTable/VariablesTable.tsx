import { useQuery } from '@apollo/client';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { SelectProps } from 'antd';
import { OptionProps } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import InputSelect from '@/components/CatalogTables/InputSelect';
import { GET_VARIABLES } from '@/lib/graphql/queries/getVariables';
import { useLang } from '@/store/global';
import { useUser } from '@/store/user';
import { updateUserConfig } from '@/store/user/thunks';
import { IQueryConfig } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_VARIABLES_FIELD_SORT,
  DEFAULT_VARIABLES_QUERY_SORT,
} from '@/utils/constants';
import formatQuerySortList from '@/utils/formatQuerySortList';
import scrollToTop from '@/utils/scrollToTop';
import { getProTableDictionary, getRSLabelNameByType } from '@/utils/translation';

import getColumns from './getColumns';
import styles from './VariablesTable.module.css';

const SCROLL_WRAPPER_ID = 'variables-table-scroll-wrapper';

const VariablesTable = () => {
  const lang = useLang();
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  /** queryConfig use for ProTable */
  const [queryConfig, setQueryConfig] = useState<IQueryConfig>({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_VARIABLES_QUERY_SORT,
    size: userInfo?.config?.catalog?.tables?.variables?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });

  /** variables use for Query */
  const initialVariables: QueryOptions = {
    sort: queryConfig.sort,
    size: queryConfig.size,
    search_after: queryConfig.searchAfter,
  };

  const [variables, setVariables] = useState<QueryOptions>(initialVariables);
  const handleSetVariables = (newVariables: QueryOptions) => {
    setVariables({ ...variables, ...newVariables });
  };

  const { data, loading } = useQuery(GET_VARIABLES, { variables });
  const total = data?.getVariables?.total || 0;
  const hits: IVariableEntity[] =
    data?.getVariables?.hits?.map((e: IVariableEntity) => ({ ...e, key: e.var_id })) || [];
  const searchAfter = {
    head: queryConfig.operations?.previous
      ? data?.getVariables?.search_after
      : [hits[0]?.[DEFAULT_VARIABLES_FIELD_SORT]?.toString()],
    tail: queryConfig.operations?.previous
      ? [hits[0]?.[DEFAULT_VARIABLES_FIELD_SORT]?.toString()]
      : data?.getVariables?.search_after,
  };
  const dataSource = queryConfig.operations?.previous ? hits.reverse() : hits;

  const [rsTypeOptions, setRsTypeOptions] = useState<SelectProps['options']>();
  const [rsCodeOptions, setRsCodeOptions] = useState<SelectProps['options']>();
  const [rsNameOptions, setRsNameOptions] = useState<SelectProps['options']>();
  const [tabNameOptions, setTabNameOptions] = useState<SelectProps['options']>();

  //TODO adjusted it for UNICWEB-36
  const hasFilter = !!variables.orGroups?.length || !!variables.match?.length;
  const handleClearFilters = () => {
    setVariables(initialVariables);
  };

  useEffect(() => {
    if (!loading) {
      setRsTypeOptions(
        data?.getVariablesResourceTypes
          ?.map((value: string) => ({
            value: value,
            label: getRSLabelNameByType(value),
          }))
          ?.sort((a: OptionProps, b: OptionProps) => a.label.localeCompare(b.label)),
      );
      setRsCodeOptions(
        data?.getVariablesResourceCodes?.map((value: string) => ({
          value: value,
          label: value,
        })),
      );
      setRsNameOptions(
        data?.getVariablesResourceNames?.map((value: string) => ({
          value,
          label: value,
        })),
      );
      setTabNameOptions(
        data?.getVariablesTableNames?.map((value: string) => ({
          value,
          label: value,
        })),
      );
    }
  }, [
    data?.getVariablesResourceCodes,
    data?.getVariablesResourceNames,
    data?.getVariablesResourceTypes,
    data?.getVariablesTableNames,
    loading,
  ]);

  useEffect(() => {
    if (queryConfig.firstPageFlag || !queryConfig.searchAfter) return;
    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

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
          options={tabNameOptions}
          selectField='table.tab_name'
          title={intl.get('entities.table.Table')}
          placeholder={intl.get('entities.table.filterBy')}
          handleSetVariables={handleSetVariables}
          variables={variables}
        />
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
          mode={'multiple'}
          options={rsTypeOptions}
          selectField='resource.rs_type'
          title={intl.get('entities.resource.typeOf')}
          placeholder={intl.get('global.select')}
          handleSetVariables={handleSetVariables}
          variables={variables}
          showSearch={false}
        />
        <InputSelect
          operator={'orGroups'}
          mode={'multiple'}
          options={rsCodeOptions}
          selectField='resource.rs_code'
          title={intl.get('entities.source')}
          placeholder={intl.get('global.select')}
          handleSetVariables={handleSetVariables}
          variables={variables}
          showSearch={true}
        />
      </div>
      <ProTable
        tableId={'variables-table'}
        loading={loading}
        columns={getColumns(lang)}
        dataSource={dataSource}
        bordered
        size={'small'}
        initialColumnState={userInfo?.config.catalog?.tables?.variables?.columns}
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
                catalog: { tables: { variables: { ...userInfo?.config.catalog?.tables?.variables, viewPerQuery } } },
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
          hasFilter,
          clearFilter: handleClearFilters,
          itemCount: {
            pageIndex: pageIndex,
            pageSize: queryConfig.size,
            total: total,
          },
          enableColumnSort: true,
          onColumnSortChange: (newState) =>
            // @ts-expect-error - unknown action
            dispatch(updateUserConfig({ catalog: { tables: { variables: { columns: newState } } } })),
        }}
      />
    </div>
  );
};

export default VariablesTable;
