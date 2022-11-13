import { Card, Select } from 'antd';
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
  const [showdataUpto, setShowdataUpto] = useState<number>(30);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch(getAnalyticsGraphData(entities.SUBSCRIBERS, showdataUpto)).then((res: GraphDataAPIResponse | null) => {
      res && setData(res);
    });
  }, [showdataUpto]);
  const config = getGraphConfig(data);
  return (
    <div>
      <Card>
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <Heading title="Email Subscribers" type="small" className="mb-5" />
          <Select
            className={styles.selectField}
            value={showdataUpto}
            onChange={(value: number) => setShowdataUpto(value)}
          >
            <Select.Option value={100}>Last 100 days</Select.Option>
            <Select.Option value={50}>Last 50 days</Select.Option>
            <Select.Option value={30}>Last 1 Month</Select.Option>
            <Select.Option value={7}>Last 1 Week</Select.Option>
          </Select>
        </div>
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
