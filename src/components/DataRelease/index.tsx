import { FileTextOutlined, GoldOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import MultiLabel, { MultiLabelIconPositionEnum } from '@ferlab/ui/core/components/labels/MultiLabel';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Col, Row, Spin } from 'antd';
// import { useEffect } from 'react';
import intl from 'react-intl-universal';

// import { useDispatch } from 'react-redux';
// import { useGlobals } from '@/store/global';
// import { fetchStats } from 'store/global/thunks';
import styles from './index.module.css';

interface IDataReleaseProps {
  className?: string;
}

const DataRelease = ({ className = '' }: IDataReleaseProps) => {
  // const dispatch = useDispatch();
  // const { stats } = useGlobals();

  // useEffect(() => {
  //   dispatch(fetchStats());
  // eslint-disable-next-line
  // }, []);

  const stats = {
    projects: 14,
    participants: 2500000,
    sources: 24,
    variables: 20000,
  };

  return (
    <Spin spinning={false}>
      <Row className={`${styles.dataReleaseContainer} ${className}`} gutter={[16, 16]}>
        <Col flex='auto'>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(stats.projects)}
            Icon={<ReadOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.project.projects')}
          />
        </Col>
        <Col flex='auto'>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(stats.participants)}
            Icon={<UserOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.participant.participants')}
          />
        </Col>
        <Col flex='auto'>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(stats.sources)}
            Icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.source.sources')}
          />
        </Col>
        <Col flex='auto'>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(stats.variables)}
            Icon={<GoldOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.variable.variables')}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default DataRelease;
