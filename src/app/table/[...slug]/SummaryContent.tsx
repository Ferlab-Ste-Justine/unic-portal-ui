import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Col, Row, Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import intl from 'react-intl-universal';

import styles from '@/app/table/[...slug]/page.module.css';
import { useLang } from '@/store/global';
import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';

const FieldContent = (label: string | React.ReactNode, description: string | number | React.ReactNode) => (
  <div>
    <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
    <p>{description}</p>
  </div>
);

const SummaryContent = (tableEntity: ITableEntity) => {
  const lang = useLang();

  return (
    <div className={styles.summaryContent}>
      {FieldContent(
        intl.get('entities.resource.Resource'),
        tableEntity?.resource?.rs_name ? (
          <Link className={styles.link} href={`/resource/${tableEntity?.resource?.rs_code}`}>
            {tableEntity?.resource.rs_name}
          </Link>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
      )}
      {FieldContent(
        intl.get('entities.description'),
        (lang == LANG.FR ? tableEntity?.tab_label_fr : tableEntity?.tab_label_en) || TABLE_EMPTY_PLACE_HOLDER,
      )}
      <Row gutter={[20, 20]}>
        <Col>
          {tableEntity?.tab_entity_type &&
            FieldContent(
              <>
                {intl.get('entities.table.tab_entity_type')}
                <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.table.tab_entity_type_info')}>
                  <InfoCircleOutlined className={styles.tooltipIcon} />
                </Tooltip>
              </>,
              tableEntity?.tab_entity_type || TABLE_EMPTY_PLACE_HOLDER,
            )}
        </Col>
        <Col>
          {tableEntity?.tab_domain &&
            FieldContent(
              <>
                {intl.get('entities.Domain')}
                <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.DomainInfo')}>
                  <InfoCircleOutlined className={styles.tooltipIcon} />
                </Tooltip>
              </>,
              tableEntity?.tab_domain || TABLE_EMPTY_PLACE_HOLDER,
            )}
        </Col>
      </Row>
      {tableEntity?.tab_row_filter &&
        FieldContent(
          <>
            {intl.get('entities.rowFilter')}
            <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.rowFilterTooltip')}>
              <InfoCircleOutlined className={styles.tooltipIcon} />
            </Tooltip>
          </>,
          tableEntity?.tab_row_filter || TABLE_EMPTY_PLACE_HOLDER,
        )}
    </div>
  );
};

export default SummaryContent;
