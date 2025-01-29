import { gql } from '@apollo/client';

export const GET_RESOURCES = gql`
  query getResources(
    $match: [FieldValueType]
    $or: [FieldValueType]
    $from: Int
    $size: Int
    $searchAfter: [String]
    $sort: [SortOptionType]
  ) {
    getResources(match: $match, or: $or, from: $from, size: $size, search_after: $searchAfter, sort: $sort) {
      total
      search_after
      hits {
        rs_id
        rs_type
        rs_last_update
        rs_description_en
        rs_description_fr
        rs_name
        rs_code
        rs_is_project
        variables {
          var_id
        }
        tables {
          tab_id
        }
      }
    }
  }
`;
