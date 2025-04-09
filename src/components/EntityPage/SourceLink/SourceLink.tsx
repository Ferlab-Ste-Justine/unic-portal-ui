import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';

import { IVarFromVariable } from '@/types/entities';

export interface Props {
  varFromVariable: IVarFromVariable;
  currentVariable: {
    rs_code: string;
    tab_name: string;
    var_name: string;
  };
}
import styles from './SourceLink.module.css';

const isSameVariable = ({ varFromVariable, currentVariable }: Props): boolean => {
  return (
    varFromVariable?.resource?.rs_code === currentVariable.rs_code &&
    varFromVariable?.table?.tab_name === currentVariable.tab_name &&
    varFromVariable.var_name === currentVariable.var_name
  );
};

const SourceLink = ({ varFromVariable, currentVariable }: Props) => (
  <div className={styles.sourceLinkContainer}>
    <Link href={`/resource/${varFromVariable?.resource?.rs_code}`}>{varFromVariable.resource.rs_name}</Link>
    <ArrowRightOutlined className={styles.icon} />
    <Link href={`/table/${varFromVariable?.resource?.rs_code}/${varFromVariable?.table?.tab_name}`}>
      {varFromVariable.table.tab_name}
    </Link>
    <ArrowRightOutlined className={styles.icon} />
    {isSameVariable({ varFromVariable, currentVariable }) ? (
      <div> {varFromVariable.var_name}</div>
    ) : (
      <Link
        href={`/variable/${varFromVariable?.resource?.rs_code}/${varFromVariable?.table?.tab_name}/${varFromVariable.var_name}`}
      >
        {varFromVariable.var_name}
      </Link>
    )}
  </div>
);

export default SourceLink;
