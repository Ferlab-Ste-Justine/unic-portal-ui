import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import EntityDescriptions from './EntityDescriptions';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock translations to return key names
}));

describe('DataRelease Component', () => {
  const descriptions = [
    {
      label: 'testLabel1',
      value: <div>valueTest1</div>,
    },
    {
      label: 'testLabel2',
      value: <div>valueTest2</div>,
    },
  ];

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it('should render without crashing', () => {
    render(<EntityDescriptions descriptions={descriptions} />);

    expect(screen.getByText('testLabel1')).toBeInTheDocument();
    expect(screen.getByText('testLabel2')).toBeInTheDocument();
  });

  it('should empty if no value', () => {
    render(
      <EntityDescriptions
        descriptions={[
          {
            label: 'testLabel1',
          },
        ]}
      />,
    );

    expect(screen.getByText('testLabel1')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
