import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import useHash from './useHash';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({})),
}));
jest.mock('query-string', () => ({
  stringifyUrl: jest.fn(),
}));

describe('useHash hook', () => {
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = { replace: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    window.location.hash = ''; // Reset hash for each test
  });

  it('should initialize with the current hash', () => {
    window.location.hash = '#test';
    const { result } = renderHook(() => useHash());
    expect(result.current.hash).toBe('test');
  });

  it('should update hash when the hash changes in the URL', () => {
    const { result } = renderHook(() => useHash());

    act(() => {
      window.location.hash = '#anotherHash';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current.hash).toBe('anotherHash');
  });
});
