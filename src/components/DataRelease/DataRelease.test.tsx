import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import { fetchStats } from '@/store/global/thunks';

import DataRelease from './DataRelease';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('@/store/global/thunks', () => ({
  fetchStats: jest.fn(),
}));
jest.mock('@/store/user', () => jest.fn());
jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock translations to return key names
}));

describe('DataRelease Component', () => {
  const initialState = {
    global: {
      stats: {
        projects_count: 10,
        source_system_count: 5,
        variables_count: 1000,
      },
    },
  };
  const mockStore = configureStore();
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <DataRelease />
      </Provider>,
    );

    expect(screen.getByText('entities.project.Projects')).toBeInTheDocument();
    expect(screen.getByText('entities.source_system.Source_systems')).toBeInTheDocument();
    expect(screen.getByText('global.participants')).toBeInTheDocument();
    expect(screen.getByText('entities.variable.Variables')).toBeInTheDocument();
  });

  it('should dispatch fetchStats on mount', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <DataRelease />
      </Provider>,
    );

    expect(mockDispatch).toHaveBeenCalledWith(fetchStats());
  });

  it('should display the correct stats', () => {
    render(
      <Provider store={store}>
        <DataRelease />
      </Provider>,
    );

    expect(screen.getByText('10')).toBeInTheDocument(); // projects_count
    expect(screen.getByText('5')).toBeInTheDocument(); // source_system_count
    expect(screen.getByText('2.5M')).toBeInTheDocument(); // participant_count (hardcoded)
    expect(screen.getByText('1,000')).toBeInTheDocument(); // variables_count
  });
});
