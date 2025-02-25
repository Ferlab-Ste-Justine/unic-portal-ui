import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tag } from 'antd';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { LANG } from '@/types/constants';
import { ISourceType, IVariableEntity } from '@/types/entities';
import { TABLE_EMPTY_PLACE_HOLDER } from '@/utils/constants';
import formatDate from '@/utils/formatDate';

const getColumns = (lang: LANG): ProColumnType[] => [
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
    key: 'tab_label',
    title: intl.get('entities.label'),
    render: (variable: IVariableEntity) => {
      const description = lang === LANG.FR ? variable?.var_label_fr : variable?.var_label_en;
      return description || TABLE_EMPTY_PLACE_HOLDER;
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
    key: 'var_from_source_systems.rs_name',
    dataIndex: 'var_from_source_systems',
    title: intl.get('entities.source_name'),
    defaultHidden: true,
    render: (var_from_source_systems: ISourceType[]) => {
      if (!var_from_source_systems?.length) return TABLE_EMPTY_PLACE_HOLDER;
      return var_from_source_systems.map((sourceSystem: ISourceType) => sourceSystem.rs_name).join(', ');
    },
  },
  {
    key: 'var_from_source_systems.rs_code',
    dataIndex: 'var_from_source_systems',
    title: intl.get('entities.source'),
    render: (var_from_source_systems: ISourceType[]) => {
      if (!var_from_source_systems?.length) return TABLE_EMPTY_PLACE_HOLDER;
      return var_from_source_systems.map((sourceSystem: ISourceType) => sourceSystem.rs_code).join(', ');
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
    key: 'resource.rs_name',
    title: intl.get('entities.resource.Resource'),
    sorter: { multiple: 1 },
    render: (variable: IVariableEntity) => {
      if (!variable?.resource?.rs_name) return TABLE_EMPTY_PLACE_HOLDER;
      return <Link href={`/resource/${variable.resource.rs_code}`}>{variable.resource.rs_name}</Link>;
    },
  },
  {
    dataIndex: 'var_created_at',
    key: 'var_created_at',
    title: intl.get('entities.createdAt'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    width: 120,
    render: (timestamp: string) => {
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
    render: (timestamp: string) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp);
    },
  },
];

export default getColumns;
