import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { IResourceEntity } from '@/types/entities';
import { TABLE_EMPTY_PLACE_HOLDER } from '@/utils/constants';

import SummaryContent from './SummaryContent';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key), // Mock translations to return key names
}));

describe('InputSelect Component', () => {
  const mockResourceEntity: IResourceEntity = {
    rs_is_project: true,
    rs_title: 'Test Project Title',
    rs_description_en: 'Test Description EN',
    rs_description_fr: 'Test Description FR',
    rs_project_pi: 'Test Researcher',
    rs_project_erb_id: 'ERB12345',
    rs_project_approval_date: 12345, //'1969-12-31'
    rs_system_collection_starting_year: 2020,
    rs_type: 'source_system',
    rs_id: 0,
    rs_dict_current_version: '',
    rs_last_update: 0,
    rs_name: '',
    rs_code: '',
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
  };

  beforeEach(() => {
    // mockHandleSetVariables.mockClear();
  });

  const mockStore = configureStore([]);
  const store = mockStore({
    global: { lang: 'en' },
  });

  it('renders correctly with given props', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockResourceEntity} />
      </Provider>,
    );

    expect(screen.getByText('entities.description')).toBeInTheDocument();
  });

  it('renders project title when rs_is_project is true', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockResourceEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Project Title')).toBeInTheDocument();
  });

  it('renders description based on language', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockResourceEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Description EN')).toBeInTheDocument();
  });

  it('renders researcher name when rs_is_project is true', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockResourceEntity} />
      </Provider>,
    );
    expect(screen.getByText('Test Researcher')).toBeInTheDocument();
  });

  it('renders ERB ID when rs_project_erb_id is present', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockResourceEntity} />
      </Provider>,
    );
    expect(screen.getByText('ERB12345')).toBeInTheDocument();
  });

  it('renders approval date in the correct format', () => {
    const approvalDate = new Date(12345).toLocaleDateString('en-CA');
    render(
      <Provider store={store}>
        <SummaryContent {...mockResourceEntity} />
      </Provider>,
    );
    expect(screen.getByText(approvalDate)).toBeInTheDocument();
  });

  it('renders starting year when rs_type is source_system', () => {
    render(
      <Provider store={store}>
        <SummaryContent {...mockResourceEntity} />
      </Provider>,
    );
    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('renders placeholders when data is missing', () => {
    const emptyResourceEntity: IResourceEntity = {
      rs_id: 0,
      rs_system_collection_starting_year: 0,
      rs_type: '',
      rs_title: '',
      rs_dict_current_version: '',
      rs_last_update: 0,
      rs_description_en: '',
      rs_description_fr: '',
      rs_name: '',
      rs_code: '',
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
    };
    render(
      <Provider store={store}>
        <SummaryContent {...emptyResourceEntity} />
      </Provider>,
    );
    expect(screen.getAllByText(TABLE_EMPTY_PLACE_HOLDER).length).toBeGreaterThan(0);
  });
});
