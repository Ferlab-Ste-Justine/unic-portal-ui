import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Tooltip } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

import styles from '@/app/resource/[slug]/page.module.css';
import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';

const getCurrentVersionDescriptions = (lang: LANG, tableEntity?: ITableEntity): IEntityDescriptionsItem[] => [
  {
    label: (
      <>
        {intl.get('entities.createdAt')}
        <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.createdAtInfo')}>
          <InfoCircleOutlined className={styles.tooltipIcon} />
        </Tooltip>
      </>
    ),
    value: tableEntity?.tab_created_at
      ? new Date(tableEntity?.tab_created_at).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: (
      <>
        {intl.get('entities.updatedAt')}
        <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.updatedAtInfo')}>
          <InfoCircleOutlined className={styles.tooltipIcon} />
        </Tooltip>
      </>
    ),
    value: tableEntity?.tab_last_update
      ? new Date(tableEntity?.tab_last_update).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getCurrentVersionDescriptions;
