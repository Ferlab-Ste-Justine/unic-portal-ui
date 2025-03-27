import '@testing-library/jest-dom';

import { useQuery } from '@apollo/client';
import { fireEvent, render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';
import React from 'react';

import EntityVariablePage from '@/app/variable/[...slug]/page';
import { GET_VARIABLE_ENTITY } from '@/lib/graphql/queries/getVariableEntity.query';

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

jest.mock('lodash/debounce', () =>
  jest.fn((fn) => {
    fn.cancel = jest.fn();
    return fn;
  }),
);

jest.mock('@/components/EntityPage/EntityDownloadTSVButton', () => jest.fn());

describe('Variable Entity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        getVariables: {
          hits: [
            {
              var_name: 'labTestStatus',
              var_value_type: 'string',
              var_derivation_algorithm: 'AS IS',
              var_notes: null,
              var_label_fr: 'Statut du test',
              var_label_en: 'Status of the laboratory test performed',
              var_created_at: 1723832573323,
              var_last_update: 1723832573323,
              resource: {
                rs_name: 'warehouse',
                rs_code: 'warehouse',
              },
              table: {
                tab_name: 'lab_results',
              },
              value_set: {
                values: [
                  {
                    vsval_code: 'Corrected',
                    vsval_label_en: 'Corrected',
                    vsval_label_fr: 'Corrigée',
                  },
                  {
                    vsval_code: 'Canceled',
                    vsval_label_en: 'Canceled',
                    vsval_label_fr: 'Annulé',
                  },
                  {
                    vsval_code: 'Final',
                    vsval_label_en: 'Final',
                    vsval_label_fr: 'Final',
                  },
                  {
                    vsval_code: 'Pending',
                    vsval_label_en: 'Pending',
                    vsval_label_fr: 'En attente',
                  },
                ],
              },
            },
          ],
        },
      },
      loading: false,
    });
    (useParams as jest.Mock).mockReturnValue({ slug: ['warehouse', 'lab_results', 'labTestStatus'] });
  });

  test('should display current path using router', () => {
    render(<EntityVariablePage />);
    const titleEl = screen.getByRole('heading', { level: 4 });
    expect(titleEl).toHaveTextContent('labTestStatus');
  });

  it('renders all Entity Descriptions', () => {
    render(<EntityVariablePage />);
    expect(screen.getByText('entities.variable.Variable')).toBeInTheDocument();
    expect(screen.getByText('global.categories')).toBeInTheDocument();
    expect(screen.getByText('global.history')).toBeInTheDocument();
  });

  it('proper links should be in variable entity page', () => {
    render(<EntityVariablePage />);
    const allLinks = screen.getAllByRole('link');

    expect(allLinks[0]).toHaveAttribute('href', '/catalog');
    expect(allLinks[1]).toHaveAttribute('href', '/resource/warehouse');
    expect(allLinks[2]).toHaveAttribute('href', '/table/warehouse/lab_results');
  });

  it('renders Category rows in Table', () => {
    render(<EntityVariablePage />);
    const tableHeadersName = screen.getAllByRole('cell', { name: 'Corrected' });
    const tableHeadersLabel = screen.getAllByRole('cell', { name: 'Corrigée' });
    expect(tableHeadersName.length).toBe(1);
    expect(tableHeadersLabel.length).toBe(1);
  });

  it('calls useQuery with GET_VARIABLE_ENTITY', () => {
    render(<EntityVariablePage />);

    expect(useQuery).toHaveBeenCalledWith(GET_VARIABLE_ENTITY, {
      variables: {
        match: [
          { field: 'resource.rs_code', value: 'warehouse' },
          { field: 'table.tab_name', value: 'lab_results' },
          { field: 'var_name', value: 'labTestStatus' },
        ],
        size: 1,
      },
    });
  });

  it('updates state when typing', () => {
    render(<EntityVariablePage />);
    const input = screen.getByPlaceholderText('global.research');

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(input).toHaveValue('abc');
  });

  it('calls handleSearch on Enter key press', async () => {
    render(<EntityVariablePage />);
    const input = screen.getByPlaceholderText('global.research');
    fireEvent.change(input, { target: { value: 'tee' } });

    // Simulate pressing the Enter key
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(screen.getByPlaceholderText('global.research').value).toBe('tee');
  });

  it('filters the table based on search input', () => {
    render(<EntityVariablePage />);

    const input = screen.getByPlaceholderText('global.research');
    fireEvent.change(input, { target: { value: 'Canceled' } });

    // After the change, check if the table contains only the filtered data
    expect(screen.getByText('Canceled')).toBeInTheDocument();
    expect(screen.queryByText('Final')).not.toBeInTheDocument();
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
    render(<EntityVariablePage />);
    expect(screen.getByText('entities.no_data')).toBeInTheDocument();
  });

  test("entity should not return 'Notes' and 'Deviation Algorithm' component if not required", () => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        getVariables: {
          hits: [
            {
              var_name: 'labTestStatus',
              var_value_type: 'string',
              // - not present -  var_derivation_algorithm: 'AS IS',
              var_notes: null, // no notes
              var_label_fr: 'Statut du test',
              var_label_en: 'Status of the laboratory test performed',
              var_created_at: 1723832573323,
              var_last_update: 1723832573323,
              resource: {
                rs_name: 'warehouse',
                rs_code: 'warehouse',
              },
            },
          ],
        },
      },
      loading: false,
    });
    render(<EntityVariablePage />);
    expect(screen.queryByText('entities.algorithmDerivation')).not.toBeInTheDocument();
    expect(screen.queryByText('entities.notes')).not.toBeInTheDocument();
  });

  test("entity should return 'Notes' and 'Deviation Algorithm' component if required", () => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        getVariables: {
          hits: [
            {
              var_name: 'labTestStatus',
              var_value_type: 'string',
              var_derivation_algorithm: 'AS IS',
              var_notes: 'notes',
              var_label_fr: 'Statut du test',
              var_label_en: 'Status of the laboratory test performed',
              var_created_at: 1723832573323,
              var_last_update: 1723832573323,
              resource: {
                rs_name: 'warehouse',
                rs_code: 'warehouse',
              },
            },
          ],
        },
      },
      loading: false,
    });
    render(<EntityVariablePage />);
    expect(screen.getByText('entities.algorithmDerivation')).toBeInTheDocument();
    expect(screen.getByText('entities.notes')).toBeInTheDocument();
  });

  test('entity should not return Categories sections if not required', () => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        getVariables: {
          hits: [
            {
              var_name: 'labTestStatus',
              var_value_type: 'string',
              var_derivation_algorithm: 'AS IS',
              var_label_fr: 'Statut du test',
              var_label_en: 'Status of the laboratory test performed',
              var_created_at: 1723832573323,
              var_last_update: 1723832573323,
              resource: {
                rs_name: 'warehouse',
                rs_code: 'warehouse',
              },
              table: {
                tab_name: 'lab_results',
              },
              value_set: {
                values: [],
              },
            },
          ],
        },
      },
      loading: false,
    });
    render(<EntityVariablePage />);
    expect(screen.queryByText('global.categories')).not.toBeInTheDocument();
  });
});
