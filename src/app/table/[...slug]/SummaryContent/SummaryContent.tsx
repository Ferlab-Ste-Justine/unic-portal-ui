import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Button, Col, Row, Tooltip } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

import styles from '@/app/table/[...slug]/SummaryContent/SummaryContent.module.css';
import ExternalLinkIcon from '@/components/Icons/ExternalLinkIcon';
import { useLang } from '@/store/global';
import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';

const FieldContent = (label: string | React.ReactNode, description: string | number | React.ReactNode) => (
  <div className={styles.fieldContent}>
    <div className={styles.fieldContentTitle}>{label}</div>
    <div className={styles.fieldContentDescription}>{description}</div>
  </div>
);

const SummaryContent = (tableEntity: ITableEntity) => {
  const lang = useLang();

  return (
    <Col className={styles.summaryContainer}>
      <Row>
        {FieldContent(
          intl.get('entities.resource.Resource'),
          tableEntity?.resource?.rs_name ? (
            <div className={styles.linkWrapper}>
              <Button className={styles.link} type={'link'} href={`/resource/${tableEntity?.resource?.rs_code}`}>
                {tableEntity?.resource.rs_name}
              </Button>
              <ExternalLinkIcon className={styles.linkIcon} />
            </div>
          ) : (
            TABLE_EMPTY_PLACE_HOLDER
          ),
        )}
      </Row>
      <Row>
        {FieldContent(
          intl.get('entities.description'),
          (lang == LANG.FR ? tableEntity?.tab_label_fr : tableEntity?.tab_label_en) || TABLE_EMPTY_PLACE_HOLDER,
        )}
      </Row>
      <Row justify='start' gutter={[40, 40]}>
        {tableEntity?.tab_entity_type && (
          <Col>
            {FieldContent(
              <>
                {intl.get('entities.table.tab_entity_type')}
                <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.table.tab_entity_type_info')}>
                  <InfoCircleOutlined className={styles.tooltipIcon} />
                </Tooltip>
              </>,
              tableEntity?.tab_entity_type || TABLE_EMPTY_PLACE_HOLDER,
            )}
          </Col>
        )}
        {tableEntity?.tab_domain && (
          <Col>
            {FieldContent(
              <>
                {intl.get('entities.Domain')}
                <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.DomainInfo')}>
                  <InfoCircleOutlined className={styles.tooltipIcon} />
                </Tooltip>
              </>,
              tableEntity?.tab_domain || TABLE_EMPTY_PLACE_HOLDER,
            )}
          </Col>
        )}
      </Row>
      {tableEntity?.tab_row_filter &&
        FieldContent(
          <Row>
            {intl.get('entities.rowFilter')}
            <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.rowFilterTooltip')}>
              <InfoCircleOutlined className={styles.tooltipIcon} />
            </Tooltip>
          </Row>,
          tableEntity?.tab_row_filter || TABLE_EMPTY_PLACE_HOLDER,
        )}
    </Col>
  );
};

export default SummaryContent;
