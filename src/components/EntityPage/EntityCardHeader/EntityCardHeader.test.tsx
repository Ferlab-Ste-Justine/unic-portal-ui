import { render, screen } from '@testing-library/react';
import React from 'react';

import EntityCardHeader from '@/components/EntityPage/EntityCardHeader/EntityCardHeader';

jest.mock('@/utils/translation', () => ({
  getRSLabelNameByType: jest.fn((type) => type),
}));

describe('EntityCardHeader', () => {
  it('renders the correct icon for research_project type', () => {
    render(<EntityCardHeader name='Test Project' type='eqp' />);
    expect(screen.getByTestId('financial-report-icon')).toBeInTheDocument();
  });

  it('renders the correct icon for source_system type', () => {
    render(<EntityCardHeader name='Test System' type='source_system' />);
    expect(screen.getByTestId('caduceus-medicine-icon')).toBeInTheDocument();
  });

  it('renders the correct name', () => {
    render(<EntityCardHeader name='Test Name' type='research_project' />);
    expect(screen.getByText('Test Name')).toBeInTheDocument();
  });

  it('renders the extra tag if provided', () => {
    render(<EntityCardHeader name='Test Name' type='research_project' extraTag='Extra Tag' />);
    expect(screen.getByText('Extra Tag')).toBeInTheDocument();
  });

  it('renders the correct icon for variable type', () => {
    render(<EntityCardHeader name='Test Name' type='variable' />);
    expect(screen.getByTestId('keywording-tools-icon')).toBeInTheDocument();
  });
});
