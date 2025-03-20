import intl from 'react-intl-universal';

import { sortOptionsLabelsByName } from './utils';

jest.mock('react-intl-universal', () => ({
  get: jest.fn(),
}));

describe('sortOptionsLabelsByName', () => {
  it('sorts options alphabetically by translated label and retains other option last', () => {
    (intl.get as jest.Mock)
      .mockReturnValueOnce('Admin') // Translated label for 'admin'
      .mockReturnValueOnce('User') // Translated label for 'user'
      .mockReturnValueOnce('Super Admin') // Translated label for 'superAdmin'
      .mockReturnValueOnce('Other'); // Translated label for 'other'

    const options = [
      { value: 'user', label: 'User' },
      { value: 'admin', label: 'Admin' },
      { value: 'superAdmin', label: 'Super Admin' },
      { value: 'other', label: 'Other' },
    ];

    const result = sortOptionsLabelsByName(options, 'role');

    // Check if options are sorted alphabetically by label
    expect(result[0].label).toBe('Admin');
    expect(result[1].label).toBe('User');
    expect(result[2].label).toBe('Super Admin');
    expect(result[3].label).toBe('Other');

    // Check if "other" value remains last
    expect(result[result.length - 1].value).toBe('other');
  });

  it('returns original label if translation is not found', () => {
    // Mock the translations
    (intl.get as jest.Mock)
      .mockReturnValueOnce('Admin')
      .mockReturnValueOnce('User')
      .mockReturnValueOnce(undefined) // No translation for 'superAdmin'
      .mockReturnValueOnce('Other');

    const options = [
      { value: 'user', label: 'User' },
      { value: 'admin', label: 'Admin' },
      { value: 'superAdmin', label: 'Super Admin' },
      { value: 'other', label: 'Other' },
    ];

    const result = sortOptionsLabelsByName(options, 'role');

    // Check if 'superAdmin' uses its original label since translation is not found
    expect(result[2].label).toBe('Super Admin');
  });
});
