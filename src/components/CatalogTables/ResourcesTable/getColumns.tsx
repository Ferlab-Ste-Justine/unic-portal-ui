import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Popover, Tag } from 'antd';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { LANG } from '@/types/constants';
import { IResourceEntity } from '@/types/entities';
import { TABLE_EMPTY_PLACE_HOLDER } from '@/utils/constants';
import formatDate from '@/utils/formatDate';
import getTagColorByType from '@/utils/getTagColorByType';
import { getRSLabelNameByType } from '@/utils/translation';

import styles from './ResourcesTable.module.css';

const getColumns = (lang: LANG, handleFilterBy: any): ProColumnType[] => [
  {
    key: 'rs_code',
    title: intl.get('entities.code'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (resource: IResourceEntity) => {
      if (!resource?.rs_code) return TABLE_EMPTY_PLACE_HOLDER;

      return <Link href={`/resource/${resource.rs_code}`}>{resource.rs_code}</Link>;
    },
  },
  {
    key: 'rs_name',
    title: intl.get('entities.name'),
    sorter: { multiple: 1 },
    render: (resource: IResourceEntity) => {
      if (!resource?.rs_name) return TABLE_EMPTY_PLACE_HOLDER;

      return <Link href={`/resource/${resource.rs_code}`}>{resource.rs_name}</Link>;
    },
  },
  {
    dataIndex: 'rs_type',
    key: 'rs_type',
    title: intl.get('entities.type'),
    sorter: { multiple: 1 },
    render: (rs_type: string) =>
      rs_type ? (
        <Tag color={getTagColorByType(rs_type)}>{getRSLabelNameByType(rs_type)}</Tag>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    dataIndex: 'rs_last_update',
    key: 'rs_last_update',
    title: intl.get('entities.updatedAt'),
    sorter: { multiple: 1 },
    render: (timestamp: string) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp);
    },
  },
  {
    dataIndex: 'rs_project_creation_date',
    key: 'rs_project_creation_date',
    title: intl.get('entities.createdAt'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (timestamp: string) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp);
    },
  },
  {
    dataIndex: 'rs_project_approval_date',
    key: 'rs_project_approval_date',
    title: intl.get('entities.approvedAt'),
    defaultHidden: true,
    render: (timestamp: string) => {
      if (!timestamp) return TABLE_EMPTY_PLACE_HOLDER;
      return formatDate(timestamp);
    },
  },
  {
    key: 'tables',
    title: intl.get('entities.table.Table'),
    render: (resource: IResourceEntity) => {
      if (!resource?.tables?.length) return TABLE_EMPTY_PLACE_HOLDER;
      //TODO Do it for UNICWEB-40
      //Analyse:
      //IF rs_is_project THEN hyperlink  to @Catalogue filtered on Project facette
      // ELSE IF rs_type = source_system THEN filtered on Source System facette.
      // Focused on the table tab
      let filter = {};
      if (resource.rs_is_project) {
        filter = { rs_name: resource.rs_name };
      } else if (resource.rs_type === 'source_system') {
        filter = { rs_type: 'source_system' };
      }

      return <a onClick={() => handleFilterBy(filter)}>{resource.tables.length}</a>;
    },
  },
  {
    key: 'variables',
    title: intl.get('entities.variable.Variable'),
    render: (resource: IResourceEntity) => {
      if (!resource?.variables?.length) return TABLE_EMPTY_PLACE_HOLDER;
      //TODO Do it for UNICWEB-40
      //Analyse:
      //Vers le tableau Variables filtré sur Ressource
      //par resource.rs_name
      return <Link href={`/catalog#variables?resource=${resource.rs_name}`}>{resource.variables?.length}</Link>;
    },
  },
  {
    key: 'rs_description',
    title: intl.get('entities.description'),
    render: (resource: IResourceEntity) => {
      const description = lang === LANG.FR ? resource?.rs_description_fr : resource?.rs_description_en;
      if (!description) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <div className={styles.colDescription}>
          <Popover title={resource.rs_name} content={description} overlayClassName={styles.popoverDescription}>
            {description}
          </Popover>
        </div>
      );
    },
  },
  {
    dataIndex: 'rs_system_collection_starting_year',
    key: 'rs_system_collection_starting_year',
    title: intl.get('entities.rs_system_collection_starting_year'),
    defaultHidden: true,
    render: (key: string) => key || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    dataIndex: 'rs_dict_current_version',
    key: 'rs_dict_current_version',
    title: intl.get('entities.rs_dict_current_version'),
    defaultHidden: true,
    render: (key: string) => key || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    dataIndex: 'rs_project_erb_id',
    key: 'rs_project_erb_id',
    title: intl.get('entities.rs_project_erb_id'),
    defaultHidden: true,
    render: (key: string) => key || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    dataIndex: 'rs_project_pi',
    key: 'rs_project_pi',
    title: intl.get('entities.rs_project_pi'),
    defaultHidden: true,
    render: (key: string) => key || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getColumns;
