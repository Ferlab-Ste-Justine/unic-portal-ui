import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import intl from 'react-intl-universal';

import { LANG } from '@/types/constants';

const getColumns = (lang: LANG): ProColumnType[] => [
  {
    dataIndex: 'rs_name',
    key: 'rs_name',
    title: intl.get('global.name'),
    sorter: { multiple: 1 },
    render: (key: string) => key || '-',
  },
  {
    dataIndex: 'rs_type',
    key: 'rs_type',
    title: intl.get('global.type'),
    sorter: { multiple: 1 },
    render: (key: string) => key || '-',
  },
  {
    dataIndex: 'rs_last_update',
    key: 'rs_last_update',
    title: intl.get('global.updatedAt'),
    sorter: { multiple: 1 },
    render: (key: string) => key || '-',
  },
  {
    dataIndex: 'tables',
    key: 'tables',
    title: intl.get('entities.table.Tables'),
    sorter: { multiple: 1 },
    render: (tables: any[]) => tables?.length || '-',
  },
  {
    dataIndex: 'variables',
    key: 'variables',
    title: intl.get('entities.variable.Variables'),
    sorter: { multiple: 1 },
    render: (variables: any[]) => variables?.length || '-',
  },
  {
    dataIndex: 'rs_description_fr',
    key: 'rs_description_fr',
    title: intl.get('global.description'),
    defaultHidden: lang === LANG.EN,
    render: (key: string) => key || '-',
  },
  {
    dataIndex: 'rs_description_en',
    key: 'rs_description_en',
    title: intl.get('global.description') + ' (EN)',
    defaultHidden: lang === LANG.FR,
    render: (key: string) => key || '-',
  },
];

export default getColumns;
