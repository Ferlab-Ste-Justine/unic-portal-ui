import { gql } from '@apollo/client';

export const GET_RESOURCES_STATS = gql`
  query getResourcesStats {
    getResourcesStats {
      eqp {
        domain_count
        project_count
        source_system_count
        table_count
        variable_count
      }
      research_project {
        domain_count
        project_count
        source_system_count
        table_count
        variable_count
      }
      source_system {
        domain_count
        project_count
        source_system_count
        table_count
        variable_count
      }
      warehouse {
        domain_count
        project_count
        source_system_count
        table_count
        variable_count
      }
    }
  }
`;
