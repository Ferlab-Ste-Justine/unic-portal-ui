import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Tag } from 'antd';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { LANG } from '@/types/constants';
import { IResourceEntity } from '@/types/entities';
import getTagColorByType from '@/utils/getTagColorByType';
import { getRSLabelNameByType } from '@/utils/translation';

import styles from '../page.module.css';

const getSummaryDescriptions = (lang: LANG, resourceEntity?: IResourceEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.name'),
    value: resourceEntity?.rs_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  ...(resourceEntity?.rs_is_project
    ? [
        {
          label: intl.get('entities.title'),
          value: <div className={styles.summaryTitle}>{resourceEntity?.rs_title || TABLE_EMPTY_PLACE_HOLDER}</div>,
        },
      ]
    : []),
  {
    label: intl.get('entities.description'),
    value:
      (lang == LANG.FR ? resourceEntity?.rs_description_fr : resourceEntity?.rs_description_en) ||
      TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.type'),
    value: resourceEntity?.rs_type ? (
      <Tag color={getTagColorByType(resourceEntity?.rs_type)}>{getRSLabelNameByType(resourceEntity?.rs_type)}</Tag>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  ...(resourceEntity?.rs_is_project
    ? [
        {
          label: intl.get('entities.researcher'),
          value: resourceEntity?.rs_project_pi || TABLE_EMPTY_PLACE_HOLDER,
        },
      ]
    : []),
  ...(resourceEntity?.rs_is_project && resourceEntity?.rs_project_erb_id
    ? [
        {
          label: intl.get('entities.rs_project_erb_id'),
          value: resourceEntity?.rs_project_erb_id || TABLE_EMPTY_PLACE_HOLDER,
        },
      ]
    : []),
  ...(resourceEntity?.rs_is_project
    ? [
        {
          label: intl.get('entities.approvedAt'),
          value: resourceEntity?.rs_project_approval_date
            ? new Date(resourceEntity?.rs_project_approval_date).toLocaleDateString('en-CA')
            : TABLE_EMPTY_PLACE_HOLDER,
        },
      ]
    : []),
  ...(resourceEntity?.rs_system_collection_starting_year && resourceEntity?.rs_type == 'source_system'
    ? [
        {
          label: intl.get('entities.startingYear'),
          value: resourceEntity.rs_system_collection_starting_year,
        },
      ]
    : []),
];

export default getSummaryDescriptions;
