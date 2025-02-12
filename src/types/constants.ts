export enum LANG {
  EN = 'en',
  FR = 'fr',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface ISort {
  field: string;
  order: SortDirection;
}

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
  size: number;
}
