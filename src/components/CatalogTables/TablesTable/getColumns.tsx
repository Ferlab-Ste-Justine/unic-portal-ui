import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';
import { TABLE_EMPTY_PLACE_HOLDER } from '@/utils/constants';
import formatDate from '@/utils/formatDate';

const getColumns = (lang: LANG): ProColumnType[] => [
  {
    key: 'tab_name',
    title: intl.get('entities.name'),
    sorter: { multiple: 1 },
    render: (table: ITableEntity) => {
      if (!table?.tab_name) return TABLE_EMPTY_PLACE_HOLDER;
      return <Link href={`/table/${table.resource.rs_code}/${table.tab_name}`}>{table.tab_name}</Link>;
    },
  },
  {
    key: 'tab_label',
    title: intl.get('entities.description'),
    render: (table: ITableEntity) => {
      const description = lang === LANG.FR ? table?.tab_label_fr : table?.tab_label_en;
      if (!description) return TABLE_EMPTY_PLACE_HOLDER;
      return <div>{description}</div>;
    },
  },
  {
    key: 'resource.rs_name',
    title: intl.get('entities.resource.Resource'),
    sorter: { multiple: 1 },
    render: (table: ITableEntity) => {
      if (!table?.resource?.rs_name) return TABLE_EMPTY_PLACE_HOLDER;
      return <Link href={`/resource/${table.resource.rs_code}`}>{table.resource.rs_name}</Link>;
    },
  },
  {
    dataIndex: 'tab_entity_type',
    key: 'tab_entity_type',
    title: intl.get('entities.table.tab_entity_type'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (key: string) => {
      return key || TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    dataIndex: 'tab_domain',
    key: 'tab_domain',
    title: intl.get('entities.Domain'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (key: string) => {
      return key || TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'variable_count',
    title: intl.get('entities.table.variable_count'),
    render: (table: ITableEntity) => {
      if (!table?.stat_etl?.variable_count) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <Link href={`/catalog#variables?filterField=table.tab_name&filterValue=${table.tab_name}`}>
          {table.stat_etl.variable_count}
        </Link>
      );
    },
  },
  {
    dataIndex: 'tab_created_at',
    key: 'tab_created_at',
    title: intl.get('entities.createdAt'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (timestamp: string) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp);
    },
  },
  {
    dataIndex: 'tab_last_update',
    key: 'tab_last_update',
    title: intl.get('entities.updatedAt'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (timestamp: string) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp);
    },
  },
];

export default getColumns;
