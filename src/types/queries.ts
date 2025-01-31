export type MatchOption = {
  field: string;
  value: string | number;
  useWildcard?: boolean; // Enable wildcard search
  useFuzzy?: boolean; // Enable fuzzy search
};

export type OrOption = {
  field: string;
  value: string | number;
};

export type SortOption = {
  field: string;
  order: 'asc' | 'desc';
};

/** More options types allowed by API, but we only show necessary options here */
export type QueryOptions = {
  match?: MatchOption[];
  or?: OrOption[];
  sort?: SortOption[];
  from?: number; // Only used if `search_after` is not set
  size?: number;
  search_after?: any[]; // Add `search_after` support
};
