import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import HeaderLink from '@/components/Header/HeaderLink';

describe('HeaderLink Component', () => {
  it('renders the link with the correct title', () => {
    render(<HeaderLink to='/home' currentPathName='/dashboard' title='Home' />);

    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('applies active class when currentPathName matches to', () => {
    render(<HeaderLink to='/home' currentPathName='/home' title='Home' />);

    const button = screen.getByRole('button', { name: 'Home' });
    expect(button).toHaveClass('headerBtnActive'); // Assuming the CSS module applies this class
  });

  it('does not apply active class when currentPathName does not match to', () => {
    render(<HeaderLink to='/home' currentPathName='/dashboard' title='Home' />);

    const button = screen.getByRole('button', { name: 'Home' });
    expect(button).not.toHaveClass('headerBtnActive');
  });

  it('uses the first item from an array when multiple paths are provided', () => {
    render(<HeaderLink to={['/home', '/dashboard']} currentPathName='/dashboard' title='Home' />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/home');
  });

  it('renders the provided icon', () => {
    render(
      <HeaderLink to='/home' currentPathName='/dashboard' title='Home' icon={<span data-testid='icon'>🏠</span>} />,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders with an external target attribute when specified', () => {
    render(<HeaderLink to='/home' currentPathName='/dashboard' title='Home' target='_blank' />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('allows clicking the link', async () => {
    render(<HeaderLink to='/home' currentPathName='/dashboard' title='Home' />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(link).toHaveAttribute('href', '/home');
  });
});
