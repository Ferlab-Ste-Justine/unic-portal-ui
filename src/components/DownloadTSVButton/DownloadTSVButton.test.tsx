import { gql } from '@apollo/client';
import { fireEvent, render, screen } from '@testing-library/react';
import { DocumentNode } from 'graphql';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import DownloadTSVButton from '@/components/DownloadTSVButton';
import { fetchTsvReport } from '@/store/report/thunks';

jest.mock('@/store/report/thunks', () => ({
  fetchTsvReport: jest.fn(),
}));
jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));

describe('DownloadTSVButton', () => {
  const mockStore = configureStore([]);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  const mockQuery: DocumentNode = gql`
    query TestQuery {
      test {
        column1
      }
    }
  `;

  const defaultProps = {
    tableName: 'TestTable',
    variables: {},
    query: mockQuery,
    userColumns: [
      { key: 'column1', visible: true },
      { key: 'column2', visible: false },
    ],
    columns: [
      { key: 'column1', title: 'Column 1' },
      { key: 'column2', title: 'Column 2' },
    ],
    title: 'Download',
  };

  it('renders the button with the correct title', () => {
    render(
      <Provider store={store}>
        <DownloadTSVButton {...defaultProps} />
      </Provider>,
    );

    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('dispatches fetchTsvReport with correct parameters on button click', () => {
    render(
      <Provider store={store}>
        <DownloadTSVButton {...defaultProps} />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(store.dispatch).toHaveBeenCalledWith(
      fetchTsvReport({
        columns: [{ key: 'column1', label: 'Column 1' }],
        tableName: 'TestTable',
        variables: {},
        query: mockQuery,
      }),
    );
  });
});
