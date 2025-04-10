import { render, screen } from '@testing-library/react';

import { IVarFromVariable } from '@/types/entities';

import SourceLink from './SourceLink';

const mockVarFromVariable: IVarFromVariable = {
  resource: { rs_code: '123', rs_name: 'Resource Name' },
  table: { tab_name: 'Table Name' },
  var_name: 'Variable Name',
};

const mockCurrentVariable = {
  rs_code: '123',
  tab_name: 'Table Name',
  var_name: 'Variable Name',
};

describe('SourceLink Component', () => {
  it('renders correctly with provided props', () => {
    render(<SourceLink varFromVariable={mockVarFromVariable} currentVariable={mockCurrentVariable} />);

    expect(screen.getByText('Resource Name')).toBeInTheDocument();
    expect(screen.getByText('Table Name')).toBeInTheDocument();
    expect(screen.getByText('Variable Name')).toBeInTheDocument();
  });

  it('renders correct href for resource link', () => {
    render(<SourceLink varFromVariable={mockVarFromVariable} currentVariable={mockCurrentVariable} />);

    const resourceLink = screen.getByText('Resource Name').closest('a');
    expect(resourceLink).toHaveAttribute('href', '/resource/123');
  });

  it('renders correct href for table link', () => {
    render(<SourceLink varFromVariable={mockVarFromVariable} currentVariable={mockCurrentVariable} />);

    const tableLink = screen.getByText('Table Name').closest('a');
    expect(tableLink).toHaveAttribute('href', '/table/123/Table Name');
  });

  it('renders variable name as a link when it is not the same variable', () => {
    render(
      <SourceLink
        varFromVariable={{
          ...mockVarFromVariable,
          var_name: 'Different Variable',
        }}
        currentVariable={mockCurrentVariable}
      />,
    );

    const variableLink = screen.getByText('Different Variable').closest('a');
    expect(variableLink).toHaveAttribute('href', '/variable/123/Table Name/Different Variable');
  });

  it('renders variable name as plain text when it is the same variable', () => {
    render(<SourceLink varFromVariable={mockVarFromVariable} currentVariable={mockCurrentVariable} />);

    expect(screen.getByText('Variable Name')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Variable Name' })).toBeNull();
  });
});
