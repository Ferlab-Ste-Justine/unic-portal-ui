import { gql } from '@apollo/client';

export const GET_VARIABLE_ENTITY = gql`
  query getVariableEntity(
    $match: [FieldValueType]
    $or: [FieldValueType]
    $from: Int
    $size: Int
    $search_after: [String]
    $sort: [SortOptionType]
  ) {
    getVariables(match: $match, or: $or, from: $from, size: $size, search_after: $search_after, sort: $sort) {
      hits {
        var_name
        var_value_type
        var_derivation_algorithm
        var_notes
        var_label_fr
        var_label_en
        var_created_at
        var_last_update
        resource {
          rs_name
          rs_code
        }
        table {
          tab_name
        }
        value_set {
          values {
            vsval_code
            vsval_label_en
            vsval_label_fr
          }
        }
        var_from_variables {
          var_id
          var_name
          resource {
            rs_code
            rs_name
          }
          table {
            tab_name
          }
        }
      }
    }
  }
`;
