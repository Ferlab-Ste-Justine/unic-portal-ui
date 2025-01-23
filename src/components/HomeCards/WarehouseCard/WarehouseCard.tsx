import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Typography } from 'antd';
import intl from 'react-intl-universal';

import Bubbles from '../Bubbles';
import AccountsStorage from './AccountsStorage';
import styles from './WarehouseCard.module.css';

const { Text } = Typography;

interface IHomeCardProps {
  stats: {
    value: string;
    label: string;
  }[];
}

const WarehouseCard = ({ stats }: IHomeCardProps) => {
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
          {stats.map((stat) => (
            <div key={stat.label} className={styles.homeCardStat}>
              <Tag className={styles.homeCardStatTag} color={'orange'}>
                <b>{stat.value}</b> {stat.label}
              </Tag>
            </div>
          ))}
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
