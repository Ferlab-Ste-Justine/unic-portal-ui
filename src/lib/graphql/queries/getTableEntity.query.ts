import { gql } from '@apollo/client';

export const GET_TABLE_ENTITY = gql`
  query getResources(
    $match: [FieldValueType]
    $or: [FieldValueType]
    $from: Int
    $size: Int
    $search_after: [String]
    $sort: [SortOptionType]
  ) {
    getTables(match: $match, or: $or, from: $from, size: $size, search_after: $search_after, sort: $sort) {
      hits {
        tab_name
        tab_label_en
        tab_label_fr
        tab_entity_type
        tab_domain
        tab_row_filter
        tab_last_update
        tab_created_at
        stat_etl {
          variable_count
        }
        resource {
          rs_code
          rs_name
        }
      }
    }
  }
`;
