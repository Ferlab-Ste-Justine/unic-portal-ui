import { gql } from '@apollo/client';

export const GET_RESOURCE_ENTITY = gql`
  query getResources(
    $match: [FieldValueType]
    $or: [FieldValueType]
    $from: Int
    $size: Int
    $search_after: [String]
    $sort: [SortOptionType]
  ) {
    getResources(match: $match, or: $or, from: $from, size: $size, search_after: $search_after, sort: $sort) {
      hits {
        rs_type
        rs_title
        rs_last_update
        rs_description_en
        rs_description_fr
        rs_name
        rs_code
        rs_project_erb_id
        rs_is_project
        rs_project_pi
        rs_project_approval_date
        rs_dict_current_version
        stat_etl {
          variable_count
          table_count
        }
        variables {
          var_name
          var_from_source_systems {
            rs_name
            stat_etl {
              variable_count
            }
          }
        }
      }
    }
  }
`;
