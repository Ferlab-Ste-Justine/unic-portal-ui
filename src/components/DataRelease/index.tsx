import { FileTextOutlined, GoldOutlined, ReadOutlined } from '@ant-design/icons';
import MultiLabel, { MultiLabelIconPositionEnum } from '@ferlab/ui/core/components/labels/MultiLabel';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Col, Row, Spin } from 'antd';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useGlobals } from '@/store/global';
import { fetchStats } from '@/store/global/thunks';

import styles from './index.module.css';

interface IDataReleaseProps {
  className?: string;
}

const DataRelease = ({ className = '' }: IDataReleaseProps) => {
  const dispatch = useDispatch();
  const { stats } = useGlobals();
  // @ts-expect-error - TS2339: Property 'stats' does not exist on type 'InitialState<unknown>'.
  dispatch(fetchStats());

  const { projects_count = 0, source_system_count = 0, variables_count = 0 } = stats || {};

  return (
    <Spin spinning={false}>
      <Row className={`${styles.dataReleaseContainer} ${className}`} gutter={[16, 16]}>
        <Col flex='auto'>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(projects_count)}
            Icon={<ReadOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.project.projects')}
          />
        </Col>
        <Col flex='auto'>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(source_system_count)}
            Icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.source.sources')}
          />
        </Col>
        <Col flex='auto'>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(variables_count)}
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
