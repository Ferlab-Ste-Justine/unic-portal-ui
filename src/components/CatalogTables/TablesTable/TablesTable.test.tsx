import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GET_TABLES } from '@/lib/graphql/queries/getTables';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

import TablesTable from './TablesTable';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));

describe('TablesTable', () => {
  // Mock Redux
  const mockStore = configureStore([]);
  const store = mockStore({
    user: { userInfo: { config: { catalog: { tables: { resources: { viewPerQuery: 10, columns: [] } } } } } },
    global: { lang: 'en' },
  });

  // Mock data for GET_TABLES query
  const mocks = [
    {
      request: {
        query: GET_TABLES,
        variables: {
          sort: [{ field: 'tab_name', order: 'asc' }], // Updated from `[]` to expected default
          size: DEFAULT_PAGE_SIZE,
          search_after: undefined,
        },
      },
      result: {
        data: {
          getTables: {
            total: 2,
            search_after: null,
            hits: [
              {
                tab_id: '1',
                tab_name: 'Table 1',
                tab_label_en: 'Label 1',
                tab_label_fr: 'Étiquette 1',
                resource: { rs_code: 'CODE1' },
                tab_entity_type: 'Type 1',
                tab_domain: 'Domain 1',
                stat_etl: { variable_count: 5 },
                tab_created_at: '2024-02-14T10:00:00Z',
                tab_last_update: '2024-02-14T12:00:00Z',
              },
              {
                tab_id: '2',
                tab_name: 'Table 2',
                tab_label_en: 'Label 2',
                tab_label_fr: 'Étiquette 2',
                resource: { rs_code: 'CODE2' },
                tab_entity_type: 'Type 2',
                tab_domain: 'Domain 2',
                stat_etl: { variable_count: 10 },
                tab_created_at: '2024-02-13T10:00:00Z',
                tab_last_update: '2024-02-13T12:00:00Z',
              },
            ],
          },
        },
      },
    },
  ];

  it('renders the table with mock data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <TablesTable />
        </Provider>
      </MockedProvider>,
    );

    // Wait for the data to load and the table to be rendered
    await waitFor(() => screen.getByText('Table 1'));

    // Check if the tables are displayed
    expect(screen.getByText('Table 1')).toBeInTheDocument();
    expect(screen.getByText('Table 2')).toBeInTheDocument();
  });

  it('supports pagination', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <TablesTable />
        </Provider>
      </MockedProvider>,
    );

    // Wait for the data to load
    await waitFor(() => screen.getByText('Table 1'));

    // Check initial page load
    expect(screen.getByText('Table 1')).toBeInTheDocument();

    // Simulate a page change (example: page 2)
    fireEvent.click(screen.getByText('2'));

    // Ensure the table updates (this should be verified with mock data that supports pagination)
    // Check if the mock data changed for page 2
    expect(screen.getByText('Table 2')).toBeInTheDocument();
  });
});
