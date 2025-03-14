import { Card } from 'antd';
import React from 'react';

import { IEntityCard } from '@/components/EntityPage/types/entityPage';

import styles from './EntityCard.module.css';

const EntityCard = ({ id = '', loading, title, children }: IEntityCard) => (
  <div className={styles.entityCard}>
    <Card className={styles.card} id={id} loading={loading} title={title}>
      {children}
    </Card>
  </div>
);

export default EntityCard;
