/// <reference types="cypress"/>
export const CommonSelectors = {
    clearSelect: '[class="ant-select-clear"]',
    closeIcon: '[data-icon="close"]',
    download: '[data-icon="download"]',
    dropdown: '[class*="ant-select-dropdown"]',
    label: (text: string) => `[label="${text}"]`,
    link: '[href], a',
    sourceLink: '[class*="SourceLink"]',
    tableCell: '[class*="ant-table-cell"]',
    tableHead: 'thead[class="ant-table-thead"]',
    tableRow: 'tr[class*="ant-table-row"]',
    tag: `[class="ant-tag"]`,
    tagColor: (color: string) => `[class*="ant-tag-${color}"]`,
    title: (text: string) => `[title="${text}"]`,
    tooltipIcon: '[class*="page_tooltipIcon"]',
  };
  