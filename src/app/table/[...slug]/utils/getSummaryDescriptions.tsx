import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import intl from 'react-intl-universal';

import styles from '@/app/resource/[slug]/page.module.css';
import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';

const getSummaryDescriptions = (lang: LANG, tableEntity?: ITableEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.resource.Resource'),
    value: tableEntity?.resource?.rs_name ? (
      <Link href={`/resource/${tableEntity?.resource?.rs_code}`}>{tableEntity?.resource.rs_name}</Link>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.description'),
    value: (lang == LANG.FR ? tableEntity?.tab_label_fr : tableEntity?.tab_label_en) || TABLE_EMPTY_PLACE_HOLDER,
  },
  ...(tableEntity?.tab_entity_type
    ? [
        {
          label: (
            <>
              {intl.get('entities.table.tab_entity_type')}
              <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.table.tab_entity_type_info')}>
                <InfoCircleOutlined className={styles.tooltipIcon} />
              </Tooltip>
            </>
          ),
          value: tableEntity?.tab_entity_type || TABLE_EMPTY_PLACE_HOLDER,
        },
      ]
    : []),
  ...(tableEntity?.tab_domain
    ? [
        {
          label: (
            <>
              {intl.get('entities.Domain')}
              <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.DomainInfo')}>
                <InfoCircleOutlined className={styles.tooltipIcon} />
              </Tooltip>
            </>
          ),
          value: tableEntity?.tab_domain || TABLE_EMPTY_PLACE_HOLDER,
        },
      ]
    : []),
  ...(tableEntity?.tab_row_filter
    ? [
        {
          label: (
            <>
              {intl.get('entities.rowFilter')}
              <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.rowFilterTooltip')}>
                <InfoCircleOutlined className={styles.tooltipIcon} />
              </Tooltip>
            </>
          ),
          value: tableEntity?.tab_row_filter || TABLE_EMPTY_PLACE_HOLDER,
        },
      ]
    : []),
];

export default getSummaryDescriptions;
