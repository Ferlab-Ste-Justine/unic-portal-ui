import { gql } from '@apollo/client';

export const GET_TABLES = gql`
  query getTables(
    $match: [FieldValueType]
    $orGroups: [[FieldValueType]]
    $from: Int
    $size: Int
    $search_after: [String]
    $sort: [SortOptionType]
  ) {
    getTables(match: $match, orGroups: $orGroups, from: $from, size: $size, search_after: $search_after, sort: $sort) {
      total
      hits {
        tab_id
        tab_name
        tab_label_en
        tab_label_fr
        resource {
          rs_code
          rs_name
          rs_type
        }
        tab_entity_type
        tab_domain
        stat_etl {
          variable_count
        }
        tab_created_at
        tab_last_update
        search_after
      }
    }
    getTablesResourceTypes(match: $match, orGroups: $orGroups)
    getTablesResourceNames(match: $match, orGroups: $orGroups)
  }
`;
