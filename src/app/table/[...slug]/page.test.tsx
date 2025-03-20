import '@testing-library/jest-dom';

import { useQuery } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

import EntityTablePage from '@/app/table/[...slug]/page';
import { GET_TABLE_ENTITY } from '@/lib/graphql/queries/getTableEntity.query';

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

describe('Table Entity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        getTables: {
          hits: [
            {
              tab_id: 2077,
              tab_created_at: 1726516882462,
              tab_entity_type: 'diagnosis',
              tab_label_en: 'Patient diagnosis',
              tab_label_fr: 'Diagnostic du patient',
              tab_last_update: 1726516882462,
              tab_name: 'patient_diagnosis',
              resource: {
                rs_id: 59,
                rs_code: 'bronchiolite',
                rs_is_project: true,
                rs_description_en:
                  'Study aimed at evaluating practices surrounding the management of bronchiolitis at the CHUSJ',
                rs_description_fr:
                  'Étude visant à évaluer les pratiques entourant la prise en charge de la bronchiolite au CHUSJ',
                rs_type: 'research_project',
                rs_name: 'LVC-Bronchiolite-HSJ',
                rs_title:
                  'Low-value care; and variation in practice for children hospitalized with bronchiolitis at the CHU Sainte-Justine',
              },
              stat_etl: {
                variable_count: 3,
              },
            },
          ],
        },
      },
      loading: false,
    });
    (useParams as jest.Mock).mockReturnValue({ slug: ['bronchiolite', 'patient_diagnosis'] });
  });

  test('should display current path using router', () => {
    render(<EntityTablePage />);
    const titleEl = screen.getByRole('heading', { level: 4 });
    expect(titleEl).toHaveTextContent('patient_diagnosis');
  });

  it('renders all Entity Descriptions', () => {
    render(<EntityTablePage />);
    expect(screen.getByText('global.summary')).toBeInTheDocument();
    expect(screen.getByText('entities.variable.Variables')).toBeInTheDocument();
    expect(screen.getByText('global.history')).toBeInTheDocument();
  });

  it('proper links should be in table entity page', () => {
    render(<EntityTablePage />);
    const allLinks = screen.getAllByRole('link');

    //2 title links
    expect(allLinks[0]).toHaveAttribute('href', '/catalog');
    expect(allLinks[1]).toHaveAttribute('href', '/resource/bronchiolite');
    //2 table links
    expect(allLinks[2]).toHaveAttribute('href', '/resource/bronchiolite');
    expect(allLinks[3]).toHaveAttribute('href', '/catalog#variables?table.tab_name=patient_diagnosis');
  });

  it('calls useQuery with GET_TABLE_ENTITY', () => {
    render(<EntityTablePage />);

    expect(useQuery).toHaveBeenCalledWith(GET_TABLE_ENTITY, {
      variables: {
        match: [
          { field: 'resource.rs_code', value: 'bronchiolite' },
          { field: 'tab_name', value: 'patient_diagnosis' },
        ],
        size: 1,
      },
    });
  });
});

describe('Resource Entity with no data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {},
      loading: true,
    });
    (useParams as jest.Mock).mockReturnValue({ slug: ['bronchiolite', 'patient_diagnosis'] });
  });

  test('entity should return empty component', () => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {}, //no data
      loading: false,
    });
    render(<EntityTablePage />);
    expect(screen.getByText('entities.no_data')).toBeInTheDocument();
  });
});
