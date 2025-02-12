import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GET_RESOURCES } from '@/lib/graphql/queries/getResources';

import ResourcesTable from './ResourcesTable';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));

describe('ResourcesTable', () => {
  // Mock Redux
  const mockStore = configureStore([]);
  const store = mockStore({
    user: { userInfo: { config: { catalog: { tables: { resources: { viewPerQuery: 10, columns: [] } } } } } },
    global: { lang: 'en' },
  });

  // Mock GraphQL Query
  const mockResourcesQuery = {
    request: {
      query: GET_RESOURCES,
      variables: {
        sort: [{ field: 'rs_code', order: 'asc' }],
        size: 10,
        search_after: undefined,
      },
    },
    result: {
      data: {
        getResources: {
          total: 2,
          search_after: null,
          hits: [
            {
              rs_id: '1',
              rs_name: 'Resource 1',
              rs_type: 'Type A',
              rs_last_update: '2024-02-11',
              rs_description_en: 'Description EN 1',
              rs_description_fr: 'Description FR 1',
              rs_code: 'Code1',
              rs_is_project: true,
              rs_project_creation_date: '2022-01-01',
              rs_project_approval_date: '2022-06-01',
              rs_system_collection_starting_year: '2020',
              rs_dict_current_version: 'v1.0',
              rs_project_erb_id: 'ERB-123',
              rs_project_pi: 'PI-XYZ',
              variables: [{ var_id: 'var1' }],
              tables: [{ tab_id: 'tab1' }],
            },
            {
              rs_id: '2',
              rs_name: 'Resource 2',
              rs_type: 'Type B',
              rs_last_update: '2024-02-11',
              rs_description_en: 'Description EN 2',
              rs_description_fr: 'Description FR 2',
              rs_code: 'Code2',
              rs_is_project: false,
              rs_project_creation_date: '2021-01-01',
              rs_project_approval_date: '2021-06-01',
              rs_system_collection_starting_year: '2019',
              rs_dict_current_version: 'v1.1',
              rs_project_erb_id: 'ERB-456',
              rs_project_pi: 'PI-ABC',
              variables: [{ var_id: 'var2' }],
              tables: [{ tab_id: 'tab2' }],
            },
          ],
        },
        getResourcesType: ['Type A', 'Type B'],
      },
    },
  };

  test('renders table with data', async () => {
    render(
      <MockedProvider mocks={[mockResourcesQuery]} addTypename={false}>
        <Provider store={store}>
          <ResourcesTable />
        </Provider>
      </MockedProvider>,
    );

    // Wait for the data to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Resource 1')).toBeInTheDocument();
      expect(screen.getByText('Resource 2')).toBeInTheDocument();
    });
  });

  test('renders empty state when no data', async () => {
    const mockQuery = {
      ...mockResourcesQuery,
      result: { data: { getResources: { total: 0, hits: [], search_after: null } } },
    };
    render(
      <MockedProvider mocks={[mockQuery]} addTypename={false}>
        <Provider store={store}>
          <ResourcesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('global.proTable.noResults')[0]).toBeInTheDocument();
    });
  });
});
