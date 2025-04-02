import '@testing-library/jest-dom';

import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { render, screen } from '@testing-library/react';

import EQPProjectsCard from '@/components/HomeCards/EQPProjectsCard';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock intl.get to return the key itself
}));
jest.mock('../Bubbles', () => ({
  __esModule: true,
  default: () => <div data-testid='Bubbles' />,
}));
jest.mock('./FinancialReport', () => ({
  __esModule: true,
  default: () => <div data-testid='FinancialReport' />,
}));

describe('EQPProjectsCard Component', () => {
  const mockStats = {
    project_count: 12,
    variable_count: 45,
  };

  it('renders the EQPProjectsCard with correct elements', () => {
    render(<EQPProjectsCard stats={mockStats} />);

    expect(screen.getByTestId('Bubbles')).toBeInTheDocument();
    expect(screen.getByTestId('FinancialReport')).toBeInTheDocument();

    expect(screen.getByText('screen.home.EQPProjects.title')).toBeInTheDocument();
    expect(screen.getByText('screen.home.EQPProjects.description')).toBeInTheDocument();
    expect(screen.getByText('screen.home.explore')).toBeInTheDocument();
  });

  it('displays formatted statistics correctly', () => {
    render(<EQPProjectsCard stats={mockStats} />);

    expect(screen.getByText(numberFormat(mockStats.project_count))).toBeInTheDocument();
    expect(screen.getByText(numberFormat(mockStats.variable_count))).toBeInTheDocument();
  });

  it('renders a link to the eqp catalog', () => {
    render(<EQPProjectsCard stats={mockStats} />);

    const link = screen.getByRole('link', { name: 'screen.home.explore arrow-right' });
    expect(link).toHaveAttribute('href', '/catalog#resources');
  });

  it('handles missing stats correctly', () => {
    render(<EQPProjectsCard stats={undefined} />);

    expect(screen.getByText(numberFormat(1))).toBeInTheDocument(); // Default value for project_count
    expect(screen.getByText(numberFormat(0))).toBeInTheDocument(); // Default value for variable_count
  });
});
