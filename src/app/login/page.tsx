'use client';
import { Button, Space, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/app/api/auth/useAuth';
import DataRelease from '@/components/DataRelease';
import { getTargetLang } from '@/components/Header';
import { globalActions, useLang } from '@/store/global';

import styles from './page.module.css';

const { Text } = Typography;

const LoginPage = () => {
  const lang = useLang();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleChangeLang = () => {
    const targetLang = getTargetLang(lang);
    dispatch(globalActions.changeLang(targetLang));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.loginContainer}>
      <Image src='/login-img.svg' alt='login-img' priority width={600} height={1024} className={styles.sideImage} />
      <div className={styles.sideContentContainer}>
        <Button type='primary' className={styles.languageButton} onClick={handleChangeLang}>
          {getTargetLang(lang).toUpperCase()}
        </Button>
        <Space size={80} direction='vertical'>
          <div className={styles.logoContainer}>
            <Image src='/unic-logo.svg' alt='logo' width={285} height={120} className={styles.logo} />
          </div>
          <div className={styles.loginStats}>
            <Text className={styles.statsTitle}>{intl.get('components.dataRelease.title')}</Text>
            <DataRelease className={styles.dataRelease} />
          </div>
          <Space size={16} direction='vertical'>
            <Text className={styles.loginTitle}>{intl.get('screen.loginPage.title')}</Text>
            <Text className={styles.loginSubTitle}>{intl.get('screen.loginPage.subTitle')}</Text>
          </Space>
          <Space className={styles.loginButtons} size={16}>
            <Button type='primary' onClick={login} size={'large'} data-cy='Login'>
              {intl.get('screen.loginPage.login')}
            </Button>
            <Button type='ghost' onClick={login} size={'large'} data-cy='Signup'>
              {intl.get('screen.loginPage.signup')}
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default LoginPage;
