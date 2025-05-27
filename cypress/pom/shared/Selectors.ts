export const CommonSelectors = {
    dropdown: '[class*="ant-select-dropdown"]',
    label: (text: string) => `[label="${text}"]`,
    link: '[href], a',
    tableCell: '[class*="ant-table-cell"]',
    tableHead: 'thead[class="ant-table-thead"]',
    tableRow: 'tr[class*="ant-table-row"]',
    tag: (color: string) => `[class*="ant-tag-${color}"]`,
    tooltipIcon: '[class*="page_tooltipIcon"]',
  };
  