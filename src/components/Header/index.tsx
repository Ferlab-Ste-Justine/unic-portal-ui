import { DownOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import UserAvatar from '@ferlab/ui/core/components/UserAvatar';
import { Button, Dropdown, MenuProps, PageHeader, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/app/api/auth/useAuth';
import HeaderLink from '@/components/Header/HeaderLink';
import ExternalLinkIcon from '@/components/Icons/ExternalLinkIcon';
import config from '@/config';
import { globalActions, useLang } from '@/store/global';
import { useUser } from '@/store/user';
import { updateUser } from '@/store/user/thunks';
import { LANG } from '@/types/constants';

import styles from './index.module.css';

const {
  UNIC_DOCUMENTATION,
  UNIC_DICTIONARY,
  FERLOAD_GITHUB_URL,
  UNIC_WEB_SITE,
  SUPPORT_EMAIL,
  UNIC_WEB_APP_COMMUNITY,
} = config;

export const getTargetLang = (lang: LANG) => (lang === LANG.FR ? LANG.EN : LANG.FR);

const Header = () => {
  const dispatch = useDispatch();
  const lang = useLang();
  const { userInfo } = useUser();
  const userName = userInfo?.first_name;

  const { logout } = useAuth();

  const handleChangeLang = () => {
    const targetLang = getTargetLang(lang);

    // @ts-expect-error type UnknownAction
    dispatch(updateUser({ data: { locale: targetLang } }));
    dispatch(globalActions.changeLang(targetLang));
  };

  const resourcesMenu: MenuProps = {
    items: [
      {
        key: 'dictionary',
        label: (
          <ExternalLink href={UNIC_DICTIONARY}>
            <Space>
              <ExternalLinkIcon width={14} height={14} />
              {intl.get('layout.main.menu.dictionary')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        key: 'documentation',
        label: (
          <ExternalLink href={UNIC_DOCUMENTATION}>
            <Space>
              <ExternalLinkIcon width={14} height={14} />
              {intl.get('layout.main.menu.documentation')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        key: 'downloadTool',
        label: (
          <ExternalLink href={FERLOAD_GITHUB_URL}>
            <Space>
              <ExternalLinkIcon width={14} height={14} />
              {intl.get('layout.main.menu.downloadTool')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        key: 'unic-website',
        label: (
          <ExternalLink href={UNIC_WEB_SITE}>
            <Space>
              <ExternalLinkIcon width={14} height={14} />
              {intl.get('layout.main.menu.website')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: 'contact',
        label: (
          <ExternalLink href={`mailto:${SUPPORT_EMAIL}`}>
            <Space>
              <ExternalLinkIcon width={14} height={14} />
              {intl.get('layout.main.menu.contact')}
            </Space>
          </ExternalLink>
        ),
      },
    ],
  };

  const userMenu: MenuProps = {
    items: [
      {
        key: 'title',
        type: 'group',
        label: (
          <span className={styles.titleUserDropdown}>
            {intl.get('layout.user.menu.signedWith') + ' '}
            <b>{userInfo?.email}</b>
          </span>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        label: intl.get('layout.user.menu.logout'),
        onClick: () => logout(),
        icon: <LogoutOutlined />,
      },
    ],
  };

  return (
    <div>
      <PageHeader
        className={styles.mainHeader}
        title={
          <div className={styles.headerNavList}>
            <Link href={'/'}>
              <Image src={'/unic-logo.svg'} width={70} height={40} className={styles.logo} alt='UNIC Logo' />
            </Link>
          </div>
        }
        extra={
          <Space size={16}>
            <HeaderLink
              currentPathName={'/'}
              to={UNIC_WEB_APP_COMMUNITY}
              icon={<TeamOutlined />}
              title={intl.get('layout.main.menu.community')}
              target='_blank'
            />
            <Dropdown trigger={['click']} menu={resourcesMenu}>
              <div className={styles.menuTrigger}>
                <span className={styles.userName}>{intl.get('layout.main.menu.resources')}</span>
                <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown trigger={['click']} menu={userMenu}>
              <div className={styles.menuTrigger}>
                <UserAvatar
                  src={userInfo?.profile_image_key}
                  userName={`${userInfo?.first_name} ${userInfo?.last_name}`}
                  size={24}
                  className={styles.userAvatar}
                />
                <span className={styles.userName}>{userName}</span>
                <DownOutlined />
              </div>
            </Dropdown>
            <Button shape='circle' className={styles.langButton} onClick={handleChangeLang}>
              {getTargetLang(lang).toUpperCase()}
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default Header;
