import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';
import { TABLE_EMPTY_PLACE_HOLDER } from '@/utils/constants';
import formatDate from '@/utils/formatDate';

import styles from './TablesTable.module.css';

const getColumns = (lang: LANG): ProColumnType[] => [
  {
    key: 'tab_name',
    title: intl.get('entities.name'),
    sorter: { multiple: 1 },
    render: (table: ITableEntity) => {
      if (!table?.tab_name) return TABLE_EMPTY_PLACE_HOLDER;
      return <Link href={`/table/${table.tab_name}`}>{table.tab_name}</Link>;
    },
  },
  {
    key: 'tab_label',
    title: intl.get('entities.description'),
    render: (table: ITableEntity) => {
      const description = lang === LANG.FR ? table?.tab_label_fr : table?.tab_label_en;
      if (!description) return TABLE_EMPTY_PLACE_HOLDER;
      return <div className={styles.colDescription}>{description}</div>;
    },
  },
  {
    key: 'rs_code',
    title: intl.get('entities.resource.Resource'),
    sorter: { multiple: 1 },
    render: (table: ITableEntity) => {
      if (!table?.resource?.rs_code) return TABLE_EMPTY_PLACE_HOLDER;
      return table.resource.rs_code;
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
      //TODO Do it for UNICWEB-40
      //Analyse:
      //Vers le tableau Variables filtré sur la table
      return <Link href={`/catalog#variables?table=${table.tab_name}`}>{table.stat_etl.variable_count}</Link>;
    },
  },
  {
    dataIndex: 'tab_created_at',
    key: 'tab_created_at',
    title: intl.get('entities.createdAt'),
    defaultHidden: true,
    render: (timestamp: string) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp, lang);
    },
  },
  {
    dataIndex: 'tab_last_update',
    key: 'tab_last_update',
    title: intl.get('entities.updatedAt'),
    defaultHidden: true,
    render: (timestamp: string) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp, lang);
    },
  },
];

export default getColumns;
