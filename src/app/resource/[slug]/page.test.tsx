import '@testing-library/jest-dom';

import { useQuery } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

import EntityResourcePage from '@/app/resource/[slug]/page';
import { GET_RESOURCE_ENTITY } from '@/lib/graphql/queries/getResourceEntity.query';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));
jest.mock('@/store/global', () => ({
  useLang: jest.fn(),
}));
jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock translations to return key names
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('Resource Entity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        getResources: {
          hits: [
            {
              rs_id: 12,
              rs_type: 'research_project',
              rs_title: 'Investigations et prise en charge des pancréatites aiguës en pédiatrie',
              rs_last_update: 1723832407556,
              rs_description_en:
                'Retrospective study whose objective is to evaluate the epidemiology and clinical management of acute pancreatitis in patients at Sainte Justine University Hospital.',
              rs_description_fr:
                'Étude rétrospective dont l’objectif est d’évaluer l’épidémiologie et la gestion clinique de la pancréatite aigüe chez les patients du CHU Sainte Justine.',
              rs_name: 'Pancréatite Aigüe',
              rs_code: 'simapp',
              rs_project_erb_id: 'Some one',
              rs_is_project: true,
              rs_project_pi: 'Dr Some',
              rs_project_approval_date: 1580169600000,
              rs_dict_current_version: '1',
              stat_etl: {
                variable_count: 57,
                table_count: 3,
              },
              variables: [
                {
                  var_name: 'dateConge',
                  var_from_source_systems: [
                    {
                      rs_name: 'clinibaseci',
                      stat_etl: {
                        variable_count: 587,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      loading: false,
    });
    (useParams as jest.Mock).mockReturnValue({ slug: ['simapp'] });
  });

  test('should display current path using router', () => {
    render(<EntityResourcePage />);
    const titleEl = screen.getByRole('heading', { level: 4 });
    expect(titleEl).toHaveTextContent('Pancréatite Aigüe');
  });

  it('renders all Entity Descriptions', () => {
    render(<EntityResourcePage />);
    expect(screen.getByText('global.summary')).toBeInTheDocument();
    expect(screen.getByText('entities.variable.Variables')).toBeInTheDocument();
    expect(screen.getByText('global.currentVersion')).toBeInTheDocument();
  });

  it('calls useQuery with GET_RESOURCE_ENTITY', () => {
    render(<EntityResourcePage />);

    expect(useQuery).toHaveBeenCalledWith(GET_RESOURCE_ENTITY, {
      variables: {
        match: [{ field: 'rs_code', value: 'simapp' }],
        size: 1,
      },
    });
  });

  it('entity type should be properly set', () => {
    render(<EntityResourcePage />);

    expect(screen.getByText('entities.research_project')).toBeInTheDocument();
  });

  it('entity should contain all fields for PROJECT type', () => {
    render(<EntityResourcePage />);

    expect(screen.getByText('entities.researcher')).toBeInTheDocument();
    expect(screen.getByText('entities.rs_project_erb_id')).toBeInTheDocument();
    expect(screen.getByText('screen.home.hospitalSystems.title')).toBeInTheDocument();
  });
});

describe('Resource Entity with no data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {},
      loading: true,
    });
    (useParams as jest.Mock).mockReturnValue({ slug: ['simapp'] });
  });

  test('entity should return empty component', () => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {}, //no data
      loading: false,
    });
    render(<EntityResourcePage />);
    expect(screen.getByText('entities.no_data')).toBeInTheDocument();
  });
});
