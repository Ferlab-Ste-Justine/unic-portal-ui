import { IProTableDictionary } from '@ferlab/ui/core/components/ProTable/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import intl from 'react-intl-universal';

export const getProTableDictionary = (): IProTableDictionary => ({
  numberFormat,
  table: {
    emptyText: intl.get('global.proTable.noResults'),
  },
  itemCount: {
    result: intl.get('global.proTable.result'),
    results: intl.get('global.proTable.results'),
    noResults: intl.get('global.proTable.noResults'),
    of: intl.get('global.proTable.of'),
    selected: intl.get('global.proTable.selected'),
    selectedPlural: intl.get('global.proTable.selectedPlural'),
    selectAllResults: intl.get('global.proTable.selectAllResults'),
    clear: intl.get('global.proTable.clear'),
    clearFilters: intl.get('global.proTable.clearFilters'),
  },
  tooltips: {
    tableExport: intl.get('global.proTable.tableExport'),
  },
  columnSelector: {
    reset: intl.get('global.proTable.reset'),
    tooltips: {
      columns: intl.get('global.proTable.columns'),
    },
  },
  pagination: {
    first: intl.get('global.proTable.first'),
    previous: intl.get('global.proTable.previous'),
    next: intl.get('global.proTable.next'),
    view: intl.get('global.proTable.view'),
  },
});
