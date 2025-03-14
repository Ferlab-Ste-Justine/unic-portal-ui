import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

import client from '@/lib/graphql/ApolloClient';
import fetchAllData from '@/utils/TSV/fetchAllData';

jest.mock('@/lib/graphql/ApolloClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

describe('fetchAllData', () => {
  const mockQuery: DocumentNode = gql`
    query GetItems($search_after: [String], $size: Int) {
      items(search_after: $search_after, size: $size) {
        hits {
          id
          name
          search_after
        }
      }
    }
  `;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all pages of data and concatenate the results', async () => {
    (client.query as jest.Mock)
      .mockResolvedValueOnce({
        data: {
          items: {
            hits: [
              { id: '1', name: 'Item 1', search_after: ['1'] },
              { id: '2', name: 'Item 2', search_after: ['2'] },
            ],
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: {
            hits: [
              { id: '3', name: 'Item 3', search_after: ['3'] },
              { id: '4', name: 'Item 4', search_after: ['4'] },
            ],
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: {
            hits: [], // Final page with no hits
          },
        },
      });

    const result = await fetchAllData(mockQuery, {});

    expect(client.query).toHaveBeenCalledTimes(3);
    expect(client.query).toHaveBeenCalledWith({
      query: mockQuery,
      variables: { search_after: null, size: 10000 },
    });
    expect(client.query).toHaveBeenCalledWith({
      query: mockQuery,
      variables: { search_after: ['2'], size: 10000 },
    });
    expect(client.query).toHaveBeenCalledWith({
      query: mockQuery,
      variables: { search_after: ['4'], size: 10000 },
    });

    expect(result).toEqual([
      { id: '1', name: 'Item 1', search_after: ['1'] },
      { id: '2', name: 'Item 2', search_after: ['2'] },
      { id: '3', name: 'Item 3', search_after: ['3'] },
      { id: '4', name: 'Item 4', search_after: ['4'] },
    ]);
  });

  it('should return an empty array if no data is found', async () => {
    (client.query as jest.Mock).mockResolvedValueOnce({
      data: {
        items: {
          hits: [],
        },
      },
    });

    const result = await fetchAllData(mockQuery, {});
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should throw an error if the query fails', async () => {
    (client.query as jest.Mock).mockRejectedValue(new Error('Query failed'));

    await expect(fetchAllData(mockQuery, {})).rejects.toThrow('Query failed');
    expect(client.query).toHaveBeenCalledTimes(1);
  });
});
