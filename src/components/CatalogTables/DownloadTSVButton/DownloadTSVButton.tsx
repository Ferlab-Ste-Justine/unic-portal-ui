import { DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';

import { fetchTsvReport } from '@/store/report/thunks';
import { QueryOptions } from '@/types/queries';

interface OwnProps {
  type?: 'default' | 'primary' | 'link';
  tableName: string;
  variables: QueryOptions;
  GQL_QUERY: any;
  columns: { key: string; label: string }[];
  title?: React.ReactNode;
}

const DownloadTSVButton = ({ tableName, variables, GQL_QUERY, type = 'link', columns, title }: OwnProps) => {
  const dispatch = useDispatch();

  const handleDownload = async () => {
    dispatch(
      fetchTsvReport({
        columns,
        tableName,
        variables,
        GQL_QUERY,
      }),
    );
  };

  return (
    <Tooltip title={'download table'}>
      <Button type={type} icon={<DownloadOutlined />} onClick={handleDownload}>
        {title}
      </Button>
    </Tooltip>
  );
};

export default DownloadTSVButton;
