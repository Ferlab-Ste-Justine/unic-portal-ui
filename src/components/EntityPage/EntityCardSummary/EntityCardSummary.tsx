import StudyIcon from '@ferlab/ui/core/components/Icons/Futuro/StudyIcon';
import { Col, Divider, Row, Tag } from 'antd';
import React from 'react';

import { IEntityCardSumary } from '@/components/EntityPage/types/entityPage';
import AccountsStorage from '@/components/Icons/AccountsStorage';
import CaduceusMedicine from '@/components/Icons/CaduceusMedicine';
import FinancialReport from '@/components/Icons/FinancialReport';
import KeywordingTools from '@/components/Icons/KeywordingTools';
import PatternSystem from '@/components/Icons/PatternSystem';
import { getRSLabelNameByType } from '@/utils/translation';

import styles from './EntityCardSummary.module.css';

const getResourceIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'research_project':
      return <StudyIcon />;
    case 'source_system':
      return <CaduceusMedicine />;
    case 'eqp':
      return <FinancialReport />;
    case 'warehouse':
      return <AccountsStorage />;
    default:
      return '';
  }
};

const getIconByType = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'table':
      return <PatternSystem />;
    case 'variable':
      return <KeywordingTools />;
    default:
      return getResourceIcon(type);
  }
};

const EntityCardSummary = ({ name, type, extraTag, content }: IEntityCardSumary) => (
  <Row className={styles.headerContainer}>
    <Col span={11}>
      <Row>
        <Col className={styles.iconContainer}>{getIconByType(type)}</Col>
        <Col className={styles.title}>
          <Row className={styles.type}>{getRSLabelNameByType(type)}</Row>
          <Row className={styles.nameWrapper}>
            <Col className={styles.entityVariableName}>{name}</Col>
          </Row>
          <Row>{extraTag && <Col className={styles.entityVariableNameTag}>{extraTag}</Col>}</Row>
        </Col>
      </Row>
    </Col>
    <Col style={{ flex: '0 1 auto', border: 23 }}>
      <Divider type='vertical' className={styles.fullHeightDivider} />
    </Col>
    <Col span={11}>{content}</Col>
  </Row>
);

export default EntityCardSummary;
