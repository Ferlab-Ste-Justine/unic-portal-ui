import { Button } from 'antd';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';

import styles from '../index.module.css';

interface IHeaderLinkProps {
  className?: string;
  to: string | string[];
  title: string;
  currentPathName: string;
  icon?: React.ReactElement;
  iconRight?: boolean;
  target?: string;
}

const isActive = (current: string, to: string | string[]) =>
  to instanceof Array ? to.includes(current) : current === to;

const HeaderLink = ({ className = '', to, currentPathName, icon, iconRight, title, ...props }: IHeaderLinkProps) => (
  <Link className={styles.headerLink} href={to instanceof Array ? to[0] : to} {...props}>
    <Button
      className={cx(styles.headerBtn, className, isActive(currentPathName, to) ? styles.headerBtnActive : '')}
      icon={!iconRight && icon}
    >
      {title}
      {iconRight && icon}
    </Button>
  </Link>
);

export default HeaderLink;
