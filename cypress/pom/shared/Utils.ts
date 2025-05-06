export const formatResourceType = (resourceType: string) => {
    const mapping: Record<string, string> = {
      research_project: 'Research',
      warehouse: 'Warehouse',
      eqp: 'EQP',
      hostitalsystems: 'Hospital System',
    };

    return mapping[resourceType];
};

export const formatToK = (value: string | number): string => {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  };

  return num.toString();
};

export const getColumnPosition = (columns: any, columnID: string) => {
  const columnPosition: number | undefined = columns.find((col: { id: string; }) => col.id === columnID)?.position;
  return columnPosition !== undefined ? columnPosition : -1;
};

export const getResourceColor = (resourceType: string) => {
    const mapping: Record<string, string> = {
      research_project: 'cyan',
      warehouse: 'orange',
      eqp: 'blue',
      hostitalsystems: 'purple',
    };

    return mapping[resourceType];
};

export const getResourceIconSelector = (resourceType: string) => {
    const mapping: Record<string, string> = {
      research_project: '[id="study"]',
      warehouse: '[data-testid="accounts-storage-icon"]',
      eqp: '[data-testid="financial-report-icon"]',
      hostitalsystems: '[data-testid="caduceus-medicine-icon"]',
    };

    return mapping[resourceType];
};
