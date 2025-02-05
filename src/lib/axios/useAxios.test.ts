import { expect } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';

import axios from '@/lib/axios';
import useAxios from '@/lib/axios/useAxios';

jest.mock('@/lib/axios');

describe('useAxios hook', () => {
  const mockUrl = '/api/test';
  const mockResponse = { data: { message: 'Success' } };
  const mockAxios = axios as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.mockResolvedValue(mockResponse);
  });

  it('should initialize with correct default values', async () => {
    const { result } = renderHook(() => useAxios(mockUrl));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it('should fetch data successfully', async () => {
    const { result } = renderHook(() => useAxios(mockUrl));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockResponse.data);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('Request failed');
    mockAxios.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useAxios(mockUrl));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  it('should allow re-fetching data', async () => {
    mockAxios.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAxios(mockUrl));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockResponse.data);

    const newMockResponse = { data: { message: 'Updated Data' } };
    mockAxios.mockResolvedValueOnce(newMockResponse);

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.data).toEqual(newMockResponse.data));
  });
});
