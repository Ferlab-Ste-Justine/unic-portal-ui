/// <reference types="cypress"/>
export const CommonSelectors = {
    clearSelect: '[class="ant-select-clear"]',
    closeIcon: '[data-icon="close"]',
    dropdown: '[class*="ant-select-dropdown"]',
    label: (text: string) => `[label="${text}"]`,
    link: '[href], a',
    tableCell: '[class*="ant-table-cell"]',
    tableHead: 'thead[class="ant-table-thead"]',
    tableRow: 'tr[class*="ant-table-row"]',
    tag: (color: string) => `[class*="ant-tag-${color}"]`,
    title: (text: string) => `[title="${text}"]`,
    tooltipIcon: '[class*="page_tooltipIcon"]',
  };
  