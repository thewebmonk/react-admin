import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Checkbox, Form, Input, Select } from 'antd';
import { permissions } from '../../../../common/utils/constants';
import Heading from '../../../commom/components/heading/heading';
import { useUserForm } from '../../hooks/hooks';
import styles from './manage-video.module.scss';
import { roles } from '../../../login/constants';
import { VideoFormFields } from '../../videos.type';
import { youtubeVidoIdParser } from '../../utils';
import { useNavContext } from '../../../../hooks';
type ManageVideoProps = {
  editMode?: boolean;
};

const ManageVideo = ({ editMode }: ManageVideoProps) => {
  const { initialValues, handleCreateVideo, form, videoId, setVideoIdForThumb, editVideoId, setEditVideoId } =
    useUserForm(editMode);
  const { setGoBackRoute } = useNavContext();
  const onFinish = async (values: VideoFormFields) => {
    handleCreateVideo(values);
  };
  const setVideoID = (id: string) => {
    if (form.current) {
      const values = form.current.getFieldsValue();
      form.current.setFieldsValue({ ...values, videoId: id || '' });
      setVideoIdForThumb(id);
    }
  };
  const validateUrl = async (rule: any, value: string) => {
    if (value.trim() == '') {
      throw new Error('Please enter URL');
    }
    if (!value.match(/^(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/g)) {
      setVideoID('');
      throw new Error('Not a valid youtube url.');
    }
    const videoId = youtubeVidoIdParser(value);
    if (!videoId) {
      setVideoID('');
      throw new Error('Not a valid youtube url.');
    }
    setVideoID(videoId);
  };
  useEffect(() => {
    setGoBackRoute && setGoBackRoute('./videos');
  }, []);
  return (
    <Card>
      <Heading title={`${editMode ? 'Edit' : 'Add'} Video`} type="small" className="mb-3" />
      <Form initialValues={initialValues} ref={form} onFinish={onFinish} className={styles.profileForm}>
        <Form.Item
          className="mb-3"
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please add title', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="mb-3"
          label="Youtube video URL"
          name="url"
          rules={[{ required: true, validator: validateUrl }]}
        >
          <Input type={'url'} />
        </Form.Item>
        <Form.Item
          className="mb-3"
          label={
            <>
              Youtube video Id :{' '}
              <Button onClick={() => setEditVideoId(true)} type="link">
                Edit
              </Button>
            </>
          }
          colon={false}
          name="videoId"
          rules={[{ required: true, message: 'Please add title', whitespace: true }]}
        >
          <Input disabled={!editVideoId} onChange={(e: any) => setVideoID(e.target.value)} />
        </Form.Item>

        {videoId && <img className={styles.image} src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt="yt thumb" />}

        <Form.Item className="mt-3">
          <Button type="primary" htmlType="submit">
            Add Video
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ManageVideo;
// pattern: /^\S*$/g
