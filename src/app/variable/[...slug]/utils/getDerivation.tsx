import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Col, Row } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

import SourceLink from '@/components/EntityPage/SourceLink/SourceLink';
import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { LANG } from '@/types/constants';
import { IVariableEntity } from '@/types/entities';

import styles from '../page.module.css';

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

const getDerivation = (lang: LANG, variableEntity?: IVariableEntity): IEntityDescriptionsItem[] => [
  ...(variableEntity?.var_from_variables?.length
    ? [
        {
          label: intl.get('entities.sources'),
          value: (
            <>
              {variableEntity?.var_from_variables.map((v) => (
                <SourceLink
                  key={v.resource.rs_name}
                  varFromVariable={v}
                  currentVariable={{
                    rs_code: variableEntity.resource.rs_code,
                    tab_name: variableEntity.table.tab_name,
                    var_name: variableEntity.var_name,
                  }}
                ></SourceLink>
              ))}
            </>
          ),
        },
      ]
    : []),
  ...(variableEntity?.var_derivation_algorithm
    ? [
        {
          label: intl.get('entities.algorithmDerivation'),
          value: (
            <div className={styles.derivationContainer}>
              {variableEntity?.var_derivation_algorithm
                ? formatDeviationAlgorithm(variableEntity?.var_derivation_algorithm)
                : TABLE_EMPTY_PLACE_HOLDER}
            </div>
          ),
        },
      ]
    : []),
];

export default getDerivation;
