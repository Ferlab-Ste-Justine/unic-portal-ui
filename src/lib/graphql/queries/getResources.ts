import { gql } from '@apollo/client';

export const GET_RESOURCES = gql`
  query getResources(
    $match: [FieldValueType]
    $orGroups: [[FieldValueType]]
    $from: Int
    $size: Int
    $search_after: [String]
    $sort: [SortOptionType]
  ) {
    getResources(
      match: $match
      orGroups: $orGroups
      from: $from
      size: $size
      search_after: $search_after
      sort: $sort
    ) {
      total
      hits {
        rs_id
        rs_type
        rs_last_update
        rs_description_en
        rs_description_fr
        rs_name
        rs_code
        rs_is_project
        rs_project_creation_date
        rs_project_approval_date
        rs_system_collection_starting_year
        rs_dict_current_version
        rs_project_erb_id
        rs_project_pi
        variables {
          var_id
        }
        tables {
          tab_id
        }
        search_after
      }
    }
    getResourcesType
  }
`;
