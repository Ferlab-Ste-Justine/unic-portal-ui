import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Tooltip } from 'antd';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { LANG } from '@/types/constants';
import { IResourceEntity } from '@/types/entities';

import styles from '../page.module.css';

const getCurrentVersionDescriptions = (lang: LANG, resourceEntity?: IResourceEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.publishedOn'),
    value: resourceEntity?.rs_last_update
      ? new Date(resourceEntity?.rs_last_update).toLocaleDateString('en-CA')
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: (
      <>
        {intl.get('entities.rs_dict_current_version')}
        {resourceEntity?.rs_is_project ? (
          <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.versionTooltip')}>
            <InfoCircleOutlined className={styles.tooltipIcon} />
          </Tooltip>
        ) : (
          ''
        )}
      </>
    ),
    value: resourceEntity?.rs_dict_current_version ? resourceEntity?.rs_dict_current_version : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getCurrentVersionDescriptions;
