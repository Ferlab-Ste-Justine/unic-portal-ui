import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Typography } from 'antd';
import intl from 'react-intl-universal';

import Bubbles from '../Bubbles';
import styles from './EQPProjectsCard.module.css';
import FinancialReport from './FinancialReport';

const { Text } = Typography;

interface IHomeCardProps {
  stats: {
    value: string;
    label: string;
  }[];
}

const EQPProjectsCard = ({ stats }: IHomeCardProps) => {
  return (
    <Card className={styles.homeCard}>
      <Bubbles className={styles.homeBubbles} />
      <div className={styles.homeCardContent}>
        <div className={styles.homeCardHeader}>
          <FinancialReport />
          <Text className={styles.homeCardTitle}>{intl.get('screen.home.EQPProjects.title')}</Text>
        </div>
        <Text className={styles.homeCardDescription}>{intl.get('screen.home.EQPProjects.description')}</Text>
        <div className={styles.homeCardStats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.homeCardStat}>
              <Tag className={styles.homeCardStatTag} color={'blue'}>
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

export default EQPProjectsCard;
