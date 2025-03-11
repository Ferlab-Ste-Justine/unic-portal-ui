import { fireEvent, render, screen } from '@testing-library/react';

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

  const defaultProps = {
    operator: 'or' as const,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    selectField: 'testField',
    title: 'Test Title',
    placeholder: 'Select an option',
    handleSetVariables: mockHandleSetVariables,
    variables: {},
    mode: 'multiple' as const,
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

    const option = screen.getByText('Option 1');
    fireEvent.click(option); // Select option

    expect(mockHandleSetVariables).toHaveBeenCalledWith({
      or: [{ field: 'testField', value: 'option1' }],
    });
  });

  it('calls handleSetVariables with an empty array when all options are cleared', () => {
    render(<InputSelect {...defaultProps} />);

    const selectElement = screen.getByText('Select an option');
    fireEvent.mouseDown(selectElement);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(mockHandleSetVariables).toHaveBeenCalledTimes(1);

    // Clear selection
    fireEvent.click(screen.getByLabelText('close'));

    expect(mockHandleSetVariables).toHaveBeenCalledWith({
      or: [],
    });
  });

  it('renders selected options as tags with correct colors', () => {
    render(<InputSelect {...defaultProps} />);

    fireEvent.mouseDown(screen.getByText('Select an option'));
    fireEvent.click(screen.getByText('Option 1'));

    expect(getTagColorByType).toHaveBeenCalledWith('option1', 'var(--blue-8)');
  });
});
