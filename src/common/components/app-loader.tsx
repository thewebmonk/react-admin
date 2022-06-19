import React from 'react';
import { Rings } from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

const AppLoader = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? (
    <div className="app-loader">
      <Rings color="#00BFFF" height={80} width={80} />
    </div>
  ) : (
    <></>
  );
};

export default AppLoader;
