import { ArrowRightOutlined } from '@ant-design/icons';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Button, Card, Tag, Typography } from 'antd';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { IStatsCardProps } from '@/components/HomeCards/type';
import { store } from '@/store';
import { globalActions } from '@/store/global';
import { RESOURCES_TAB_KEY } from '@/utils/constants';

import Bubbles from '../Bubbles';
import styles from './EQPProjectsCard.module.css';
import FinancialReport from './FinancialReport';

const { Text } = Typography;

const EQPProjectsCard = ({ stats }: IStatsCardProps) => {
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
          <Tag className={styles.homeCardStatTag} color={'blue'}>
            <b>{numberFormat(stats?.project_count || 1)}</b> {intl.get('entities.project.projects')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'blue'}>
            <b>{numberFormat(stats?.variable_count || 0)}</b> {intl.get('entities.variable.variables')}
          </Tag>
        </div>
        <Link
          href={`/catalog#${RESOURCES_TAB_KEY}`}
          onClick={() =>
            store.dispatch(globalActions.setFilters([{ key: 'rs_type', values: ['eqp'], tabKey: RESOURCES_TAB_KEY }]))
          }
        >
          <Button>
            {intl.get('screen.home.explore')}
            <ArrowRightOutlined />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default EQPProjectsCard;
