import { SorterResult } from 'antd/lib/table/interface';

import { ISort, SortDirection } from '@/types/constants';

export const getOrderFromAntdValue = (order: string): SortDirection =>
  order === 'ascend' ? SortDirection.Asc : SortDirection.Desc;

export const formatQuerySortList = (sorter: SorterResult<any> | SorterResult<any>[], defaultSort: ISort[]): ISort[] =>
  Object.keys(sorter).length === 0
    ? defaultSort
    : [sorter].flat().map((sorter) => {
        if (!sorter?.order) return defaultSort[0];
        return {
          field: sorter.columnKey as string,
          order: getOrderFromAntdValue(sorter.order || 'ascend'),
        };
      });

export default formatQuerySortList;
