import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Tag, Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import intl from 'react-intl-universal';

import styles from '@/app/resource/[slug]/page.module.css';
import { IEntityDescriptionsItem } from '@/components/EntityPage/EntityDescription/types/entityPage';
import { LANG } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';
import getTagColorByType from '@/utils/getTagColorByType';
import { getTagNameByType } from '@/utils/translation';

const getSummaryDescriptions = (lang: LANG, variableEntity?: IVariableEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.name'),
    value: variableEntity?.var_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.description'),
    value:
      (lang == LANG.FR ? variableEntity?.var_description_fr : variableEntity?.var_description_en) ||
      TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.resource.Resource'),
    value: variableEntity?.resource?.rs_name ? (
      <Link href={`/resource/${variableEntity?.resource?.rs_code}`}>{variableEntity?.resource.rs_name}</Link>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.table.Table'),
    value: variableEntity?.resource?.rs_name ? (
      <Link href={`/table/${variableEntity?.resource?.rs_code}/${variableEntity?.table?.tab_name}`}>
        {variableEntity?.table.tab_name}
      </Link>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.type'),
    value: variableEntity?.var_value_type ? (
      <Tag color='gray'>{variableEntity?.var_value_type}</Tag>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
];

export default getSummaryDescriptions;
