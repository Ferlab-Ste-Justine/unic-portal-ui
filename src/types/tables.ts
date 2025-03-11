import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';

export interface ColumnType extends ProColumnType {
  renderDownload?: (data: any) => string | number;
}
