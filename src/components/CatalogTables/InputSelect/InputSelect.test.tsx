import { fireEvent, render, screen } from '@testing-library/react';

import getTagColorByType from '@/utils/getTagColorByType';

import InputSelect from './InputSelect';

jest.mock('@/utils/getTagColorByType', () => jest.fn(() => 'blue')); // Mock tag color function

describe('InputSelect Component', () => {
  const mockHandleSetVariables = jest.fn();

  const defaultProps = {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    selectField: 'testField',
    title: 'Test Title',
    placeholder: 'Select an option',
    handleSetVariables: mockHandleSetVariables,
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
    fireEvent.mouseDown(selectElement);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(mockHandleSetVariables).toHaveBeenCalledWith({
      or: [{ field: 'testField', value: 'option1' }],
    });
  });

  it('calls handleSetVariables with empty when all options are cleared', () => {
    render(<InputSelect {...defaultProps} />);

    const selectElement = screen.getByText('Select an option');
    fireEvent.mouseDown(selectElement);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(mockHandleSetVariables).toHaveBeenCalledTimes(1);

    // Clear selection
    fireEvent.click(screen.getByLabelText('close'));

    expect(mockHandleSetVariables).toHaveBeenCalledWith({ or: undefined });
  });

  it('renders selected options as tags with correct colors', () => {
    render(<InputSelect {...defaultProps} />);

    fireEvent.mouseDown(screen.getByText('Select an option'));
    fireEvent.click(screen.getByText('Option 1'));

    expect(getTagColorByType).toHaveBeenCalledWith('option1');
  });
});
