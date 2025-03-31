import { fireEvent, render, screen } from '@testing-library/react';

import { globalActions } from '@/store/global';
import getTagColorByType from '@/utils/getTagColorByType';

import InputSelect from './InputSelect';

jest.mock('@/utils/getTagColorByType', () => jest.fn(() => 'blue')); // Mock tag color function
jest.mock('@/store/global', () => ({
  globalActions: {
    setFilters: jest.fn(),
  },
  useGlobals: jest.fn(() => ({
    filters: [],
  })),
}));
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(() => jest.fn()),
}));

describe('InputSelect Component', () => {
  const mockHandleSetVariables = jest.fn();

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

  it('renders selected options as tags with correct colors', () => {
    render(<InputSelect {...defaultProps} mode={'tags'} />);

    fireEvent.mouseDown(screen.getByText('Select an option'));
    fireEvent.click(screen.getByText('Option1'));

    expect(getTagColorByType).toHaveBeenCalledWith('option1', 'var(--blue-8)');
  });

  it('calls setFilters when a selection is made', () => {
    render(<InputSelect {...defaultProps} operator={'orGroups'} />);

    fireEvent.mouseDown(screen.getByText('Select an option'));
    fireEvent.click(screen.getByText('Option1'));

    expect(globalActions.setFilters).toHaveBeenCalledWith([{ key: 'testField', values: ['option1'], tabKey: 'tab1' }]);
  });
});
