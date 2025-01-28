import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Typography } from 'antd';
import intl from 'react-intl-universal';

import { IStatsCardProps } from '@/components/HomeCards/type';

import Bubbles from '../Bubbles';
import CaduceusMedecine from './CaduceusMedecine';
import styles from './HospitalSystemsCard.module.css';

const { Text } = Typography;

const HospitalSystemsCard = ({ stats }: IStatsCardProps) => {
  return (
    <Card className={styles.homeCard}>
      <Bubbles className={styles.homeBubbles} />
      <div className={styles.homeCardContent}>
        <div className={styles.homeCardHeader}>
          <CaduceusMedecine />
          <Text className={styles.homeCardTitle}>{intl.get('screen.home.hospitalSystems.title')}</Text>
        </div>
        <Text className={styles.homeCardDescription}>{intl.get('screen.home.hospitalSystems.description')}</Text>
        <div className={styles.homeCardStats}>
          <Tag className={styles.homeCardStatTag} color={'purple'}>
            <b>{stats?.project_count || 1}</b> {intl.get('entities.project.projects')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'purple'}>
            <b>{stats?.variable_count}</b> {intl.get('entities.variable.variables')}
          </Tag>
        </div>
        <Button href={'/catalog#source_system'} className={styles.homeCardButton}>
          {intl.get('screen.home.explore')}
          <ArrowRightOutlined />
        </Button>
      </div>
    </Card>
  );
};

export default HospitalSystemsCard;
