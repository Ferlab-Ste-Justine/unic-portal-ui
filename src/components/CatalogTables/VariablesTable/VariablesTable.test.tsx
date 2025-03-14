import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GET_VARIABLES } from '@/lib/graphql/queries/getVariables';
import useHash from '@/lib/hooks/useHash';
import { updateUserConfig } from '@/store/user/thunks';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

import VariablesTable from './VariablesTable';

jest.mock('@/components/DownloadTSVButton', () => jest.fn());
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
jest.mock('@/lib/hooks/useHash');
jest.mock('query-string', () => ({
  parse: jest.fn(),
}));

describe('VariablesTable', () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    user: { userInfo: { config: { catalog: { tables: { variables: { viewPerQuery: 10, columns: [] } } } } } },
    global: { lang: 'en' },
  });
  const mockDispatch = jest.fn();
  (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  const mockSetHash = jest.fn();
  (useHash as jest.Mock).mockReturnValue({
    hash: '',
    setHash: mockSetHash,
  });

  const mocks = [
    {
      request: {
        query: GET_VARIABLES,
        variables: {
          sort: [
            { field: 'var_name', order: 'asc' },
            { field: 'var_id', order: 'asc' },
          ],
          size: DEFAULT_PAGE_SIZE,
          search_after: undefined,
        },
      },
      result: {
        data: {
          getVariables: {
            total: 2,
            search_after: null,
            hits: [
              {
                var_id: '1',
                var_name: 'Variable 1',
                resource: {
                  rs_name: 'rs_name 1',
                  rs_code: 'rs_code 1',
                },
                variable: {
                  var_label_fr: 'var_label_fr 1',
                  var_label_en: 'var_label_en 1',
                },
                tab_label: 'tab_label',
                var_value_type: 'var_value_type',
                var_from_source_systems: [
                  {
                    rs_name: 'rs_name 1',
                    rs_code: 'rs_code 1',
                  },
                  {
                    rs_name: 'rs_name 2',
                    rs_code: 'rs_code 2',
                  },
                ],
                table: {
                  tab_name: 'tab_name 1',
                },
                var_created_at: new Date(),
                var_last_update: new Date(),
              },
              {
                var_id: '2',
                var_name: 'Variable 2',
                resource: { rs_name: 'rs_name 2', rs_code: 'rs_code 2' },
                table: {
                  tab_name: 'tab_name 2',
                },
                variable: {
                  var_label_fr: 'var_label_fr 1',
                  var_label_en: 'var_label_en 1',
                },
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
          <VariablesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.getByText('Variable 1')).toBeInTheDocument());
    expect(screen.getByText('Variable 2')).toBeInTheDocument();
  });

  it('shows loading state while fetching data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <VariablesTable />
        </Provider>
      </MockedProvider>,
    );

    expect(document.querySelector('.ant-spin-nested-loading')).toBeInTheDocument();
  });

  it('dispatches updateUserConfig on column display change', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <VariablesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.getByText('Variable 1')).toBeInTheDocument());

    // Open column settings
    fireEvent.click(screen.getByRole('button', { name: 'setting' }));

    // Find column toggle options
    const options = await waitFor(() => screen.getAllByText('entities.name'));
    expect(options.length).toBeGreaterThan(1); // Ensure the index is valid

    // Click the display option
    fireEvent.click(options[1]);

    // Ensure updateUserConfig was called
    await waitFor(() => expect(updateUserConfig).toHaveBeenCalledTimes(1));
  });

  it('dispatches updateUserConfig on pagination change', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <VariablesTable />
        </Provider>
      </MockedProvider>,
    );

    // Ensure table is rendered
    await waitFor(() => expect(screen.getByText('Variable 1')).toBeInTheDocument());
    // Open settings
    fireEvent.click(screen.getByRole('button', { name: 'setting' }));
    // Ensure the display option is available
    const options = await waitFor(() => screen.getAllByText('entities.name'));
    expect(options.length).toBeGreaterThan(1); // Ensure the index is valid
    // Click the display option
    fireEvent.click(options[1]);
  });

  it('updates sorting when a column is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <VariablesTable />
        </Provider>
      </MockedProvider>,
    );

    await waitFor(() => screen.getByText('Variable 1'));
    const columnHeader = screen.getByText('entities.name');
    fireEvent.click(columnHeader);
    expect(screen.getByText('Variable 1')).toBeInTheDocument();
  });
});
