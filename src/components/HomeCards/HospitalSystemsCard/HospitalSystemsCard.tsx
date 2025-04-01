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
            <b>{numberFormat(stats?.project_count || 1)}</b> {intl.get('entities.source_system.systems')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'purple'}>
            <b>{numberFormat(stats?.variable_count || 0)}</b> {intl.get('entities.variable.variables')}
          </Tag>
        </div>
        <Link
          href={`/catalog#${RESOURCES_TAB_KEY}`}
          onClick={() =>
            store.dispatch(
              globalActions.setFilters([{ key: 'rs_type', values: ['source_system'], tabKey: RESOURCES_TAB_KEY }]),
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

export default HospitalSystemsCard;
