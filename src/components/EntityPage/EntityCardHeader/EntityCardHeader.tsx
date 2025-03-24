import { Col, Row, Tag } from 'antd';
import React from 'react';

import { IEntityCardHeader } from '@/components/EntityPage/types/entityPage';
import AccountsStorage from '@/components/Icons/AccountsStorage';
import BrandBook from '@/components/Icons/BrandBook';
import CaduceusMedicine from '@/components/Icons/CaduceusMedicine';
import FinancialReport from '@/components/Icons/FinancialReport';
import KeywordingTools from '@/components/Icons/KeywordingTools';
import PatternSystem from '@/components/Icons/PatternSystem';
import { getRSLabelNameByType } from '@/utils/translation';

import styles from './EntityCardHeader.module.css';

const getResourceIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'research_project':
      return <BrandBook />;
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

const EntityCardHeader = ({ name, type, extraTag }: IEntityCardHeader) => (
  <Row className={styles.headerContainer}>
    <Col>{getIconByType(type)}</Col>
    <Col className={styles.title}>
      <Row className={styles.type}>{getRSLabelNameByType(type)}</Row>
      <Row className={styles.nameWrapper}>
        <Col className={styles.entityVariableName}>{name}</Col>
        {extraTag && (
          <Col className={styles.entityVariableNameTag}>
            <Tag>{extraTag}</Tag>
          </Col>
        )}
      </Row>
    </Col>
  </Row>
);

export default EntityCardHeader;
