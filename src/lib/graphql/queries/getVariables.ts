import { gql } from '@apollo/client';

export const GET_VARIABLES = gql`
  query getVariables(
    $match: [FieldValueType]
    $or: [FieldValueType]
    $from: Int
    $size: Int
    $search_after: [String]
    $sort: [SortOptionType]
  ) {
    getVariables(match: $match, or: $or, from: $from, size: $size, search_after: $search_after, sort: $sort) {
      total
      search_after
      hits {
        var_id
        var_name
        var_label_en
        var_label_fr
        var_value_type
        var_created_at
        var_last_update
        var_from_source_systems {
          rs_name
          rs_code
          published
        }
        table {
          tab_name
        }
        resource {
          rs_code
          rs_type
          rs_name
        }
      }
    }
    getVariablesResourceTypes
    getVariablesResourceCodes
    getVariablesResourceNames(match: $match, or: $or)
    getVariablesTableNames(match: $match, or: $or)
  }
`;
