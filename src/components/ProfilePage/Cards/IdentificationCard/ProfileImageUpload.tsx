import UserAvatar from '@ferlab/ui/core/components/UserAvatar';
import { Space } from 'antd';

import { useUser } from '@/store/user';

const ProfileImageUpload = () => {
  const { userInfo } = useUser();

  return (
    <Space direction='vertical' align='center'>
      <UserAvatar
        src={userInfo?.profile_image_key}
        userName={`${userInfo?.first_name} ${userInfo?.last_name}`}
        size={120}
        style={{ fontSize: '70px' }}
      />
    </Space>
  );
};

export default ProfileImageUpload;
