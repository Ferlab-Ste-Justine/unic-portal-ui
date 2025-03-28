import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { useAuth } from '@/app/api/auth/useAuth';
import { useUser } from '@/store/user';

import IdentificationCard from './index';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
  getHTML: jest.fn((key) => key),
}));
jest.mock('@/app/api/auth/useAuth', () => ({
  useAuth: jest.fn(),
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
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(() => ({ identity_provider: 'google' })),
}));

describe('IdentificationCard', () => {
  const mockStore = configureStore();
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
    (useAuth as jest.Mock).mockReturnValue({ user: { accessToken: 'mockAccessToken' } });
    (useUser as jest.Mock).mockReturnValue({
      userInfo: {
        first_name: 'John',
        last_name: 'Doe',
        title: 'Software Engineer',
        affiliation: 'Tech Corp',
        email: 'john.doe@techcorp.com',
        linkedin: 'https://www.linkedin.com/in/johndoe',
      },
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <IdentificationCard />
      </Provider>,
    );

  it('dispatches updateUser when form is submitted', async () => {
    renderComponent();

    const firstNameInput = screen.getByLabelText('screen.profileSettings.cards.identification.firstName');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    const saveButton = screen.getByText('screen.profileSettings.cards.saveChanges');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(store.getActions()).toContainEqual({
        type: 'UPDATE_USER',
        payload: {
          data: {
            first_name: 'Jane',
            last_name: 'Doe',
            affiliation: 'Tech Corp',
            external_individual_email: 'john.doe@techcorp.com',
            linkedin: 'https://www.linkedin.com/in/johndoe',
          },
          displayNotification: true,
        },
      });
    });
  });

  it('resets changes when discard button is clicked', () => {
    renderComponent();

    const firstNameInput = screen.getByLabelText('screen.profileSettings.cards.identification.firstName');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    const discardButton = screen.getByText('screen.profileSettings.cards.discardChanges');
    fireEvent.click(discardButton);

    expect(firstNameInput).toHaveValue('John'); // Should reset to original value
  });

  it('shows validation error for invalid LinkedIn URL', async () => {
    renderComponent();

    const linkedinInput = screen.getByPlaceholderText('https://www.linkedin.com/in/username');
    fireEvent.change(linkedinInput, { target: { value: 'invalid-linkedin-url' } });

    const saveButton = screen.getByText('screen.profileSettings.cards.saveChanges');
    fireEvent.click(saveButton);

    expect(await screen.findByText('screen.profileSettings.cards.identification.linkedinUrl')).toBeInTheDocument();
  });
});
