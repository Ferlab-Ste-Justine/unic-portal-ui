import { ExclamationCircleOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Modal, Typography } from 'antd';
import intl from 'react-intl-universal';

import { useAuth } from '@/app/api/auth/useAuth';
import config from '@/config';
import { UserApi } from '@/services/users-api';

const { Text, Title } = Typography;
const { confirm, success, error } = Modal;

const DeleteCard = () => {
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
      onOk: async () => {
        try {
          await UserApi.deleteUserDirectly();
          success({
            title: intl.get('screen.profileSettings.cards.deleteAccount.success.title'),
            content: intl.get('screen.profileSettings.cards.deleteAccount.success.content'),
            okText: intl.get('global.close'),
            onOk: () => logout(config.ABOUT_URL),
          });
        } catch {
          error({
            title: (
              <>
                {intl.get('screen.profileSettings.cards.deleteAccount.error.content')}
                <ExternalLink href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}</ExternalLink>.
              </>
            ),
            okText: intl.get('global.close'),
          });
        }
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
