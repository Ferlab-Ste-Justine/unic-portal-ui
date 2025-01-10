'use client';
import { Button, Space } from 'antd';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/app/api/auth/useAuth';
import { getTargetLang } from '@/components/Header';
import UNICLogoFull from '@/components/Icons/UNICLogoFull';
import { globalActions, useLang } from '@/store/global';

import styles from './index.module.css';

export default function LoginPage() {
  const lang = useLang();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const handleChangeLang = () => {
    const targetLang = getTargetLang(lang);
    dispatch(globalActions.changeLang(targetLang));
  };

  return (
    <div className={styles.topBanner}>
      <div className={styles.contentContainer}>
        <Button ghost type='default' className={styles.languageButton} onClick={handleChangeLang}>
          {getTargetLang(lang).toUpperCase()}
        </Button>
        <div className={styles.content}>
          <UNICLogoFull className={styles.logo} />
          <div className={styles.title}>{intl.get('screen.loginPage.title')}</div>
          <div className={styles.description}>{intl.get('screen.loginPage.resume')}</div>
          <Space size={8}>
            <Button ghost type='primary' size='large' onClick={login}>
              {intl.get('screen.loginPage.login')}
            </Button>
            <Button ghost type='default' size='large' onClick={login}>
              {intl.get('screen.loginPage.signup')}
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
