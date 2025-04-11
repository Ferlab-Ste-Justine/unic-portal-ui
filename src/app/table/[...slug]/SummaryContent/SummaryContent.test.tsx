import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { ITableEntity } from '@/types/entities';

import SummaryContent from './SummaryContent';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock translations to return key names
}));

describe('SummaryContent Component', () => {
  const mockTableEntity: ITableEntity = {
    resource: {
      rs_name: 'Test Resource Name',
      rs_code: 'test-code',
      rs_id: 0,
      rs_system_collection_starting_year: 0,
      rs_type: '',
      rs_title: '',
      rs_dict_current_version: '',
      rs_last_update: 0,
      rs_description_en: '',
      rs_description_fr: '',
      rs_project_pi: '',
      rs_project_erb_id: '',
      rs_is_project: false,
      rs_project_approval_date: 0,
      rs_project_creation_date: 0,
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
    tab_label_en: 'Test Description EN',
    tab_label_fr: 'Test Description FR',
    tab_entity_type: 'Test Entity Type',
    tab_domain: 'Test Domain',
    tab_row_filter: 'Test Row Filter',
    tab_id: 12,
    tab_name: '',
    stat_etl: {
      variable_count: 57,
      table_count: 3,
      project_count: 0,
      domain_count: 0,
      source_system_count: 0,
    },
    tab_created_at: '',
    tab_last_update: '',
    search_after: [],
  };

  const mockStore = configureStore([]);
  const store = mockStore({
    global: { lang: 'en' },
  });

  it('renders resource name with a link when available', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockTableEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Resource Name')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Test Resource Name' })).toHaveAttribute('href', '/resource/test-code');
  });

  it('renders description based on language', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockTableEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Description EN')).toBeInTheDocument();
  });

  it('renders entity type when available', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockTableEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Entity Type')).toBeInTheDocument();
  });

  it('renders domain when available', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockTableEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Domain')).toBeInTheDocument();
  });

  it('renders row filter when available', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockTableEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Row Filter')).toBeInTheDocument();
  });
});
