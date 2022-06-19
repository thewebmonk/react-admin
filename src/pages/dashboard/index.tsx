import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../types/index.types';
import Heading from '../commom/components/heading/heading';
import { getAnalyticsGraphData } from './actiom/async-action';
import { GraphDataAPIResponse } from './dashboard.types';
import styles from './dashboard.module.scss';
import { Line } from '@ant-design/plots';
import { getGraphConfig } from './utility';
import { entities } from '../../common/utils/constants';
import NoData from '../commom/components/no-data-available/no-data';

const Dashboard = () => {
  const [data, setData] = useState<GraphDataAPIResponse>([]);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch(getAnalyticsGraphData(entities.SUBSCRIBERS, 100)).then((res: GraphDataAPIResponse | null) => {
      res && setData(res);
    });
  }, []);
  const config = getGraphConfig(data);
  return (
    <div>
      <Card>
        <Heading title="Email Subscribers" type="small" className="mb-5" />
        <div className="columns">
          <div className="column is-12">
            {data.length ? <Line {...config} /> : <NoData height={150} text="Not enough data available" />}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
