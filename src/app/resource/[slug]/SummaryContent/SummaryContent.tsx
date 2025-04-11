import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Col, Row } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

import { useLang } from '@/store/global';
import { LANG } from '@/types/constants';
import { IResourceEntity } from '@/types/entities';

import styles from './SummaryContent.module.css';

const FieldContent = (label: string, description: string | number | React.ReactNode) => (
  <div key={label}>
    <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
    <p style={{ margin: 0 }}>{description}</p>
  </div>
);

const SummaryContent = (resourceEntity: IResourceEntity) => {
  const lang = useLang();

  return (
    <Col className={styles.summaryContainer}>
      <Row>
        {resourceEntity?.rs_is_project &&
          FieldContent(intl.get('entities.title'), resourceEntity.rs_title || TABLE_EMPTY_PLACE_HOLDER)}
      </Row>
      <Row>
        {FieldContent(
          intl.get('entities.description'),
          (lang === LANG.FR ? resourceEntity?.rs_description_fr : resourceEntity?.rs_description_en) ||
            TABLE_EMPTY_PLACE_HOLDER,
        )}
      </Row>
      <Row>
        {resourceEntity?.rs_is_project &&
          FieldContent(intl.get('entities.researcher'), resourceEntity.rs_project_pi || TABLE_EMPTY_PLACE_HOLDER)}
      </Row>
      <Row justify='start' gutter={[40, 40]}>
        {resourceEntity?.rs_is_project && resourceEntity.rs_project_erb_id && (
          <Col>{FieldContent(intl.get('entities.rs_project_erb_id'), resourceEntity.rs_project_erb_id)}</Col>
        )}
        {resourceEntity?.rs_is_project && (
          <Col>
            {FieldContent(
              intl.get('entities.approvedAt'),
              resourceEntity.rs_project_approval_date
                ? new Date(resourceEntity.rs_project_approval_date).toLocaleDateString('en-CA')
                : TABLE_EMPTY_PLACE_HOLDER,
            )}
          </Col>
        )}
        {resourceEntity?.rs_system_collection_starting_year && resourceEntity.rs_type === 'source_system' && (
          <Col>
            {FieldContent(intl.get('entities.startingYear'), resourceEntity.rs_system_collection_starting_year)}
          </Col>
        )}
      </Row>
    </Col>
  );
};

export default SummaryContent;
