import React, { useEffect, useState } from 'react';
import { Button, Card, Popconfirm, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../types/index.types';
import Heading from '../commom/components/heading/heading';
import { deleteNewsletteEmails, getNewsletteEmails } from './actions/async-action';
import { NewsLetterAPI } from './newsletter.types';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { getNewsLetterTableColumn } from './utils';
import { humanizeHumber, openNotification } from '../../common/utils';
import parser from 'papaparse';

const NewsLetter = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [newsletter, setNewsletter] = useState<NewsLetterAPI[]>([]);
  const dispatch = useDispatch<Dispatch>();
  const fetchNewsLetter = async () => {
    const data = await dispatch(getNewsletteEmails());
    if (data) {
      setNewsletter(data);
    }
  };
  const handleDelete = async () => {
    const isDeleted = await dispatch(deleteNewsletteEmails(selectedRowKeys));
    if (isDeleted) {
      openNotification({ message: 'Deleted successfully' });
      setSelectedRowKeys([]);
      fetchNewsLetter();
    }
  };
  const handleExprtToCSV = () => {
    const csvdata = parser.unparse(newsletter);
    const blob = new Blob(['\ufeff', csvdata]);
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `subscribers_${moment()}.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  useEffect(() => {
    fetchNewsLetter();
  }, []);
  const columns = getNewsLetterTableColumn();
  return (
    <div>
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <Heading title={`Subscriibers (${humanizeHumber(newsletter.length)})`} className="ml-1" />
          {selectedRowKeys.length !== 0 && (
            <>
              <Button onClick={() => setSelectedRowKeys([])} type="link">
                Clear Selection
              </Button>
              <Popconfirm
                placement="bottomLeft"
                okButtonProps={{ danger: true }}
                onConfirm={handleDelete}
                title="Are you sure that you want to delete ?"
              >
                <Button danger>Delete {selectedRowKeys.length > 1 && 'All'}</Button>
              </Popconfirm>
            </>
          )}
        </div>
        <Button onClick={handleExprtToCSV} type="primary" className="is-flex is-align-items-center">
          Export
        </Button>
      </div>
      <Card className="mt-2">
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys: React.Key[]) => setSelectedRowKeys(selectedRowKeys)
          }}
          rowKey={'id'}
          scroll={{ y: 500 }}
          dataSource={newsletter}
          columns={columns}
        />
      </Card>
    </div>
  );
};

export default NewsLetter;
