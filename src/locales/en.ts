/* eslint-disable max-len */
const en = {
  entities: {
    project: {
      project_id: 'Project ID',
      project: 'project',
      projects: 'projects',
      Projects: 'Projects',
    },
    source_system: {
      source_system_id: 'Hospital System ID',
      source_system: 'hospital system',
      source_systems: 'hospital systems',
      Source_system: 'Hospital System',
      Source_systems: 'Hospital Systems',
      systems: 'systems',
    },
    variable: {
      variable_id: 'Variable ID',
      variable: 'variable',
      variables: 'variables',
      Variables: 'Variables',
    },
    resource: {
      resources_id: 'Resources ID',
      resource: 'resource',
      resources: 'resources',
      Resources: 'Resources',
    },
    table: {
      table_id: 'Table ID',
      table: 'table',
      tables: 'tables',
      Tables: 'Tables',
      tab_entity_type: 'Entity',
      variable_count: 'Variable Count',
    },
    domain: 'domain',
    Domain: 'Domain',
    domains: 'domains',
    Domains: 'Domains',
    warehouse: 'Warehouse',
    research_project: 'Research',
    eqp: 'EQP',
    code: 'Code',
    name: 'Name',
    type: 'Type',
    updatedAt: 'Updated On',
    createdAt: 'Created On',
    approvedAt: 'Approved On',
    description: 'Description',
    rs_system_collection_starting_year: 'Collection Starting Year',
    rs_dict_current_version: 'Version',
    rs_project_erb_id: 'Nagano ID',
    rs_project_pi: 'Principal Investigator',
  },
  global: {
    participants: 'Participants',
    back: 'Back',
    retry: 'Retry',
    create: 'Create',
    close: 'Close',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    other: 'Other',
    delete: 'Delete',
    unknown: 'Unknown',
    summary: 'Summary',
    catalog: 'Catalog',
    home: 'Home',
    community: 'Community',
    resources: 'Resources',
    contact: 'Contact',
    proTable: {
      results: 'Results',
      result: 'Result',
      noResults: 'No Result',
      of: 'of',
      selected: 'item selected',
      selectedPlural: 'items selected',
      selectAllResults: 'Select all results',
      clear: 'Clear',
      clearFilters: 'Clear filters',
      tableExport: 'Export as TSV',
      reset: 'Reset',
      columns: 'Columns',
      first: 'First',
      previous: 'Previous',
      next: 'Next',
      view: '{value} / view',
    },
    errors: {
      403: 'Sorry, you are not authorized to access this page.',
      404: 'Sorry, the page you visited does not exist.',
      500: 'Sorry, something went wrong.',
      backHome: 'Back home',
      query: {
        notFound: {
          title: 'Query not found',
          content:
            'We were unable to load your query. Please try again or <a href="{href}" style="text-decoration: underline;" target="_blank">contact support</a>.',
          okText: 'Close',
        },
      },
    },
    notification: {
      genericError: 'An error occured',
    },
    seeLess: 'See less',
    seeMore: 'See more',
    ferload: 'Ferload',
  },
  components: {
    dataRelease: {
      title: 'Available data',
    },
  },
  layout: {
    user: {
      menu: {
        settings: 'Profile settings',
        logout: 'Logout',
        signedWith: 'Signed in with',
      },
    },
  },
  screen: {
    loginPage: {
      title: 'Data portal of Univers Informationnel du CHU Sainte-Justine.',
      subTitle: 'Explore the data catalog, manage your projects, and access your datasets.',
      login: 'Login',
      signup: 'Sign up',
      documentation: {
        title: 'Documentation Center',
        description:
          'To learn how to submit your data, request access to data, or to read user guides for the portal, visit the Documentation Center.',
        button: 'Documentation Center',
      },
    },
    home: {
      title: 'UnIC data portal',
      subTitle: 'Explore the data catalog, manage your projects, and access your datasets.',
      explore: 'Explore',
      warehouse: {
        title: 'Warehouse',
        description: 'Explore all data warehouse variables by domain',
      },
      researchProjects: {
        title: 'Research Projects',
        description: 'Explore research project data dictionaries',
      },
      EQPProjects: {
        title: 'EQP Projects',
        description: 'Explore data dictionaries from quality improvement projects',
      },
      hospitalSystems: {
        title: 'Hospital Systems',
        description: 'Explore the list of hospital system tables and variables',
      },
    },
    catalog: {
      title: 'UnIC Catalog',
      resources: {
        search: 'Resource',
        searchPlaceholder: 'Filter by resource',
        select: 'Type of resource',
        selectPlaceholder: 'Select',
      },
    },
  },
};

export default en;
