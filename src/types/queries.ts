export type FieldValueType = {
  field: string;
  value: string | number | boolean;
  useWildcard?: boolean; // Enable wildcard search
  useFuzzy?: boolean; // Enable fuzzy search
};

export type OrGroups = FieldValueType[];

export type SortOption = {
  field: string;
  order: 'asc' | 'desc';
};

/** More options types allowed by API, but we only show necessary options here */
export type QueryOptions = {
  term?: FieldValueType[];
  match?: FieldValueType[];
  or?: FieldValueType[];
  orGroups?: OrGroups[];
  sort?: SortOption[];
  from?: number; // Only used if `search_after` is not set
  size?: number;
  search_after?: any[]; // Add `search_after` support
};
