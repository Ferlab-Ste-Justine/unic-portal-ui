import { gql } from '@apollo/client';

export const GET_VARIABLES = gql`
  query getVariables(
    $match: [FieldValueType]
    $or: [FieldValueType]
    $orGroups: [[FieldValueType]]
    $from: Int
    $size: Int
    $search_after: [String]
    $sort: [SortOptionType]
  ) {
    getVariables(
      match: $match
      or: $or
      orGroups: $orGroups
      from: $from
      size: $size
      search_after: $search_after
      sort: $sort
    ) {
      total
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
        search_after
      }
    }
    getVariablesResourceTypes(match: $match, orGroups: $orGroups, or: $or)
    getVariablesResourceCodes(match: $match, orGroups: $orGroups, or: $or)
    getVariablesResourceNames(match: $match, orGroups: $orGroups, or: $or)
    getVariablesTableNames(match: $match, orGroups: $orGroups, or: $or)
  }
`;
