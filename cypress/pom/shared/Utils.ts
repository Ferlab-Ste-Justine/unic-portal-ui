/// <reference types="cypress"/>

/**
 * Constant represents one minute
 */
export const oneMinute = 60*1000;

/**
 * Regular expression matching a single digit.
 */
export const varSingleDigit = new RegExp('\\d{1}');

/**
 * Builds a RegExp that matches either of the two provided strings exactly.
 * Escapes special RegExp characters in both strings.
 * @param textEN The english string to match.
 * @param textFR The french string to match.
 * @returns A RegExp matching either textEN or textFR.
 */
export const buildBilingualRegExp = (textEN: string, textFR: string): RegExp => {
  const escapeRegExp = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^(${escapeRegExp(textEN)}|${escapeRegExp(textFR)})$`);
};

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
  
  if (num >= 10000) {
    return `${(num / 1000).toFixed(1)}K`;
  };

  return formatWithCommaThousands(num);
};

/**
 * Formats a number to a string with a comma as the thousands separator (e.g., 3677 -> '3,677').
 * If a RegExp is provided, returns its source.
 * @param value The value to format (string, number, or RegExp).
 * @returns The formatted string.
 */
export const formatWithCommaThousands = (value: string | RegExp | number): string => {
  if (value instanceof RegExp) {
    return value.source;
  }
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  return num.toLocaleString('fr-FR').replace(/\u202f/g, ',');
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

/**
 * Returns the current date and time as formatted strings.
 * @returns An object containing:
 *  - strDate: the date in YYYYMMDD format
 *  - strTime: the time in HHMM format
 */
export const getDateTime = () => {
    const date = new Date();
    const joinWithPadding = (l: number[]) => l.reduce((xs, x) => xs + `${x}`.padStart(2, '0'), '');
    const strDate = joinWithPadding([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
    const strTime = joinWithPadding([date.getHours(), date.getMinutes()]);

    return { strDate, strTime };
};

/**
 * Converts a string to a RegExp.
 * Optionally adds ^ and $ to match the whole string.
 * @param str The string to convert.
 * @param exact If true, adds ^ and $ to the pattern (default: false).
 * @returns The constructed RegExp.
 */
export const stringToRegExp = (str: string, exact: boolean = false): RegExp => {
  const replacedStr = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexpStr = exact ? `^${replacedStr}$` : replacedStr;
  return new RegExp(regexpStr);
};