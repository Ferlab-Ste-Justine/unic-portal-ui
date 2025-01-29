import { SorterResult } from 'antd/lib/table/interface';

export type TSortDirection = 'asc' | 'desc';

export const getOrderFromAntdValue = (order: string): TSortDirection => (order === 'ascend' ? 'asc' : 'desc');

export const formatQuerySortList = (sorter: SorterResult<any> | SorterResult<any>[]) =>
  Object.keys(sorter).length === 0
    ? []
    : [sorter].flat().map((sorter) => ({
        field: sorter.columnKey as string,
        order: getOrderFromAntdValue(sorter.order!),
      }));

export default formatQuerySortList;
