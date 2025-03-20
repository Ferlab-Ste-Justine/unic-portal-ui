import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import EntityDownloadTSVButton from '@/components/EntityPage/EntityDownloadTSVButton/EntityDownloadTSVButton';
import { entityTsvReport } from '@/store/report/thunks';

jest.mock('@/store/report/thunks', () => ({
  entityTsvReport: jest.fn(),
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

  it('renders the button with the correct title', () => {
    render(
      <Provider store={store}>
        <EntityDownloadTSVButton columns={[]} variableName={''} data={[]} />
      </Provider>,
    );

    expect(screen.getByText('global.download')).toBeInTheDocument();
  });

  it('dispatches fetchTsvReport with correct parameters on button click', () => {
    render(
      <Provider store={store}>
        <EntityDownloadTSVButton columns={[]} variableName={'some_variable'} data={[]} />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(store.dispatch).toHaveBeenCalledWith(
      entityTsvReport({
        columns: [],
        variableName: 'some_variable',
        data: [],
      }),
    );
  });
});
