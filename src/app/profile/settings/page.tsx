'use client';
import { Space, Typography } from 'antd';
import intl from 'react-intl-universal';

import DeleteCard from '@/components/ProfilePage/Cards/DeleteCard';
import FunctionCard from '@/components/ProfilePage/Cards/FunctionCard';
import IdentificationCard from '@/components/ProfilePage/Cards/IdentificationCard';
import ResearchDomainCard from '@/components/ProfilePage/Cards/ResearchDomainCard';
import config from '@/config';
import { useAxios } from '@/lib/axios';
import { useLang } from '@/store/global';

import styles from './page.module.css';
const { Title } = Typography;

const ProfileSettings = () => {
  useLang();
  const result = useAxios(`${config.USERS_API_URL}/userOptions`);
  const { roleOptions = [], researchDomainOptions = [] } = result?.data || {};

  return (
    <div className={styles.profileSettingsWrapper}>
      <Space size={16} direction='vertical' className={styles.profileSettings}>
        <div className={styles.profileSettingsHeader}>
          <Title level={4}>{intl.get('screen.profileSettings.title')}</Title>
          {/*For community and member page*/}
          {/*<Link href={`/member/${userInfo?.keycloak_id}`}>*/}
          {/*  <Button type='primary'>{intl.get('screen.profileSettings.viewProfile')}</Button>*/}
          {/*</Link>*/}
        </div>
        <Space size={24} direction='vertical' className={styles.cardsWrapper}>
          <IdentificationCard />
          <FunctionCard roleOptions={roleOptions} />
          <ResearchDomainCard researchDomainOptions={researchDomainOptions} />
          <DeleteCard />
        </Space>
      </Space>
    </div>
  );
};

export default ProfileSettings;
