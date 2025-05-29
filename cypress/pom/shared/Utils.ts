/// <reference types="cypress"/>

/**
 * Regular expression matching a single digit.
 */
export const varSingleDigit = new RegExp('\\d{1}');

/**
 * Formats the resource type to its display label.
 * @param resourceType The resource type key.
 * @returns The formatted resource type label.
 */
export const formatResourceType = (resourceType: string) => {
    const mapping: Record<string, string> = {
      research_project: 'Research',
      warehouse: 'Warehouse',
      eqp: 'EQP',
      hospitalsystems: 'Hospital System',
    };

    return mapping[resourceType];
};

/**
 * Formats a number to a string with 'K' for thousands (e.g., 13677 -> '13.7K').
 * @param value The value to format (string or number).
 * @returns The formatted string.
 */
export const formatToK = (value: string | number): string => {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  };

  return num.toString();
};

/**
 * Gets the column name from a columns array by column ID.
 * @param columns The array of column objects.
 * @param columnID The ID of the column.
 * @returns The column name, or 'undefined' if not found.
 */
export const getColumnName = (columns: any, columnID: string) => {
  const columnName: string | undefined = columns.find((col: { id: string; }) => col.id === columnID)?.name;
  return columnName !== undefined ? columnName : 'undefined';
};

/**
 * Gets the position (index) of a column from a columns array by column ID.
 * @param columns The array of column objects.
 * @param columnID The ID of the column.
 * @returns The column position, or -1 if not found.
 */
export const getColumnPosition = (columns: any, columnID: string) => {
  const columnPosition: number | undefined = columns.find((col: { id: string; }) => col.id === columnID)?.position;
  return columnPosition !== undefined ? columnPosition : -1;
};

/**
 * Gets the color associated with a resource type.
 * @param resourceType The resource type key.
 * @returns The color string.
 */
export const getResourceColor = (resourceType: string) => {
    const mapping: Record<string, string> = {
      research_project: 'cyan',
      warehouse: 'orange',
      eqp: 'blue',
      hospitalsystems: 'purple',
    };

    return mapping[resourceType];
};

/**
 * Gets the CSS selector for the icon associated with a resource type.
 * @param resourceType The resource type key.
 * @returns The CSS selector string.
 */
export const getResourceIconSelector = (resourceType: string) => {
    const mapping: Record<string, string> = {
      research_project: '[id="study"]',
      warehouse: '[data-testid="accounts-storage-icon"]',
      eqp: '[data-testid="financial-report-icon"]',
      hospitalsystems: '[data-testid="caduceus-medicine-icon"]',
    };

    return mapping[resourceType];
};
