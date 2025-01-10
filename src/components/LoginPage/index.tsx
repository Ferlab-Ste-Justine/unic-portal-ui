import BottomBanner from './BottomBanner';
import styles from './index.module.css';
import TopBanner from './TopBanner';

const LoginPage = () => {
  return (
    <div className={styles.loginLayout}>
      <TopBanner />
      <BottomBanner />
    </div>
  );
};

export default LoginPage;
