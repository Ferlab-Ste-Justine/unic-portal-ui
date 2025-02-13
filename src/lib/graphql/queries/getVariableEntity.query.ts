import { gql } from '@apollo/client';

export const GET_VARIABLE_ENTITY = gql`
  query getVariables(
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
        resource {
          rs_name
          rs_code
        }
        table {
          tab_name
        }
      }
    }
  }
`;
