import '@testing-library/jest-dom';

import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { render, screen } from '@testing-library/react';

import ResearchProjectsCard from '@/components/HomeCards/ResearchProjectsCard';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock intl.get to return the key itself
}));
jest.mock('../Bubbles', () => ({
  __esModule: true,
  default: () => <div data-testid='Bubbles' />,
}));
jest.mock('./BrandBook', () => ({
  __esModule: true,
  default: () => <div data-testid='BrandBook' />,
}));

describe('ResearchProjectsCard Component', () => {
  const mockStats = {
    project_count: 7,
    variable_count: 25,
  };

  it('renders the ResearchProjectsCard with correct elements', () => {
    render(<ResearchProjectsCard stats={mockStats} />);

    expect(screen.getByTestId('Bubbles')).toBeInTheDocument();
    expect(screen.getByTestId('BrandBook')).toBeInTheDocument();

    expect(screen.getByText('screen.home.researchProjects.title')).toBeInTheDocument();
    expect(screen.getByText('screen.home.researchProjects.description')).toBeInTheDocument();
    expect(screen.getByText('screen.home.explore')).toBeInTheDocument();
  });

  it('displays formatted statistics correctly', () => {
    render(<ResearchProjectsCard stats={mockStats} />);

    expect(screen.getByText(numberFormat(mockStats.project_count))).toBeInTheDocument();
    expect(screen.getByText(numberFormat(mockStats.variable_count))).toBeInTheDocument();
  });

  it('renders a link to the research projects catalog', () => {
    render(<ResearchProjectsCard stats={mockStats} />);

    const link = screen.getByRole('link', { name: 'screen.home.explore arrow-right' });
    expect(link).toHaveAttribute('href', '/catalog#research_project');
  });
});
