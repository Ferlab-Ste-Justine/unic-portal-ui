import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import PageLayout from '@/components/PageLayout';

jest.mock('@/store/global', () => ({
  useLang: jest.fn(), // Mock useLang since it has no return value
}));

describe('PageLayout Component', () => {
  it('renders title and children correctly', () => {
    render(
      <PageLayout title='Test Title'>
        <div data-testid='child'>Child Content</div>
      </PageLayout>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <PageLayout title='Main Title' subTitle='This is a subtitle'>
        <p>Content</p>
      </PageLayout>,
    );

    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(
      <PageLayout title='Title Without Subtitle'>
        <p>Content</p>
      </PageLayout>,
    );

    expect(screen.getByText('Title Without Subtitle')).toBeInTheDocument();
    expect(screen.queryByText('This is a subtitle')).not.toBeInTheDocument();
  });

  it('applies custom className to the inner Layout', () => {
    render(
      <PageLayout title='Custom Class' className='custom-class'>
        <p>Content</p>
      </PageLayout>,
    );

    const innerLayout = screen.getByText('Content').closest('section'); // Ant Design Layout renders as <section>
    expect(innerLayout).toHaveClass('custom-class');
  });
});
