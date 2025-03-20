import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { entityTsvReport } from '@/store/report/thunks';
import { ColumnType } from '@/types/tables';

interface IEntityDownloadTSVButtonProps {
  columns: ColumnType[];
  variableName: string;
  data: any[];
  disabled?: boolean;
}

const EntityDownloadTSVButton = ({ columns, variableName, data, disabled = false }: IEntityDownloadTSVButtonProps) => {
  const dispatch = useDispatch();

  return (
    <Button
      type={'text'}
      icon={<DownloadOutlined />}
      size={'small'}
      disabled={disabled}
      onClick={() => {
        // @ts-expect-error - unknown action
        dispatch(entityTsvReport({ columns, variableName: variableName, data: data }));
      }}
    >
      {intl.get('global.download')}
    </Button>
  );
};

export default EntityDownloadTSVButton;
