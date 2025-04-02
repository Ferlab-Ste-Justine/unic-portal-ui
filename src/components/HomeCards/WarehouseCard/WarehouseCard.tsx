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
import AccountsStorage from './AccountsStorage';
import styles from './WarehouseCard.module.css';

const { Text } = Typography;

const WarehouseCard = ({ stats }: IStatsCardProps) => {
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
            <b>{numberFormat(stats?.table_count || 0)}</b> {intl.get('entities.table.tables')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'orange'}>
            <b>{numberFormat(stats?.variable_count || 0)}</b> {intl.get('entities.variable.variables')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'orange'}>
            <b>{numberFormat(stats?.source_system_count || 0)}</b> {intl.get('entities.source_system.source_systems')}
          </Tag>
          <Tag className={styles.homeCardStatTag} color={'orange'}>
            <b>{numberFormat(stats?.domain_count || 0)}</b> {intl.get('entities.domains')}
          </Tag>
        </div>
        <Link
          href={`/catalog#${RESOURCES_TAB_KEY}`}
          onClick={() =>
            store.dispatch(
              globalActions.setFilters([{ key: 'rs_type', values: ['warehouse'], tabKey: RESOURCES_TAB_KEY }]),
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

export default WarehouseCard;
