import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import debounce from 'lodash/debounce';

import InputSearch from './InputSearch';

jest.mock('lodash/debounce', () =>
  jest.fn((fn) => {
    fn.cancel = jest.fn();
    return fn;
  }),
);

describe('InputSearch Component', () => {
  const mockHandleSetVariables = jest.fn();

  const defaultProps = {
    searchFields: ['field1', 'field2'],
    handleSetVariables: mockHandleSetVariables,
    variables: {},
    title: 'Test Search',
    placeholder: 'Search something',
  };

  beforeEach(() => {
    mockHandleSetVariables.mockClear();
  });

  it('renders correctly with given props', () => {
    render(<InputSearch {...defaultProps} />);

    expect(screen.getByText('Test Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search something')).toBeInTheDocument();
  });

  it('updates state when typing', () => {
    render(<InputSearch {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search something');

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(input).toHaveValue('abc');
  });

  it('calls handleSetVariables on onPressEnter', async () => {
    render(<InputSearch {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search something');
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockHandleSetVariables).toHaveBeenCalledTimes(1);
    expect(mockHandleSetVariables).toHaveBeenCalledWith({
      or: [
        { field: 'field1', value: '*te*', useWildcard: true },
        { field: 'field2', value: '*te*', useWildcard: true },
      ],
    });
  });

  it('debounces search after typing 3+ chars', async () => {
    render(<InputSearch {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search something');

    fireEvent.change(input, { target: { value: 'tes' } });

    await waitFor(() => {
      expect(mockHandleSetVariables).toHaveBeenCalledWith({
        or: [
          { field: 'field1', value: '*tes*', useWildcard: true },
          { field: 'field2', value: '*tes*', useWildcard: true },
        ],
      });
    });
  });

  it('clears search when variables are reset', async () => {
    const { rerender } = render(<InputSearch {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search something');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
    rerender(<InputSearch {...defaultProps} variables={{ or: [] }} />);
    expect(input).toHaveValue('');
  });

  it('cancels debounce on unmount', () => {
    const { unmount } = render(<InputSearch {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search something');
    fireEvent.change(input, { target: { value: 'tes' } });
    unmount();
    expect(jest.mocked(debounce).mock.results[0].value.cancel).toHaveBeenCalled();
  });

  it('clears search when empty value is entered', async () => {
    const { rerender } = render(<InputSearch {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search something');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
    rerender(<InputSearch {...defaultProps} variables={{ or: [] }} />);
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');
  });
});
