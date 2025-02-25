import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/EntityDescription/types/entityPage';
import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';

const getCurrentVersionDescriptions = (lang: LANG, tableEntity?: ITableEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.createdAt'),
    value: tableEntity?.tab_created_at
      ? new Date(tableEntity?.tab_created_at).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.updatedAt'),
    value: tableEntity?.tab_last_update
      ? new Date(tableEntity?.tab_last_update).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getCurrentVersionDescriptions;
