import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Button, Col, Row, Tag, Tooltip } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

import styles from '@/app/variable/[...slug]/SummaryContent/SummaryContent.module.css';
import ExternalLinkIcon from '@/components/Icons/ExternalLinkIcon';
import { useLang } from '@/store/global';
import { LANG } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';

const FieldContent = (label: string | React.ReactNode, description: string | number | React.ReactNode) => (
  <div className={styles.fieldContent}>
    <div className={styles.fieldContentTitle}>{label}</div>
    <div className={styles.fieldContentDescription}>{description}</div>
  </div>
);

const formatDeviationAlgorithm = (str: string) => {
  const parts = str.split(',');
  return (
    <Col>
      {parts.map((p) => (
        <Row className='monospace-text' key={p}>
          {p}
        </Row>
      ))}
    </Col>
  );
};

const SummaryContent = (variableEntity: IVariableEntity) => {
  const lang = useLang();

  return (
    <Col className={styles.summaryContainer}>
      <Row>
        {FieldContent(
          intl.get('entities.label'),
          (lang == LANG.FR ? variableEntity?.var_label_fr : variableEntity?.var_label_en) || TABLE_EMPTY_PLACE_HOLDER,
        )}
      </Row>
      <Row justify='start' gutter={[40, 40]}>
        <Col>
          {FieldContent(
            intl.get('entities.resource.Resource'),
            variableEntity?.resource?.rs_name ? (
              <div className={styles.linkWrapper}>
                <Button className={styles.link} type={'link'} href={`/resource/${variableEntity?.resource?.rs_code}`}>
                  {variableEntity?.resource.rs_name}
                </Button>
                <ExternalLinkIcon className={styles.linkIcon} />
              </div>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          )}
        </Col>
        <Col>
          {FieldContent(
            intl.get('entities.table.Table'),
            variableEntity?.resource?.rs_name ? (
              <div className={styles.linkWrapper}>
                <Button
                  className={styles.link}
                  type={'link'}
                  href={`/table/${variableEntity?.resource?.rs_code}/${variableEntity?.table?.tab_name}`}
                >
                  {variableEntity?.table?.tab_name}
                </Button>
                <ExternalLinkIcon className={styles.linkIcon} />
              </div>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          )}
        </Col>
      </Row>
      {variableEntity?.var_notes && (
        <Row>{FieldContent(intl.get('entities.notes'), variableEntity?.var_notes || TABLE_EMPTY_PLACE_HOLDER)}</Row>
      )}
      <Row justify='start' gutter={[40, 40]}>
        <Col>
          {FieldContent(
            <>
              {intl.get('entities.createdAt')}
              <Tooltip
                arrowPointAtCenter
                placement='topLeft'
                title={intl.get('entities.createdAtInfo', { resType: intl.get('entities.variable.variable') })}
              >
                <InfoCircleOutlined className={styles.tooltipIcon} />
              </Tooltip>
            </>,
            variableEntity?.var_created_at
              ? new Date(variableEntity?.var_created_at).toLocaleDateString('en-CA')
              : TABLE_EMPTY_PLACE_HOLDER,
          )}
        </Col>
        <Col>
          {FieldContent(
            <>
              {intl.get('entities.updatedAt')}
              <Tooltip
                arrowPointAtCenter
                placement='topLeft'
                title={intl.get('entities.updatedAtInfo', { resType: intl.get('entities.variable.variable') })}
              >
                <InfoCircleOutlined className={styles.tooltipIcon} />
              </Tooltip>
            </>,
            variableEntity?.var_last_update
              ? new Date(variableEntity?.var_last_update).toLocaleDateString('en-CA')
              : TABLE_EMPTY_PLACE_HOLDER,
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default SummaryContent;
