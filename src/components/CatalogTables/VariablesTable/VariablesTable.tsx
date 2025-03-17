import { useQuery } from '@apollo/client';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { SelectProps } from 'antd';
import { OptionProps } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import InputSearch from '@/components/CatalogTables/InputSearch';
import InputSelect from '@/components/CatalogTables/InputSelect';
import DownloadTSVButton from '@/components/DownloadTSVButton';
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
  DEFAULT_VARIABLES_QUERY_SORT,
} from '@/utils/constants';
import formatQuerySortList from '@/utils/formatQuerySortList';
import scrollToTop from '@/utils/scrollToTop';
import { getProTableDictionary, getRSLabelNameByType } from '@/utils/translation';

import getColumns from './getColumns';
import styles from './VariablesTable.module.css';

const SCROLL_WRAPPER_ID = 'variables-table-scroll-wrapper';

const searchFields = ['var_label_en', 'var_label_fr', 'var_name'];

const VariablesTable = () => {
  const lang = useLang();
  const { userInfo } = useUser();
  const dispatch = useDispatch();

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

  const { data, loading } = useQuery(GET_VARIABLES, { variables });
  const total = data?.getVariables?.total || 0;
  const hits: IVariableEntity[] =
    data?.getVariables?.hits?.map((e: IVariableEntity) => ({ ...e, key: e.var_id })) || [];
  const head = queryConfig.operations?.previous ? hits[hits.length - 1]?.search_after : hits[0]?.search_after;
  const tail = queryConfig.operations?.previous ? hits[0]?.search_after : hits[hits.length - 1]?.search_after;
  const searchAfter = { head, tail };
  const dataSource = queryConfig.operations?.previous ? hits.reverse() : hits;

  const [rsTypeOptions, setRsTypeOptions] = useState<SelectProps['options']>();
  const [rsCodeOptions, setRsCodeOptions] = useState<SelectProps['options']>();
  const [rsNameOptions, setRsNameOptions] = useState<SelectProps['options']>();
  const [tabNameOptions, setTabNameOptions] = useState<SelectProps['options']>();

  const hasFilter = !!variables.orGroups?.length || !!variables.match?.length || !!variables.or?.length;
  const handleClearFilters = () => {
    setVariables(initialVariables);
    /** reset pagination on filters changes */
    setQueryConfig((q) => ({
      ...q,
      searchAfter: undefined,
      pageIndex: DEFAULT_PAGE_INDEX,
    }));
  };

  const userColumns = userInfo?.config.catalog?.tables?.variables?.columns || [];
  const columns = getColumns(lang);

  useEffect(() => {
    if (!loading) {
      setTabNameOptions(
        data?.getVariablesTableNames?.map((value: string) => ({
          value,
          label: value,
        })),
      );
      setRsNameOptions(
        data?.getVariablesResourceNames?.map((value: string) => ({
          value,
          label: value,
        })),
      );
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
    }
  }, [
    data?.getVariablesResourceCodes,
    data?.getVariablesResourceNames,
    data?.getVariablesResourceTypes,
    data?.getVariablesTableNames,
    loading,
    lang,
  ]);

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
        <InputSearch
          searchFields={searchFields}
          handleSetVariables={handleSetVariables}
          variables={variables}
          title={intl.get('entities.variable.Variable')}
          placeholder={intl.get('entities.variable.filterBy')}
        />
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
          mode={'tags'}
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
          selectField='var_from_source_systems.rs_code'
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
        columns={columns}
        dataSource={dataSource}
        bordered
        size={'small'}
        initialColumnState={userColumns}
        dictionary={getProTableDictionary()}
        showSorterTooltip={false}
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
              firstPageFlag: q.firstPageFlag || queryConfig.searchAfter,
            }));
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
          setQueryConfig({
            pageIndex: DEFAULT_PAGE_INDEX,
            size: queryConfig.size,
            sort: formatQuerySortList(sorter, DEFAULT_VARIABLES_QUERY_SORT),
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
            dispatch(updateUserConfig({ catalog: { tables: { variables: { columns: newState } } } })),
          extra: [
            <DownloadTSVButton
              key={'download-variables'}
              tableName={'variables'}
              variables={variables}
              query={GET_VARIABLES}
              userColumns={userColumns}
              columns={columns}
            />,
          ],
        }}
      />
    </div>
  );
};

export default VariablesTable;
