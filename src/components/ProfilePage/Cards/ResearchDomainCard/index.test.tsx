import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { useUser } from '@/store/user';

import ResearchDomainCard from './index';

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

describe('ResearchDomainCard', () => {
  const mockStore = configureStore();
  const store = mockStore({});
  (useUser as jest.Mock).mockReturnValue({
    userInfo: { research_domains: ['biology'] },
  });

  const researchDomainOptions = [
    { value: 'biology', label: 'Biology' },
    { value: 'chemistry', label: 'Chemistry' },
  ];

  it('renders checkboxes correctly', () => {
    render(
      <Provider store={store}>
        <ResearchDomainCard researchDomainOptions={researchDomainOptions} />
      </Provider>,
    );

    expect(screen.getByText('screen.profileSettings.cards.researchDomain.biology')).toBeInTheDocument();
    expect(screen.getByText('screen.profileSettings.cards.researchDomain.chemistry')).toBeInTheDocument();
  });

  it('updates state when checkbox is clicked', () => {
    render(
      <Provider store={store}>
        <ResearchDomainCard researchDomainOptions={researchDomainOptions} />
      </Provider>,
    );

    const chemistryCheckbox = screen.getByLabelText('screen.profileSettings.cards.researchDomain.chemistry');
    fireEvent.click(chemistryCheckbox);
    expect(chemistryCheckbox).toBeChecked();
  });

  it('dispatches updateUser when form is submitted', async () => {
    render(
      <Provider store={store}>
        <ResearchDomainCard researchDomainOptions={researchDomainOptions} />
      </Provider>,
    );

    const chemistryCheckbox = screen.getByText('screen.profileSettings.cards.researchDomain.chemistry');
    fireEvent.click(chemistryCheckbox);

    const saveButton = screen.getByText('screen.profileSettings.cards.saveChanges');
    fireEvent.click(saveButton);

    // Wait for the store to receive the dispatched action
    await waitFor(() => {
      expect(store.getActions()).toContainEqual({
        type: 'UPDATE_USER',
        payload: { data: { research_domains: ['biology', 'chemistry'] }, displayNotification: true },
      });
    });
  });
});
