import { Spin } from 'antd';

import styles from './index.module.css';

const Loading = () => {
  return <Spin size='large' className={styles.loading} />;
};

export default Loading;
