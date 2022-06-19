import React from 'react';
import { ReactComponent as NoDataImg } from '../../../../common/svg/no-data.svg';
import styles from './no-data.module.scss';

type NoDataProps = {
  height?: number;
  heigntOfIcon?: number;
  text: string;
};

const NoData = ({ height = 200, heigntOfIcon = 60, text }: NoDataProps) => {
  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      <div>{text}</div>
      <NoDataImg height={heigntOfIcon} width={heigntOfIcon} />
    </div>
  );
};

export default NoData;
