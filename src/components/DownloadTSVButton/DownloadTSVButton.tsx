import { DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { DocumentNode } from 'graphql';
import React from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { fetchTsvReport } from '@/store/report/thunks';
import { QueryOptions } from '@/types/queries';
import { ColumnType } from '@/types/tables';

interface IDownloadTSVButtonProps {
  type?: 'default' | 'primary' | 'text';
  tableName: string;
  variables: QueryOptions;
  query: DocumentNode;
  userColumns: {
    key: string;
    visible: boolean;
  }[];
  columns: ColumnType[];
  title?: React.ReactNode;
}

const DownloadTSVButton = ({
  tableName,
  variables,
  query,
  type = 'text',
  userColumns,
  columns,
  title,
}: IDownloadTSVButtonProps) => {
  const dispatch = useDispatch();

  const columnsToDownload: {
    key: string;
    label: string;
    renderDownload?: (data: any) => string | number;
  }[] = [];
  for (const userColumn of userColumns) {
    if (userColumn.visible) {
      const col = columns.find((c) => c.key === userColumn.key);
      if (col) {
        columnsToDownload.push({
          key: col.key,
          label: col.title,
          renderDownload: col.renderDownload,
        });
      }
    }
  }

  const handleDownload = async () => {
    // @ts-expect-error type UnknownAction
    dispatch(fetchTsvReport({ columns: columnsToDownload, tableName, variables, query }));
  };

  return (
    <Tooltip title={intl.get('global.report.exportTSV')}>
      <Button type={type} size={'small'} icon={<DownloadOutlined />} onClick={handleDownload}>
        {title}
      </Button>
    </Tooltip>
  );
};

export default DownloadTSVButton;
