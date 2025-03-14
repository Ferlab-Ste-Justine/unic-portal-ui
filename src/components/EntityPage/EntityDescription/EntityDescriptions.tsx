import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import Empty from '@ferlab/ui/core/components/Empty/index';
import { Descriptions, Space } from 'antd';
import React from 'react';

import { IEntityDescriptions } from '@/components/EntityPage/types/entityPage';

import styles from './EntityDescriptions.module.css';

const EntityDescriptions = ({ descriptions }: IEntityDescriptions) => (
  <div className={styles.entityDescription}>
    {descriptions.length > 0 ? (
      <Space className={styles.content} direction='vertical' size={0}>
        <Descriptions bordered column={1} size='small'>
          {descriptions.map((description, index) => (
            <Descriptions.Item key={`${description.label}:${index}`} label={description.label}>
              {description.value || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Space>
    ) : (
      <Empty align='left' noPadding showImage={false} />
    )}
  </div>
);

export default EntityDescriptions;
