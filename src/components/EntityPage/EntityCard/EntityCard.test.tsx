import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import EntityCard from './EntityCard';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock translations to return key names
}));

describe('DataRelease Component', () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it('should render without crashing', () => {
    render(
      <EntityCard loading={false} title={'Test Title'}>
        <></>
      </EntityCard>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
