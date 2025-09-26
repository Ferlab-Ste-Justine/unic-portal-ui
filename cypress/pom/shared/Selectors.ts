/// <reference types="cypress"/>
export const CommonSelectors = {
    clearSelect: '[class="ant-select-clear"]',
    closeIcon: '[data-icon="close"]',
    downloadIcon: '[data-icon="download"]',
    dropdown: '[class*="ant-select-dropdown"]',
    fileTextIcon: '[data-icon="file-text"]',
    goldIcon: '[data-icon="gold"]',
    headerButton: '[class*="Header_headerBtn"]',
    label: (text: string) => `[label="${text}"]`,
    link: '[href], a',
    readIcon: '[data-icon="read"]',
    sourceLink: '[class*="SourceLink"]',
    tableCell: '[class*="ant-table-cell"]',
    tableCellHead: 'th',
    tableHead: 'thead[class="ant-table-thead"]',
    tableRow: 'tr[class*="ant-table-row"]',
    tag: `[class="ant-tag"]`,
    tagColor: (color: string) => `[class*="ant-tag-${color}"]`,
    title: (text: string) => `[title="${text}"]`,
    tooltipIcon: '[class*="page_tooltipIcon"]',
    userIcon: '[data-icon="user"]',
  };
  