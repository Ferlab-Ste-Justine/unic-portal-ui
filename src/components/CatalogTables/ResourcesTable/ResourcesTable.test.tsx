import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GET_RESOURCES } from '@/lib/graphql/queries/getResources';
import { updateUserConfig } from '@/store/user/thunks';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

import ResourcesTable from './ResourcesTable';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('@/store/user/thunks', () => ({
  updateUserConfig: jest.fn(),
}));

describe('ResourcesTable', () => {
  // Mock Redux
  const mockStore = configureStore([]);
  const store = mockStore({
    user: { userInfo: { config: { catalog: { tables: { resources: { viewPerQuery: 10, columns: [] } } } } } },
    global: { lang: 'en' },
  });
  const mockDispatch = jest.fn();
  (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

  // Mock GraphQL Query
  const mockResourcesQuery = {
    request: {
      query: GET_RESOURCES,
      variables: {
        sort: [
          { field: 'rs_name', order: 'asc' },
          { field: 'rs_id', order: 'asc' },
        ],
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

  it('supports pagination', async () => {
    render(
      <MockedProvider mocks={[mockResourcesQuery]} addTypename={false}>
        <Provider store={store}>
          <ResourcesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => screen.getByText('Resource 1'));
    expect(screen.getByText('Resource 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('2'));
    expect(screen.getByText('Resource 2')).toBeInTheDocument();
  });

  it('handles query errors gracefully', async () => {
    const errorMock = [
      {
        request: {
          query: GET_RESOURCES,
          variables: {
            sort: [{ field: 'rs_name', order: 'asc' }],
            size: DEFAULT_PAGE_SIZE,
            search_after: undefined,
          },
        },
        error: new Error('GraphQL error'),
      },
    ];

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <Provider store={store}>
          <ResourcesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('global.proTable.noResults')[0]).toBeInTheDocument();
    });
  });

  it('updates sorting when a column is clicked', async () => {
    render(
      <MockedProvider mocks={[mockResourcesQuery]} addTypename={false}>
        <Provider store={store}>
          <ResourcesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => screen.getByText('Resource 1'));
    const columnHeader = screen.getByText('entities.name');
    fireEvent.click(columnHeader);
    expect(screen.getByText('Resource 1')).toBeInTheDocument();
  });

  it('dispatches updateUserConfig on column display change', async () => {
    render(
      <MockedProvider mocks={[mockResourcesQuery]} addTypename={false}>
        <Provider store={store}>
          <ResourcesTable />
        </Provider>
      </MockedProvider>,
    );

    // Ensure table is rendered
    await waitFor(() => expect(screen.getByText('Resource 1')).toBeInTheDocument());
    // Open settings
    fireEvent.click(screen.getByRole('button', { name: 'setting' }));
    // Ensure the display option is available
    const options = await waitFor(() => screen.getAllByText('entities.name'));
    expect(options.length).toBeGreaterThan(1); // Ensure the index is valid
    // Click the display option
    fireEvent.click(options[1]);

    // Assert that updateUserConfig was called
    expect(updateUserConfig).toHaveBeenCalledTimes(1);
  });
});
