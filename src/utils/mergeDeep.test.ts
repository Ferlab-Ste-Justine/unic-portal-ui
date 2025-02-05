import { expect } from '@jest/globals';

import mergeDeep, { isObject } from '@/utils/mergeDeep';

describe('test mergeDeep and isObject', () => {
  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: 'value' })).toBe(true);
    });

    it('should return false for arrays', () => {
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2, 3])).toBe(false);
    });
  });

  describe('mergeDeep', () => {
    it('should deeply merge two objects', () => {
      const target = { a: 1, b: { c: 2 } };
      const source = { b: { d: 3 }, e: 4 };
      const result = mergeDeep(target, source);

      expect(result).toEqual({
        a: 1,
        b: { c: 2, d: 3 },
        e: 4,
      });
    });

    it('should override primitive values', () => {
      const target = { a: 1, b: { c: 2 } };
      const source = { a: 42, b: { c: 100 } };
      const result = mergeDeep(target, source);

      expect(result).toEqual({ a: 42, b: { c: 100 } });
    });

    it('should merge multiple sources', () => {
      const target = { a: 1 };
      const source1 = { b: { c: 2 } };
      const source2 = { b: { d: 3 }, e: 4 };
      const result = mergeDeep(target, source1, source2);

      expect(result).toEqual({
        a: 1,
        b: { c: 2, d: 3 },
        e: 4,
      });
    });

    it('should handle merging arrays as values', () => {
      const target = { a: [1, 2] };
      const source = { a: [3, 4] };
      const result = mergeDeep(target, source);

      expect(result).toEqual({ a: [3, 4] }); // Overwrites array, does not merge
    });

    it('should return the target if no sources are provided', () => {
      const target = { a: 1 };
      const result = mergeDeep(target);

      expect(result).toEqual({ a: 1 });
    });
  });
});
