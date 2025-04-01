import { ArrowRightOutlined } from '@ant-design/icons';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Button, Card, Tag, Typography } from 'antd';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { IStatsCardProps } from '@/components/HomeCards/type';
import { store } from '@/store';
import { globalActions } from '@/store/global';

import Bubbles from '../Bubbles';
import BrandBook from './BrandBook';
import styles from './ResearchProjectsCard.module.css';

const { Text } = Typography;

const ResearchProjectsCard = ({ stats }: IStatsCardProps) => {
  return (
    <Card className={styles.homeCard}>
      <Bubbles className={styles.homeBubbles} />
      <div className={styles.homeCardContent}>
        <div className={styles.homeCardHeader}>
          <BrandBook />
          <Text className={styles.homeCardTitle}>{intl.get('screen.home.researchProjects.title')}</Text>
        </div>
        <Text className={styles.homeCardDescription}>{intl.get('screen.home.researchProjects.description')}</Text>
        <div className={styles.homeCardStats}>
          <Tag className={styles.homeCardStatTag} color={'cyan'}>
            <b>{numberFormat(stats?.project_count || 1)}</b> {intl.get('entities.project.projects')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'cyan'}>
            <b>{numberFormat(stats?.variable_count || 0)}</b> {intl.get('entities.variable.variables')}
          </Tag>
        </div>
        <Link
          href={'/catalog#resources'}
          onClick={() =>
            store.dispatch(
              globalActions.setFilters([{ key: 'rs_type', values: ['research_project'], tabKey: 'resources' }]),
            )
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

export default ResearchProjectsCard;
