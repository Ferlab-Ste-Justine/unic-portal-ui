import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import intl from 'react-intl-universal';

import styles from '@/app/resource/[slug]/page.module.css';
import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';
import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';

const getSummaryDescriptions = (lang: LANG, tableEntity?: ITableEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.name'),
    value: tableEntity?.tab_name || TABLE_EMPTY_PLACE_HOLDER,
  },
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
  {
    label: intl.get('entities.table.tab_entity_type'),
    value: tableEntity?.tab_entity_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.Domain'),
    value: tableEntity?.tab_domain || TABLE_EMPTY_PLACE_HOLDER,
  },
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
];

export default getSummaryDescriptions;
