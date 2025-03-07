import '@testing-library/jest-dom';

import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { render, screen } from '@testing-library/react';

import HospitalSystemsCard from '@/components/HomeCards/HospitalSystemsCard';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock intl.get to return the key itself
}));
jest.mock('../Bubbles', () => ({
  __esModule: true,
  default: () => <div data-testid='Bubbles' />,
}));
jest.mock('./CaduceusMedecine', () => ({
  __esModule: true,
  default: () => <div data-testid='CaduceusMedecine' />,
}));

describe('HospitalSystemsCard Component', () => {
  const mockStats = {
    project_count: 12,
    variable_count: 45,
  };

  it('renders the HospitalSystemsCard with correct elements', () => {
    render(<HospitalSystemsCard stats={mockStats} />);

    expect(screen.getByTestId('Bubbles')).toBeInTheDocument();
    expect(screen.getByTestId('CaduceusMedecine')).toBeInTheDocument();

    expect(screen.getByText('screen.home.hospitalSystems.title')).toBeInTheDocument();
    expect(screen.getByText('screen.home.hospitalSystems.description')).toBeInTheDocument();
    expect(screen.getByText('screen.home.explore')).toBeInTheDocument();
  });

  it('displays formatted statistics correctly', () => {
    render(<HospitalSystemsCard stats={mockStats} />);

    expect(screen.getByText(numberFormat(mockStats.project_count))).toBeInTheDocument();
    expect(screen.getByText(numberFormat(mockStats.variable_count))).toBeInTheDocument();
  });

  it('renders a link to the hospital systems catalog', () => {
    render(<HospitalSystemsCard stats={mockStats} />);

    const link = screen.getByRole('link', { name: 'screen.home.explore arrow-right' });
    expect(link).toHaveAttribute('href', '/catalog#resource?filterField=rs_type&filterValue=source_system');
  });

  it('handles missing stats correctly', () => {
    render(<HospitalSystemsCard stats={undefined} />);

    expect(screen.getByText(numberFormat(1))).toBeInTheDocument(); // Default value for project_count
    expect(screen.getByText(numberFormat(0))).toBeInTheDocument(); // Default value for variable_count
  });
});
