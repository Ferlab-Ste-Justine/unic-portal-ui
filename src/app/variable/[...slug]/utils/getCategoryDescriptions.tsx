import { Input } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/EntityDescription/types/entityPage';
import { LANG } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';

const getSummaryDescriptions = (lang: LANG, variableEntity?: IVariableEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.values'),
    value: <Input placeholder={intl.get('global.research')} />,
  },
  {
    label: intl.get('entities.label'),
    value: <Input placeholder={intl.get('global.research')} />,
  },
];

export default getSummaryDescriptions;
