import '@testing-library/jest-dom';

import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { render, screen } from '@testing-library/react';

import WarehouseCard from '@/components/HomeCards/WarehouseCard';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock intl.get to return the key for simplicity
}));
jest.mock('../Bubbles', () => ({
  __esModule: true,
  default: () => <div data-testid='Bubbles' />,
}));
jest.mock('./AccountsStorage', () => ({
  __esModule: true,
  default: () => <div data-testid='AccountsStorage' />,
}));

describe('WarehouseCard Component', () => {
  const mockStats = {
    table_count: 10,
    variable_count: 50,
    source_system_count: 5,
    domain_count: 3,
  };

  it('renders the WarehouseCard with correct elements', () => {
    render(<WarehouseCard stats={mockStats} />);

    expect(screen.getByTestId('Bubbles')).toBeInTheDocument();
    expect(screen.getByTestId('AccountsStorage')).toBeInTheDocument();

    expect(screen.getByText('screen.home.warehouse.title')).toBeInTheDocument();
    expect(screen.getByText('screen.home.warehouse.description')).toBeInTheDocument();
    expect(screen.getByText('screen.home.explore')).toBeInTheDocument();
  });

  it('displays formatted statistics correctly', () => {
    render(<WarehouseCard stats={mockStats} />);

    expect(screen.getByText(numberFormat(mockStats.table_count))).toBeInTheDocument();
    expect(screen.getByText(numberFormat(mockStats.variable_count))).toBeInTheDocument();
    expect(screen.getByText(numberFormat(mockStats.source_system_count))).toBeInTheDocument();
    expect(screen.getByText(numberFormat(mockStats.domain_count))).toBeInTheDocument();
  });

  it('renders a link to the warehouse catalog', () => {
    render(<WarehouseCard stats={mockStats} />);

    const link = screen.getByRole('link', { name: 'screen.home.explore arrow-right' });
    expect(link).toHaveAttribute('href', '/catalog#resource?filterField=rs_type&filterValue=warehouse');
  });

  it('handles missing stats correctly', () => {
    render(<WarehouseCard stats={undefined} />);

    const zeroElements = screen.getAllByText(numberFormat(0)); // Find all instances of "0"
    expect(zeroElements.length).toBe(4); // Ensure all 4 stats default to 0
  });
});
