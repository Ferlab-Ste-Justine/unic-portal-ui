import { Col, Row, Typography } from 'antd';
import React from 'react';

import { IEntityCardHeader } from '@/components/EntityPage/types/entityPage';
import AccountsStorage from '@/components/Icons/AccountsStorage';
import BrandBook from '@/components/Icons/BrandBook';
import CaduceusMedicine from '@/components/Icons/CaduceusMedicine';
import FinancialReport from '@/components/Icons/FinancialReport';

const getResourceIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'research':
      return <BrandBook color={'#92A7C3'} width={56} height={56} />;
    case 'hospital system':
      return <CaduceusMedicine color={'#92A7C3'} width={56} height={56} />;
    case 'eqp':
      return <FinancialReport color={'#92A7C3'} width={56} height={56} />;
    case 'warehouse':
      return <AccountsStorage color={'#92A7C3'} width={56} height={56} />;
    default:
      return '';
  }
};

const getIconByType = (entityType: string, type: string) => {
  switch (entityType?.toLowerCase()) {
    case 'resource':
      return getResourceIcon(type);
    case 'table':
      return <CaduceusMedicine color={'#92A7C3'} width={56} height={56} />;
    case 'variable':
      return <CaduceusMedicine color={'#92A7C3'} width={56} height={56} />;
    default:
      return '';
  }
};

const EntityCardHeader = ({ name, type, entityType }: IEntityCardHeader) => (
  <Row>
    <Col>{getIconByType(entityType, type)}</Col>
    <Col>
      <div>{type}</div>
      <Typography.Title level={3} style={{ margin: 0 }}>
        {name}
      </Typography.Title>
    </Col>
  </Row>
);

export default EntityCardHeader;
