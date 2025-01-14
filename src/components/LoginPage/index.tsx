import { Button, Divider, Space, Typography } from 'antd';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/app/api/auth/useAuth';
import DataRelease from '@/components/DataRelease';
import { getTargetLang } from '@/components/Header';
import { globalActions, useLang } from '@/store/global';
const { Text } = Typography;

import styles from './index.module.css';

const LoginPage = () => {
  const lang = useLang();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const handleChangeLang = () => {
    const targetLang = getTargetLang(lang);
    dispatch(globalActions.changeLang(targetLang));
  };

  return (
    <div className={styles.loginContainer}>
      <img src='/login-img.svg' alt='logo' className={styles.sideImage} />
      <div className={styles.sideContentContainer}>
        <Button type='primary' className={styles.languageButton} onClick={handleChangeLang}>
          {getTargetLang(lang).toUpperCase()}
        </Button>
        <Space size={48} direction='vertical'>
          <div className={styles.logoContainer}>
            <img src='/unic-logo.svg' alt='logo' />
          </div>
          <div className={styles.loginStats}>
            <Text className={styles.statsTitle}>{intl.get('components.dataRelease.title')}</Text>
            <Divider className={styles.statsDivider} />
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
            <Button ghost onClick={login} size={'large'} data-cy='Signup'>
              {intl.get('screen.loginPage.signup')}
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default LoginPage;
