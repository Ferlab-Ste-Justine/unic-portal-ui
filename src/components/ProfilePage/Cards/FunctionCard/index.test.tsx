import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { useUser } from '@/store/user';

import FunctionCard from './index';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));
jest.mock('@/store/user', () => ({
  useUser: jest.fn(),
}));
jest.mock('@/store/user/thunks', () => ({
  updateUser: jest.fn((data) => ({
    type: 'UPDATE_USER',
    payload: data,
  })),
}));
jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
}));

describe('FunctionCard Component', () => {
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
  ];
  const mockStore = configureStore();
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
    (useUser as jest.Mock).mockReturnValue({
      userInfo: { roles: [] },
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <FunctionCard roleOptions={roleOptions} />
      </Provider>,
    );

  it('renders correctly with given props', () => {
    renderComponent();

    expect(screen.getByText('screen.profileSettings.cards.roleAffiliation.title')).toBeInTheDocument();
    expect(screen.getByText('screen.profileSettings.cards.roleAffiliation.iama')).toBeInTheDocument();
    expect(screen.getByText('screen.profileSettings.cards.checkAll')).toBeInTheDocument();
    expect(screen.getByLabelText('screen.profileSettings.cards.roleAffiliation.admin')).toBeInTheDocument();
    expect(screen.getByLabelText('screen.profileSettings.cards.roleAffiliation.editor')).toBeInTheDocument();
  });

  it('selects and tracks checkbox changes', () => {
    renderComponent();

    const adminCheckbox = screen.getByLabelText('screen.profileSettings.cards.roleAffiliation.admin');
    fireEvent.click(adminCheckbox);

    expect(adminCheckbox).toBeChecked();
  });

  it('discards changes when discard button is clicked', async () => {
    render(
      <Provider store={store}>
        <FunctionCard roleOptions={roleOptions} />
      </Provider>,
    );

    const adminCheckbox = screen.getByLabelText('screen.profileSettings.cards.roleAffiliation.admin');
    fireEvent.click(adminCheckbox);
    expect(adminCheckbox).toBeChecked();

    const discardButton = screen.getByText('screen.profileSettings.cards.discardChanges');
    fireEvent.click(discardButton);

    await waitFor(() => expect(adminCheckbox).not.toBeChecked());
  });

  it('dispatches updateUser when form is submitted', async () => {
    renderComponent();

    const adminCheckbox = screen.getByLabelText('screen.profileSettings.cards.roleAffiliation.admin');
    fireEvent.click(adminCheckbox);

    const saveButton = screen.getByText('screen.profileSettings.cards.saveChanges');
    fireEvent.click(saveButton);

    // Wait for the store to receive the dispatched action
    await waitFor(() => {
      expect(store.getActions()).toContainEqual({
        type: 'UPDATE_USER',
        payload: { data: { roles: ['admin'] }, displayNotification: true },
      });
    });
  });
});
