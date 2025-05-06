export const CommonSelectors = {
    link: '[href], a',
    tableCell: '[class*="ant-table-cell"]',
    tableHead: 'thead[class="ant-table-thead"]',
    tag: (color: string) => `[class*="ant-tag-${color}"]`,
    tooltipIcon: '[class*="page_tooltipIcon"]',
  };
  