import React from 'react';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { NewsLetterAPI } from './newsletter.types';

export const getNewsLetterTableColumn = () => {
  const columns: ColumnsType<NewsLetterAPI> = [
    {
      title: 'Id',
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (email: string) => <a href={`mailto:${email}`}>{email}</a>
    },
    {
      title: 'Subscribed at',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (created_at: string) => moment(created_at).format('DD MMM YYYY, hh:mm A'),
      defaultSortOrder: 'ascend',
      sorter: (a: NewsLetterAPI, b: NewsLetterAPI) => (moment(a.created_at).isAfter(moment(b.created_at)) ? -1 : 1)
    }
  ];
  return columns;
};
