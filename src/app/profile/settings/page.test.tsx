import { render, screen, waitFor } from '@testing-library/react';

import ProfileSettingsPage from '@/app/profile/settings/page';
import { useAxios } from '@/lib/axios';

jest.mock('@/components/ProfilePage/Cards/DeleteCard', () => jest.fn(() => <div>Delete Card</div>));
jest.mock('@/components/ProfilePage/Cards/FunctionCard', () => jest.fn(() => <div>Function Card</div>));
jest.mock('@/components/ProfilePage/Cards/IdentificationCard', () => jest.fn(() => <div>Identification Card</div>));
jest.mock('@/components/ProfilePage/Cards/ResearchDomainCard', () => jest.fn(() => <div>Research Domain Card</div>));

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));
jest.mock('@/lib/axios', () => ({
  useAxios: jest.fn(),
}));

describe('ProfileSettingsPage', () => {
  it('renders ProfileSettingsPage and child components correctly', async () => {
    // Mock API response
    (useAxios as jest.Mock).mockReturnValueOnce({
      data: {
        roleOptions: [{ value: 'admin', label: 'Admin' }],
        researchDomainOptions: [{ value: 'AI', label: 'AI' }],
      },
    });

    render(<ProfileSettingsPage />);

    // Wait for API data to be processed
    await waitFor(() => expect(useAxios).toHaveBeenCalledTimes(1));

    // Check if ProfileSettings and mock child components render
    expect(screen.getByText('screen.profileSettings.title')).toBeInTheDocument();
    expect(screen.getByText('Identification Card')).toBeInTheDocument();
    expect(screen.getByText('Function Card')).toBeInTheDocument();
    expect(screen.getByText('Research Domain Card')).toBeInTheDocument();
    expect(screen.getByText('Delete Card')).toBeInTheDocument();
  });
});
