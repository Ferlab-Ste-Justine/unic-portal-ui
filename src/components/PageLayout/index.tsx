'use client';
import { Layout, Space, Typography } from 'antd';

import { useLang } from '@/store/global';

const { Title, Text } = Typography;

import styles from './index.module.css';

interface IHomePageProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, subTitle, children }: IHomePageProps) => {
  useLang();

  return (
    <Layout className={styles.container}>
      <Space className={styles.headerPage}>
        <div className={styles.titlePageWrapper}>
          <Title level={4} className={styles.titlePage}>
            {title}
          </Title>
          {subTitle && <Text className={styles.subTitlePage}>{subTitle}</Text>}
          <br />
        </div>
      </Space>
      <Layout className={styles.tabsContainer}>{children}</Layout>
    </Layout>
  );
};

export default PageLayout;
