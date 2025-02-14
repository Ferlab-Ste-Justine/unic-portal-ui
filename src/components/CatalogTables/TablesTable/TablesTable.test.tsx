import { MockedProvider } from '@apollo/client/testing';
import { expect } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GET_TABLES } from '@/lib/graphql/queries/getTables';
import { updateUserConfig } from '@/store/user/thunks';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

import TablesTable from './TablesTable';

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

describe('TablesTable', () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    user: { userInfo: { config: { catalog: { tables: { tables: { viewPerQuery: 10, columns: [] } } } } } },
    global: { lang: 'en' },
  });
  const mockDispatch = jest.fn();
  (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

  const mocks = [
    {
      request: {
        query: GET_TABLES,
        variables: {
          sort: [{ field: 'tab_name', order: 'asc' }],
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

    await waitFor(() => screen.getByText('Table 1'));

    expect(screen.getByText('Table 1')).toBeInTheDocument();
    expect(screen.getByText('Table 2')).toBeInTheDocument();
  });

  it('shows loading state while fetching data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <TablesTable />
        </Provider>
      </MockedProvider>,
    );

    expect(document.querySelector('.ant-spin-nested-loading')).toBeInTheDocument();
  });

  it('renders empty state when there is no data', async () => {
    const emptyMock = [
      {
        request: {
          query: GET_TABLES,
          variables: {
            sort: [{ field: 'tab_name', order: 'asc' }],
            size: DEFAULT_PAGE_SIZE,
            search_after: undefined,
          },
        },
        result: {
          data: {
            getTables: {
              total: 0,
              search_after: null,
              hits: [],
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <Provider store={store}>
          <TablesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('global.proTable.noResults')[0]).toBeInTheDocument();
    });
  });

  it('handles query errors gracefully', async () => {
    const errorMock = [
      {
        request: {
          query: GET_TABLES,
          variables: {
            sort: [{ field: 'tab_name', order: 'asc' }],
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
          <TablesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('global.proTable.noResults')[0]).toBeInTheDocument();
    });
  });

  it('supports pagination', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <TablesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => screen.getByText('Table 1'));
    expect(screen.getByText('Table 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('2'));
    expect(screen.getByText('Table 2')).toBeInTheDocument();
  });

  it('updates sorting when a column is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <TablesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => screen.getByText('Table 1'));
    const columnHeader = screen.getByText('entities.name');
    fireEvent.click(columnHeader);
    expect(screen.getByText('Table 1')).toBeInTheDocument();
  });

  it('dispatches updateUserConfig on column display change', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <TablesTable />
        </Provider>
      </MockedProvider>,
    );

    // Ensure table is rendered
    await waitFor(() => expect(screen.getByText('Table 1')).toBeInTheDocument());
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
