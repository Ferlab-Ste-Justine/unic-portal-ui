import { ExclamationCircleOutlined } from '@ant-design/icons';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Modal, Typography } from 'antd';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/app/api/auth/useAuth';
import { deleteUser } from '@/store/user/thunks';

const { Text, Title } = Typography;
const { confirm } = Modal;

const DeleteCard = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const showConfirm = () => {
    confirm({
      title: intl.get('screen.profileSettings.cards.deleteAccount.title'),
      icon: <ExclamationCircleOutlined />,
      content: intl.get('screen.profileSettings.cards.deleteAccount.confirm.content'),
      okText: intl.get('global.delete'),
      cancelText: intl.get('global.cancel'),
      okButtonProps: {
        danger: true,
        type: 'primary',
      },
      onOk: () => {
        // @ts-expect-error - unknown action
        dispatch(deleteUser());
        logout();
      },
    });
  };

  return (
    <GridCard
      title={<Title level={4}>{intl.get('screen.profileSettings.cards.deleteAccount.title')}</Title>}
      footer={
        <Button type='primary' danger onClick={showConfirm}>
          {intl.get('screen.profileSettings.cards.deleteAccount.button')}
        </Button>
      }
      content={<Text>{intl.get('screen.profileSettings.cards.deleteAccount.notice')}</Text>}
    />
  );
};

export default DeleteCard;
