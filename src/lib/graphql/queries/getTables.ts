import { gql } from '@apollo/client';

export const GET_TABLES = gql`
  query getTables(
    $match: [FieldValueType]
    $or: [FieldValueType]
    $from: Int
    $size: Int
    $search_after: [String]
    $sort: [SortOptionType]
  ) {
    getTables(match: $match, or: $or, from: $from, size: $size, search_after: $search_after, sort: $sort) {
      total
      search_after
      hits {
        tab_id
        tab_name
        tab_label_en
        tab_label_fr
        resource {
          rs_code
        }
        tab_entity_type
        tab_domain
        stat_etl {
          variable_count
        }
        tab_created_at
        tab_last_update
      }
    }
  }
`;
