import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Col, Row, Tag } from 'antd';
import Link from 'next/link';
import React from 'react';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { LANG } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';

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

const getSummaryDescriptions = (lang: LANG, variableEntity?: IVariableEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.label'),
    value: (lang == LANG.FR ? variableEntity?.var_label_fr : variableEntity?.var_label_en) || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.resource.Resource'),
    value: variableEntity?.resource?.rs_name ? (
      <Link href={`/resource/${variableEntity?.resource?.rs_code}`}>{variableEntity?.resource.rs_name}</Link>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.table.Table'),
    value: variableEntity?.resource?.rs_name ? (
      <Link href={`/table/${variableEntity?.resource?.rs_code}/${variableEntity?.table?.tab_name}`}>
        {variableEntity?.table?.tab_name}
      </Link>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.type'),
    value: variableEntity?.var_value_type ? <Tag>{variableEntity?.var_value_type}</Tag> : TABLE_EMPTY_PLACE_HOLDER,
  },
  ...(variableEntity?.var_derivation_algorithm
    ? [
        {
          label: intl.get('entities.algorithmDerivation'),
          value: variableEntity?.var_derivation_algorithm
            ? formatDeviationAlgorithm(variableEntity?.var_derivation_algorithm)
            : TABLE_EMPTY_PLACE_HOLDER,
        },
      ]
    : []),
  ...(variableEntity?.var_notes
    ? [
        {
          label: intl.get('entities.notes'),
          value: variableEntity?.var_notes || TABLE_EMPTY_PLACE_HOLDER,
        },
      ]
    : []),
];

export default getSummaryDescriptions;
