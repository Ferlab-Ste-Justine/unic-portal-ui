import { IQueryConfig, ISort, SortDirection } from '@/types/constants';

export const DEFAULT_OFFSET = 0;
export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const TABLE_EMPTY_PLACE_HOLDER = '-';

export const DEFAULT_RESOURCES_QUERY_SORT = [{ field: 'rs_id', order: SortDirection.Asc }] as ISort[];

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  sort: [],
  searchAfter: undefined,
  firstPageFlag: undefined,
  operations: undefined,
};
