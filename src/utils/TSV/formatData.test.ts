import formatData from '@/utils/TSV/formatData';

describe('formatData', () => {
  interface IData {
    id: number;
    name: string;
    address: {
      city: string;
      country: string;
    };
    tags: string[];
  }
  const data: IData[] = [
    {
      id: 1,
      name: 'John Doe',
      address: {
        city: 'New York',
        country: 'USA',
      },
      tags: ['admin', 'editor'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: {
        city: 'London',
        country: 'UK',
      },
      tags: ['user'],
    },
  ];

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'address.city', label: 'City' },
    { key: 'tags', label: 'Tags' },
    { key: 'id', label: 'Custom ID', renderDownload: (item: IData) => `ID-${item.id}` },
  ];

  it('formats data correctly', () => {
    const result = formatData(data, columns);

    expect(result).toEqual([
      { Name: 'John Doe', City: 'New York', Tags: 'admin,editor', 'Custom ID': 'ID-1' },
      { Name: 'Jane Smith', City: 'London', Tags: 'user', 'Custom ID': 'ID-2' },
    ]);
  });

  it('handles missing fields correctly', () => {
    const incompleteData = [{ name: 'Alice' }];
    const result = formatData(incompleteData, columns);

    expect(result).toEqual([{ Name: 'Alice', City: '-', Tags: '-', 'Custom ID': 'ID-undefined' }]);
  });

  it('handles null and undefined values correctly', () => {
    const dataWithNulls = [
      { name: null, address: { city: null }, tags: null, id: null },
      { name: undefined, address: { city: undefined }, tags: undefined, id: undefined },
    ];
    const result = formatData(dataWithNulls, columns);

    expect(result).toEqual([
      { Name: '-', City: '-', Tags: '-', 'Custom ID': 'ID-null' },
      { Name: '-', City: '-', Tags: '-', 'Custom ID': 'ID-undefined' },
    ]);
  });
});
