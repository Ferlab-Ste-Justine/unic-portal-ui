import { Card } from 'antd';
import React from 'react';

import { IEntityCard } from '@/components/EntityPage/types/entityPage';

import styles from './EntityCard.module.css';

const EntityCard = ({ loading, title, children }: IEntityCard) => (
  <div className={styles.entityCard}>
    <Card className={styles.card} loading={loading} title={title}>
      {children}
    </Card>
  </div>
);

export default EntityCard;
