import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Tooltip } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

import styles from '@/app/resource/[slug]/page.module.css';
import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { LANG } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';

const getHistory = (lang: LANG, variableEntity?: IVariableEntity): IEntityDescriptionsItem[] => [
  {
    label: (
      <>
        {intl.get('entities.createdAt')}
        <Tooltip
          arrowPointAtCenter
          placement='topLeft'
          title={intl.get('entities.createdAtInfo', { resType: intl.get('entities.variable.variable') })}
        >
          <InfoCircleOutlined className={styles.tooltipIcon} />
        </Tooltip>
      </>
    ),
    value: variableEntity?.var_created_at
      ? new Date(variableEntity?.var_created_at).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: (
      <>
        {intl.get('entities.updatedAt')}
        <Tooltip
          arrowPointAtCenter
          placement='topLeft'
          title={intl.get('entities.updatedAtInfo', { resType: intl.get('entities.variable.variable') })}
        >
          <InfoCircleOutlined className={styles.tooltipIcon} />
        </Tooltip>
      </>
    ),
    value: variableEntity?.var_last_update
      ? new Date(variableEntity?.var_last_update).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getHistory;
