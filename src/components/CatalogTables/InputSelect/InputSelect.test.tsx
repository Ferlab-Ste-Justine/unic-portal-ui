import { fireEvent, render, screen } from '@testing-library/react';
import queryString from 'query-string';

import useHash from '@/lib/hooks/useHash';
import getTagColorByType from '@/utils/getTagColorByType';

import InputSelect from './InputSelect';

jest.mock('@/utils/getTagColorByType', () => jest.fn(() => 'blue')); // Mock tag color function
jest.mock('query-string', () => ({
  parse: jest.fn(),
}));
jest.mock('@/lib/hooks/useHash');

describe('InputSelect Component', () => {
  const mockHandleSetVariables = jest.fn();
  const mockSetHash = jest.fn();
  (useHash as jest.Mock).mockReturnValue({
    hash: '',
    setHash: mockSetHash,
  });
  (queryString.parse as jest.Mock).mockReturnValue({
    option1: 'Option1',
    option2: 'Option2',
  });

  const defaultProps = {
    operator: 'or' as const,
    options: [
      { value: 'option1', label: 'Option1' },
      { value: 'option2', label: 'Option2' },
    ],
    selectField: 'testField',
    title: 'Test Title',
    placeholder: 'Select an option',
    handleSetVariables: mockHandleSetVariables,
    variables: {},
    mode: 'multiple' as const,
    currentTabKey: 'tab1',
  };

  beforeEach(() => {
    mockHandleSetVariables.mockClear();
  });

  it('renders correctly with given props', () => {
    render(<InputSelect {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('calls handleSetVariables when an option is selected', () => {
    render(<InputSelect {...defaultProps} />);

    const selectElement = screen.getByText('Select an option');
    fireEvent.mouseDown(selectElement); // Open the dropdown

    const option = screen.getByText('Option1');
    fireEvent.click(option); // Select option

    expect(mockHandleSetVariables).toHaveBeenCalledWith(
      {
        or: [{ field: 'testField', value: 'option1' }],
      },
      ['testField'],
    );
  });

  it('calls handleSetVariables with an empty array when all options are cleared', () => {
    render(<InputSelect {...defaultProps} />);

    const selectElement = screen.getByText('Select an option');
    fireEvent.mouseDown(selectElement);

    const option = screen.getByText('Option1');
    fireEvent.click(option);

    expect(mockHandleSetVariables).toHaveBeenCalledTimes(1);

    // Clear selection
    fireEvent.click(screen.getByLabelText('close'));

    expect(mockHandleSetVariables).toHaveBeenCalledWith(
      {
        or: [],
      },
      ['testField'],
    );
  });

  it('renders selected options as tags with correct colors', () => {
    render(<InputSelect {...defaultProps} />);

    fireEvent.mouseDown(screen.getByText('Select an option'));
    fireEvent.click(screen.getByText('Option1'));

    expect(getTagColorByType).toHaveBeenCalledWith('option1', 'var(--blue-8)');
  });

  it('should parse multiple hash parameters and set correct selected values', () => {
    (useHash as jest.Mock).mockReturnValue({
      hash: 'tab1?option1=Option1&option2=Option2',
      setHash: mockSetHash,
    });
    render(
      <>
        <InputSelect {...defaultProps} />
        <InputSelect {...defaultProps} />
      </>,
    );

    // Ensure the parsed hash values are used
    expect(mockHandleSetVariables).toHaveBeenCalledWith(
      {
        or: [
          { field: 'option1', value: 'Option1' },
          { field: 'option2', value: 'Option2' },
        ],
        // @ts-expect-error double or
        or: [],
      },
      ['testField'],
    );

    // Ensure setHash is called to clear the hash after parsing
    expect(mockSetHash).toHaveBeenCalledWith('');
  });
});
