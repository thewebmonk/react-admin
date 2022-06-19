import React from 'react';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../../common/utils';
import { RootState } from '../../../types/index.types';
import Heading from '../../commom/components/heading/heading';

const ProfieDetails = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <Heading title="Profile Details" type="small" className="mb-4" />
      <div className="columns m-0">
        <div className="column is-1 p-0">
          <span className="has-text-weight-semibold">Name : </span>
        </div>
        <div className="column is-4 p-0">
          <span className="">
            {user?.firstName} {user?.lastName}{' '}
          </span>
        </div>
      </div>
      <div className="columns m-0 mt-2">
        <div className="column is-1 p-0">
          <span className="has-text-weight-semibold">Email : </span>
        </div>
        <div className="column is-4 p-0">
          <span className="">{user?.email} </span>
        </div>
      </div>
      <div className="columns m-0 mt-2">
        <div className="column is-1 p-0">
          <span className="has-text-weight-semibold">Role : </span>
        </div>
        <div className="column is-4 p-0">
          <span className="">{capitalizeFirstLetter(user?.role || '')} </span>
        </div>
      </div>
    </div>
  );
};

export default ProfieDetails;
