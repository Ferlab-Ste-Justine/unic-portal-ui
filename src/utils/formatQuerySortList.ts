import { SorterResult } from 'antd/lib/table/interface';

import { ISort, SortDirection } from '@/types/constants';

export const getOrderFromAntdValue = (order: string): SortDirection =>
  order === 'ascend' ? SortDirection.Asc : SortDirection.Desc;

export const formatQuerySortList = (sorter: SorterResult<any> | SorterResult<any>[], defaultSort: ISort[]): ISort[] => {
  const _sorter = Array.isArray(sorter) ? sorter : [sorter];
  if (!_sorter?.length) {
    return defaultSort;
  }

  const newSorter: ISort[] = _sorter
    .map((sort) => {
      if (!sort?.order) return undefined;
      return {
        field: sort.columnKey as string,
        order: getOrderFromAntdValue(sort.order || 'ascend'),
      };
    })
    .filter((s) => s !== undefined);

  //add default sort if not present in sorter
  defaultSort.forEach((sort) => {
    if (!newSorter.some((s) => s.field === sort.field)) {
      newSorter.push(sort);
    }
  });

  return newSorter;
};

export default formatQuerySortList;
