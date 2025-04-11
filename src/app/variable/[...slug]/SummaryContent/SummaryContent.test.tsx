import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { IVariableEntity } from '@/types/entities';

import SummaryContent from './SummaryContent';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock translations to return key names
}));

describe('SummaryContent Component', () => {
  const mockVariableEntity: IVariableEntity = {
    var_id: 123,
    var_name: 'Test Variable Name',
    var_label_en: 'Test Label EN',
    var_label_fr: 'Test Label FR',
    var_last_update: 1672531200000,
    var_created_at: 1672531200000,
    var_value_type: 'String',
    var_derivation_algorithm: 'Algorithm1,Algorithm2',
    var_notes: 'Test Notes',
    var_path: '',
    var_default: false,
    var_is_path: false,
    var_is_scale_to_fit: false,
    var_is_composite: false,
    var_is_array: false,
    var_is_required: false,
    var_is_optional: false,
    var_source_type: {
      rs_id: 125,
      rs_name: 'string',
      rs_code: 'string',
      published: false,
      stat_etl: {
        variable_count: 57,
        table_count: 3,
        project_count: 0,
        domain_count: 0,
        source_system_count: 0,
      },
    },
    stat_etl: {
      variable_count: 57,
      table_count: 3,
      project_count: 0,
      domain_count: 0,
      source_system_count: 0,
    },
    var_from_source_systems: [],
    value_set: {
      values: [],
    },
    search_after: [],
    resource: {
      rs_name: 'Test Resource Name',
      rs_code: 'test-code',
      rs_id: 1,
      rs_system_collection_starting_year: 2020,
      rs_type: 'Type1',
      rs_title: 'Test Title',
      rs_dict_current_version: 'v1.0',
      rs_last_update: 1672531200000,
      rs_description_en: 'Test Description EN',
      rs_description_fr: 'Test Description FR',
      rs_project_pi: 'Test PI',
      rs_project_erb_id: 'ERB123',
      rs_is_project: true,
      rs_project_approval_date: 1672531200000,
      rs_project_creation_date: 1672531200000,
      stat_etl: {
        variable_count: 57,
        table_count: 3,
        project_count: 0,
        domain_count: 0,
        source_system_count: 0,
      },
      variables: [],
      tables: [],
      search_after: [],
    },
    table: {
      tab_id: 12,
      tab_name: 'Test Table Name',
      tab_label_en: 'string',
      tab_label_fr: 'string',
      resource: {
        rs_name: 'Test Resource Name',
        rs_code: 'test-code',
        rs_id: 1,
        rs_system_collection_starting_year: 2020,
        rs_type: 'Type1',
        rs_title: 'Test Title',
        rs_dict_current_version: 'v1.0',
        rs_last_update: 1672531200000,
        rs_description_en: 'Test Description EN',
        rs_description_fr: 'Test Description FR',
        rs_project_pi: 'Test PI',
        rs_project_erb_id: 'ERB123',
        rs_is_project: true,
        rs_project_approval_date: 1672531200000,
        rs_project_creation_date: 1672531200000,
        stat_etl: {
          variable_count: 57,
          table_count: 3,
          project_count: 0,
          domain_count: 0,
          source_system_count: 0,
        },
        variables: [],
        tables: [],
        search_after: [],
      },
      tab_entity_type: 'string',
      tab_domain: 'string',
      tab_row_filter: 'string',
      stat_etl: {
        variable_count: 57,
        table_count: 3,
        project_count: 0,
        domain_count: 0,
        source_system_count: 0,
      },
      tab_created_at: 'string',
      tab_last_update: 'string',
      search_after: [],
    },
  };
  const mockStore = configureStore([]);
  const store = mockStore({
    global: { lang: 'en' },
  });

  it('renders the label based on language', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockVariableEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Label EN')).toBeInTheDocument();
  });

  it('renders resource name with a link when available', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockVariableEntity} />
      </Provider>,
    );
    const resourceLink = screen.getByRole('link', { name: 'Test Resource Name' });
    expect(resourceLink).toHaveAttribute('href', '/resource/test-code');
  });

  it('renders table name with a link when available', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockVariableEntity} />
      </Provider>,
    );
    const tableLink = screen.getByRole('link', { name: 'Test Table Name' });
    expect(tableLink).toHaveAttribute('href', '/table/test-code/Test Table Name');
  });

  it('renders notes when available', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockVariableEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Notes')).toBeInTheDocument();
  });

  it('renders placeholders when data is missing', () => {
    const emptyVariableEntity = {};
    render(
      <Provider store={store}>
        <SummaryContent {...emptyVariableEntity} />
      </Provider>,
    );
    expect(screen.getAllByText(TABLE_EMPTY_PLACE_HOLDER).length).toBeGreaterThan(0);
  });
});
