import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { LANG } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';

const getHistory = (lang: LANG, variableEntity?: IVariableEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.createdAt'),
    value: variableEntity?.var_created_at
      ? new Date(variableEntity?.var_created_at).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.updatedAt'),
    value: variableEntity?.var_last_update
      ? new Date(variableEntity?.var_last_update).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getHistory;
