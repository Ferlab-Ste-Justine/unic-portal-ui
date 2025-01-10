import CloudDatabaseIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudDatabaseSpotIcon';
import InformationIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/InformationSpotIcon';
import BannerItem from '@ferlab/ui/core/pages/LandingPage/BannerItem';
import React from 'react';
import intl from 'react-intl-universal';

import config from '@/config';
import { getDocLang } from '@/utils/getDocLang';

import styles from './index.module.css';

const BottomBanner = () => (
  <div className={styles.bottomBanner}>
    <div className={styles.content}>
      <BannerItem
        IconComponent={InformationIcon}
        dictionary={{
          title: intl.get('screen.loginPage.documentation.title'),
          description: intl.get('screen.loginPage.documentation.description'),
          button: intl.get('screen.loginPage.documentation.button'),
        }}
        buttonProps={{
          ghost: true,
          target: '_blank',
          href: config.UNIC_DOCUMENTATION + getDocLang(),
        }}
      />
      <BannerItem
        IconComponent={CloudDatabaseIcon}
        dictionary={{
          title: intl.get('screen.loginPage.hosting.title'),
          description: intl.get('screen.loginPage.hosting.description'),
          button: intl.get('screen.loginPage.hosting.button'),
        }}
        buttonProps={{
          ghost: true,
          target: '_blank',
          href: `${config.UNIC_DOCUMENTATION}/docs/comment-soumettre-vos-donn%C3%A9es${getDocLang()}`,
        }}
      />
    </div>
  </div>
);

export default BottomBanner;
