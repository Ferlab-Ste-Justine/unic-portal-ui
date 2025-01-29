export enum LANG {
  EN = 'en',
  FR = 'fr',
}

export const DEFAULT_OFFSET = 0;
export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface ISort {
  field: string;
  order: SortDirection;
}

export const DEFAULT_RESOURCES_QUERY_SORT = [{ field: 'rs_id', order: SortDirection.Asc }] as ISort[];

export interface IQueryOperationsConfig {
  previous?: boolean;
  next?: boolean;
}

export interface IQueryConfig {
  pageIndex: number;
  sort: ISort[];
  searchAfter?: any[];
  firstPageFlag?: any[];
  operations?: IQueryOperationsConfig;
}

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  sort: [],
  searchAfter: undefined,
  firstPageFlag: undefined,
  operations: undefined,
};
