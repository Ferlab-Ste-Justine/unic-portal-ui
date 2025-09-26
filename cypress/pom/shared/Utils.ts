/// <reference types="cypress"/>

import { CommonSelectors } from "./Selectors";

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
 * Gets the position (index) of a column in the application table by column ID.
 * @param tableHead The table head.
 * @param columns The array of column objects.
 * @param columnID The ID of the column.
 * @param eq The index of the table (default: 0).
 * @returns A Cypress chain containing the column position (0-based) or -1 if not found
 */
export const getColumnPosition = (tableHead: string, columns: any, columnID: string, eq: number = 0) => {
  const columnName = getColumnName(columns, columnID);
  return cy.get(`${tableHead}`).eq(eq).find(`${CommonSelectors.tableCellHead}`).then($cells => {
    let position;
    if (columnName.startsWith('[')) {
      position = Array.from($cells).findIndex($cell => {
        return Cypress.$($cell).find(columnName).length > 0;
      });
    } else {
      position = Array.from($cells).findIndex($cell => $cell.textContent?.match(stringToRegExp(columnName, true)));
    }

    return position;
  });
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
 * Checks if the current environment is a FERLEASE environment.
 * Determines this by checking if CYPRESS_BASE_URL contains 'unicweb-' or 'unic-'.
 * @returns True if running in a FERLEASE environment, false otherwise.
 */
export const isFerlease = (): boolean => {
  const url = process.env.CYPRESS_BASE_URL !== undefined ? process.env.CYPRESS_BASE_URL : '';
  return (url.includes('unicweb-') || url.includes('unic-'));
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