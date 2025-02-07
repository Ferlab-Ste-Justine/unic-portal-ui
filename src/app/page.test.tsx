import '@testing-library/jest-dom';

import { useQuery } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import intl from 'react-intl-universal';

import HomePage from '@/app/page';
import { GET_RESOURCES_STATS } from '@/lib/graphql/queries/getStats';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));
jest.mock('@/store/global', () => ({
  useLang: jest.fn(),
}));
jest.mock('react-intl-universal', () => ({
  get: jest.fn(),
}));
// eslint-disable-next-line react/display-name
jest.mock('@/components/PageLayout', () => (props: any) => <div data-testid='PageLayout'>{props.children}</div>);
// ✅ Mocking Cards to avoid rendering them
jest.mock('src/components/HomeCards', () => ({
  WarehouseCard: jest.fn(() => <div data-testid='WarehouseCard' />),
  ResearchProjectsCard: jest.fn(() => <div data-testid='ResearchProjectsCard' />),
  EQPProjectsCard: jest.fn(() => <div data-testid='EQPProjectsCard' />),
  HospitalSystemsCard: jest.fn(() => <div data-testid='HospitalSystemsCard' />),
}));

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        getResourcesStats: {
          warehouse: { count: 10 },
          research_project: { count: 5 },
          eqp: { count: 3 },
          source_system: { count: 8 },
        },
      },
    });
  });

  it('renders PageLayout with correct title and subtitle', () => {
    render(<HomePage />);

    expect(screen.getByTestId('PageLayout')).toBeInTheDocument();
    expect(intl.get).toHaveBeenCalledWith('screen.home.title');
    expect(intl.get).toHaveBeenCalledWith('screen.home.subTitle');
  });

  it('renders all mocked Card components', () => {
    render(<HomePage />);

    expect(screen.getByTestId('WarehouseCard')).toBeInTheDocument();
    expect(screen.getByTestId('ResearchProjectsCard')).toBeInTheDocument();
    expect(screen.getByTestId('EQPProjectsCard')).toBeInTheDocument();
    expect(screen.getByTestId('HospitalSystemsCard')).toBeInTheDocument();
  });

  it('calls useQuery with GET_RESOURCES_STATS', () => {
    render(<HomePage />);

    expect(useQuery).toHaveBeenCalledWith(GET_RESOURCES_STATS);
  });
});
