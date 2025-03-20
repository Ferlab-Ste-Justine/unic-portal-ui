import { QueryOptions } from '@/types/queries';

import { mergeVariables } from './utils';

describe('mergeVariables', () => {
  test('merges match fields correctly', () => {
    const variables: QueryOptions = {
      match: [
        { field: 'name', value: 'Alice' },
        { field: 'age', value: 30 },
      ],
    };
    const newVariables: QueryOptions = {
      match: [{ field: 'name', value: 'Bob' }], // Should override 'name'
    };
    const searchFields = ['name'];

    const result = mergeVariables(variables, newVariables, searchFields);

    expect(result.match).toEqual([
      { field: 'age', value: 30 }, // Retained from original
      { field: 'name', value: 'Bob' }, // Overridden from newVariables
    ]);
  });

  test('merges OR conditions correctly', () => {
    const variables: QueryOptions = {
      or: [
        { field: 'status', value: 'active' },
        { field: 'role', value: 'admin' },
      ],
    };
    const newVariables: QueryOptions = {
      or: [{ field: 'status', value: 'inactive' }], // Should override 'status'
    };
    const searchFields = ['status'];

    const result = mergeVariables(variables, newVariables, searchFields);

    expect(result.or).toEqual([
      { field: 'role', value: 'admin' }, // Retained
      { field: 'status', value: 'inactive' }, // Overridden
    ]);
  });

  test('merges OR groups correctly', () => {
    const variables: QueryOptions = {
      orGroups: [[{ field: 'category', value: 'A' }], [{ field: 'region', value: 'North' }]],
    };
    const newVariables: QueryOptions = {
      orGroups: [[{ field: 'category', value: 'B' }]], // Should override 'category'
    };
    const searchFields = ['category'];

    const result = mergeVariables(variables, newVariables, searchFields);

    expect(result.orGroups).toEqual([
      [{ field: 'region', value: 'North' }], // Retained
      [{ field: 'category', value: 'B' }], // Overridden
    ]);
  });

  test('returns same variables if no search fields match', () => {
    const variables: QueryOptions = {
      match: [{ field: 'name', value: 'Alice' }],
      or: [],
      orGroups: [],
    };
    const newVariables: QueryOptions = {
      match: [{ field: 'email', value: 'alice@example.com' }],
    };
    const searchFields = ['phone']; // No matching fields

    const result = mergeVariables(variables, newVariables, searchFields);

    expect(result).toEqual(variables); // Nothing should change
  });

  test('handles empty variables gracefully', () => {
    const result = mergeVariables({}, { match: [{ field: 'name', value: 'Alice' }] }, ['name']);

    expect(result).toEqual({ match: [{ field: 'name', value: 'Alice' }], or: [], orGroups: [] });
  });

  test('handles missing fields in variables', () => {
    const variables: QueryOptions = { match: [{ field: 'age', value: 25 }] };
    const newVariables: QueryOptions = { or: [{ field: 'status', value: 'active' }] };

    const result = mergeVariables(variables, newVariables, ['status']);

    expect(result).toEqual({
      match: [{ field: 'age', value: 25 }],
      or: [{ field: 'status', value: 'active' }],
      orGroups: [],
    });
  });

  test('handles errors gracefully', () => {
    const brokenVariables: any = { match: 'invalid' }; // Invalid structure
    const newVariables: QueryOptions = { match: [{ field: 'name', value: 'Alice' }] };

    console.error = jest.fn();

    const result = mergeVariables(brokenVariables, newVariables, ['name']);

    expect(console.error).toHaveBeenCalledWith('[mergeVariables] error', expect.any(Error));
    expect(result).toEqual(brokenVariables);
  });
});
