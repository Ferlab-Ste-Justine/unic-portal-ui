import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Typography } from 'antd';
import intl from 'react-intl-universal';

import Bubbles from '../Bubbles';
import AccountsStorage from './AccountsStorage';
import styles from './WarehouseCard.module.css';

const { Text } = Typography;

interface IWarehouseCardProps {
  stats?: {
    table_count?: number;
    variable_count?: number;
    source_system_count?: number;
    domain_count?: number;
    project_count?: number;
  };
}

const WarehouseCard = ({ stats }: IWarehouseCardProps) => {
  return (
    <Card className={styles.homeCard}>
      <Bubbles className={styles.homeBubbles} />
      <div className={styles.homeCardContent}>
        <div className={styles.homeCardHeader}>
          <AccountsStorage />
          <Text className={styles.homeCardTitle}>{intl.get('screen.home.warehouse.title')}</Text>
        </div>
        <Text className={styles.homeCardDescription}>{intl.get('screen.home.warehouse.description')}</Text>
        <div className={styles.homeCardStats}>
          <Tag className={styles.homeCardStatTag} color={'orange'}>
            <b>{stats?.table_count}</b> {intl.get('entities.table.tables')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'orange'}>
            <b>{stats?.variable_count}</b> {intl.get('entities.variable.variables')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'orange'}>
            <b>{stats?.source_system_count}</b> {intl.get('entities.source_system.source_systems')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'orange'}>
            <b>{stats?.domain_count}</b> {intl.get('entities.domain.domains')}
          </Tag>
        </div>
        <Button href={'/catalog'} className={styles.homeCardButton}>
          {intl.get('screen.home.explore')}
          <ArrowRightOutlined />
        </Button>
      </div>
    </Card>
  );
};

export default WarehouseCard;
