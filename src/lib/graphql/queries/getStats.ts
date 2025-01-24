import { gql } from '@apollo/client';

export const GET_RESOURCES_STATS = gql`
  query getResourcesStats($from: Int, $limit: Int, $sort: String, $order: String, $filterBy: [FilterByType]) {
    getResources(from: $from, limit: $limit, sortBy: $sort, orderBy: $order, filterBy: $filterBy) {
      total
      hits {
        rs_code
        rs_id
        stat_etl {
          domain_count
          project_count
          source_system_count
          table_count
          variable_count
        }
      }
    }
  }
`;
