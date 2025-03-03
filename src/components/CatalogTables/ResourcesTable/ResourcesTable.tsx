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
import { GET_RESOURCES } from '@/lib/graphql/queries/getResources';
import { useLang } from '@/store/global';
import { useUser } from '@/store/user';
import { updateUserConfig } from '@/store/user/thunks';
import { IQueryConfig } from '@/types/constants';
import { IResourceEntity } from '@/types/entities';
import { QueryOptions } from '@/types/queries';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_RESOURCES_FIELD_SORT,
  DEFAULT_RESOURCES_QUERY_SORT,
} from '@/utils/constants';
import formatQuerySortList from '@/utils/formatQuerySortList';
import scrollToTop from '@/utils/scrollToTop';
import { getProTableDictionary, getRSLabelNameByType } from '@/utils/translation';

import getColumns from './getColumns';
import styles from './ResourcesTable.module.css';

const SCROLL_WRAPPER_ID = 'resources-table-scroll-wrapper';

const searchFields = [
  'rs_code',
  'rs_description_en',
  'rs_description_fr',
  'rs_name',
  'rs_project_pi',
  'rs_projet_erb',
  'rs_title',
];

const ResourcesTable = () => {
  const lang = useLang();
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  /** queryConfig use for ProTable */
  const [queryConfig, setQueryConfig] = useState<IQueryConfig>({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_RESOURCES_QUERY_SORT,
    size: userInfo?.config?.catalog?.tables?.resources?.viewPerQuery || DEFAULT_PAGE_SIZE,
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

  const { data, loading } = useQuery(GET_RESOURCES, { variables });
  const total = data?.getResources?.total || 0;
  const hits: IResourceEntity[] = data?.getResources?.hits?.map((e: IResourceEntity) => ({ ...e, key: e.rs_id })) || [];
  const searchAfter = {
    head: queryConfig.operations?.previous
      ? data?.getResources?.search_after
      : [hits[0]?.[DEFAULT_RESOURCES_FIELD_SORT]?.toString()],
    tail: queryConfig.operations?.previous
      ? [hits[0]?.[DEFAULT_RESOURCES_FIELD_SORT]?.toString()]
      : data?.getResources?.search_after,
  };
  const dataSource = queryConfig.operations?.previous ? hits.reverse() : hits;

  const [rsTypeOptions, setRsTypeOptions] = useState<SelectProps['options']>();

  const handleFilterBy = () => {
    //TODO Do it for UNICWEB-41
  };

  const hasFilter = !!variables.orGroups?.length || !!variables.match?.length || !!variables.or?.length;
  const handleClearFilters = () => {
    setVariables(initialVariables);
  };

  useEffect(() => {
    if (!loading) {
      setRsTypeOptions(
        data?.getResourcesType
          ?.map((rs_type: string) => ({
            value: rs_type,
            label: getRSLabelNameByType(rs_type),
          }))
          ?.sort((a: OptionProps, b: OptionProps) => a.label.localeCompare(b.label)),
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
          title={intl.get('entities.resource.Resource')}
          placeholder={intl.get('entities.resource.filterBy')}
        />
        <InputSelect
          operator={'orGroups'}
          mode={'multiple'}
          options={rsTypeOptions}
          selectField='rs_type'
          title={intl.get('entities.resource.typeOf')}
          placeholder={intl.get('global.select')}
          handleSetVariables={handleSetVariables}
          variables={variables}
          showSearch={false}
        />
      </div>
      <ProTable
        tableId={'resources-table'}
        loading={loading}
        columns={getColumns(lang, handleFilterBy)}
        dataSource={dataSource}
        bordered
        initialColumnState={userInfo?.config.catalog?.tables?.resources?.columns}
        dictionary={getProTableDictionary()}
        showSorterTooltip={false}
        size={'small'}
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
            dispatch(updateUserConfig({ catalog: { tables: { resources: { columns: newState } } } })),
        }}
      />
    </div>
  );
};

export default ResourcesTable;
