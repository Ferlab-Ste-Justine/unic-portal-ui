import { DownOutlined, HomeOutlined, LogoutOutlined, ReadOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import UserAvatar from '@ferlab/ui/core/components/UserAvatar';
import { Button, Dropdown, MenuProps, PageHeader, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const { SUPPORT_EMAIL } = config;

export const getTargetLang = (lang: LANG) => (lang === LANG.FR ? LANG.EN : LANG.FR);

const Header = () => {
  const dispatch = useDispatch();
  const lang = useLang();
  const { userInfo } = useUser();
  const currentPathName = usePathname();

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
        type: 'divider',
      },
      {
        key: 'contact',
        label: (
          <ExternalLink href={`mailto:${SUPPORT_EMAIL}`}>
            <Space>
              <ExternalLinkIcon width={14} height={14} />
              {intl.get('global.contact')}
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
              <Image
                src={'/unic-logo-header.svg'}
                width={103}
                height={40}
                className={styles.logo}
                alt='UNIC Logo'
                priority
              />
            </Link>
            <nav className={styles.headerNavList}>
              <HeaderLink
                to={'/'}
                icon={<HomeOutlined />}
                title={intl.get('global.home')}
                currentPathName={currentPathName}
              />
              <HeaderLink
                to={'/catalog'}
                icon={<ReadOutlined />}
                title={intl.get('global.catalog')}
                currentPathName={currentPathName}
              />
            </nav>
          </div>
        }
        extra={
          <Space size={16}>
            <Dropdown trigger={['click']} menu={resourcesMenu}>
              <div className={styles.menuTrigger}>
                <span className={styles.userName}>{intl.get('global.resources')}</span>
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
