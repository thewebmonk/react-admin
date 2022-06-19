import React from 'react';
import styles from './heading.module.scss';

type HeadingProps = {
  title: string;
  type?: 'small' | 'large' | 'medium';
  className?: string;
};
const Heading = ({ title, type = 'large', className }: HeadingProps) => {
  return <div className={`${styles.heading} font${type} ${className}`}>{title}</div>;
};

export default Heading;
