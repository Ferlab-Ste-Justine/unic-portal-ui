import { FileTextOutlined, GoldOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import MultiLabel, { MultiLabelIconPositionEnum } from '@ferlab/ui/core/components/labels/MultiLabel';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Col, Row } from 'antd';
import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useGlobals } from '@/store/global';
import { fetchStats } from '@/store/global/thunks';

import styles from './DataRelease.module.css';

interface IDataReleaseProps {
  className?: string;
}

const DataRelease = ({ className = '' }: IDataReleaseProps) => {
  const dispatch = useDispatch();
  const { stats } = useGlobals();

  useEffect(() => {
    // @ts-expect-error - TS2339: Property 'stats' does not exist on type 'InitialState<unknown>'.
    dispatch(fetchStats());
  }, [dispatch]);

  const { projects_count = 0, source_system_count = 0, variables_count = 0 } = stats || {};
  const participant_count = 2500000;

  return (
    <Row className={`${styles.dataReleaseContainer} ${className}`} gutter={[16, 16]}>
      <Col flex='auto' className={styles.colDataReleaseContainer}>
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(projects_count)}
          Icon={<ReadOutlined className={styles.dataReleaseIcon} />}
          className={styles.dataReleaseStatsLabel}
          subLabel={<span className={styles.dataReleaseStatsSubLabel}>{intl.get('entities.project.Projects')}</span>}
        />
      </Col>
      <Col flex='auto' className={styles.colDataReleaseContainer}>
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(source_system_count)}
          Icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
          className={styles.dataReleaseStatsLabel}
          subLabel={
            <span className={styles.dataReleaseStatsSubLabel}>{intl.get('entities.source_system.Source_systems')}</span>
          }
        />
      </Col>
      <Col flex='auto' className={styles.colDataReleaseContainer}>
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(participant_count)}
          Icon={<UserOutlined className={styles.dataReleaseIcon} />}
          className={styles.dataReleaseStatsLabel}
          subLabel={<span className={styles.dataReleaseStatsSubLabel}>{intl.get('global.participants')}</span>}
        />
      </Col>
      <Col flex='auto' className={styles.colDataReleaseContainer}>
        <MultiLabel
          iconPosition={MultiLabelIconPositionEnum.Top}
          label={numberFormat(variables_count)}
          Icon={<GoldOutlined className={styles.dataReleaseIcon} />}
          className={styles.dataReleaseStatsLabel}
          subLabel={<span className={styles.dataReleaseStatsSubLabel}>{intl.get('entities.variable.Variables')}</span>}
        />
      </Col>
    </Row>
  );
};

export default DataRelease;
