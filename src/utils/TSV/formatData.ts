import get from 'lodash/get';

const getFieldNestedRecursive = (item: any, key: string): any[] => {
  const keys = key.split('.');
  if (!keys.length) return [];
  const [firstField, ...restFields] = keys;

  // Check if the first field exists in the item and is not undefined
  const value = item[firstField];
  if (value === undefined || value === null) {
    return [];
  }

  if (Array.isArray(value)) {
    if (restFields.length) {
      return value.flatMap((child) => getFieldNestedRecursive(child, restFields.join('.')));
    }
    return value;
  }

  return restFields.length ? getFieldNestedRecursive(value, restFields.join('.')) : [value];
};

const formatData = (data: any[], columns: any[]): Record<string, any>[] => {
  return data.map((item) => {
    const formattedItem: Record<string, any> = {};

    columns.forEach(({ key, label, renderDownload }) => {
      const keyItem = get(item, key);
      const isNestedField = key.split('.').length > 1;

      if (renderDownload && typeof renderDownload === 'function') {
        /** render custom function if exists */
        formattedItem[label] = renderDownload(item);
      } else if (isNestedField) {
        const values = getFieldNestedRecursive(item, key);
        /** join values from array nested field */
        formattedItem[label] = values.length ? values.join(',') : '-';
      } else if (Array.isArray(keyItem)) {
        formattedItem[label] = keyItem.length ? keyItem.join(',') : '-';
      } else {
        formattedItem[label] = keyItem ?? '-';
      }
    });

    return formattedItem;
  });
};

export default formatData;
