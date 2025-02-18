import { useQuery } from '@apollo/client';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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
import { getProTableDictionary } from '@/utils/translation';

import getColumns from './getColumns';

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
  const variables: QueryOptions = {
    sort: queryConfig.sort,
    size: queryConfig.size,
    search_after: queryConfig.searchAfter,
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

  useEffect(() => {
    if (queryConfig.firstPageFlag || !queryConfig.searchAfter) return;
    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  return (
    <ProTable
      tableId={'variables-table'}
      loading={loading}
      columns={getColumns(lang)}
      dataSource={dataSource}
      bordered
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
  );
};

export default VariablesTable;
