import { Tag } from 'antd';
import Link from 'next/link';
import React from 'react';
import intl from 'react-intl-universal';

import { LANG } from '@/types/constants';
import { ISourceType, IVariableEntity } from '@/types/entities';
import { ColumnType } from '@/types/tables';
import { TABLE_EMPTY_PLACE_HOLDER } from '@/utils/constants';
import formatDate from '@/utils/formatDate';

const getColumns = (lang: LANG): ColumnType[] => [
  {
    key: 'var_name',
    title: intl.get('entities.name'),
    sorter: { multiple: 1 },
    render: (variable: IVariableEntity) => {
      if (!variable?.var_name) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <Link
          href={`/variable/${variable.resource.rs_code}/${variable.table.tab_name}/${encodeURIComponent(variable.var_name)}`}
        >
          {variable.var_name}
        </Link>
      );
    },
  },
  {
    key: 'var_label_en',
    title: intl.get('entities.label'),
    renderDownload: (variable: IVariableEntity) => (lang === LANG.FR ? variable?.var_label_fr : variable?.var_label_en),
    render: (variable: IVariableEntity) => {
      const description = lang === LANG.FR ? variable?.var_label_fr : variable?.var_label_en;
      return description || TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'resource.rs_name',
    title: intl.get('entities.resource.Resource'),
    sorter: { multiple: 1 },
    render: (variable: IVariableEntity) => {
      if (!variable?.resource?.rs_name) return TABLE_EMPTY_PLACE_HOLDER;
      return <Link href={`/resource/${variable.resource.rs_code}`}>{variable.resource.rs_name}</Link>;
    },
  },
  {
    key: 'table.tab_name',
    title: intl.get('entities.table.Table'),
    sorter: { multiple: 1 },
    render: (variable: IVariableEntity) => {
      if (!variable?.table?.tab_name) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <Link href={`/table/${variable.resource.rs_code}/${variable.table.tab_name}`}>{variable.table.tab_name}</Link>
      );
    },
  },
  {
    key: 'var_value_type',
    dataIndex: 'var_value_type',
    title: intl.get('entities.type'),
    sorter: { multiple: 1 },
    render: (var_value_type: string) => (var_value_type ? <Tag>{var_value_type}</Tag> : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'var_from_source_systems.rs_code',
    dataIndex: 'var_from_source_systems',
    title: intl.get('entities.source'),
    tooltip: intl.get('entities.sourceInfo'),
    render: (var_from_source_systems: ISourceType[]) => {
      if (!var_from_source_systems?.length) return TABLE_EMPTY_PLACE_HOLDER;
      return var_from_source_systems.map((sourceSystem: ISourceType) => sourceSystem.rs_code).join(', ');
    },
  },
  {
    dataIndex: 'var_created_at',
    key: 'var_created_at',
    title: intl.get('entities.createdAt'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    width: 120,
    tooltip: intl.get('entities.createdAtInfo', { resType: intl.get('entities.variable.variable') }),
    renderDownload: (variable: IVariableEntity) => formatDate(variable?.var_created_at),
    render: (timestamp: number) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp);
    },
  },
  {
    dataIndex: 'var_last_update',
    key: 'var_last_update',
    title: intl.get('entities.updatedAt'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    width: 120,
    tooltip: intl.get('entities.updatedAtInfo', { resType: intl.get('entities.variable.variable') }),
    renderDownload: (variable: IVariableEntity) => formatDate(variable?.var_last_update),
    render: (timestamp: number) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp);
    },
  },
];

export default getColumns;
