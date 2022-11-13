import { Button, Input, List } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../commom/components/heading/heading';
import { ReactComponent as Plus } from '../../../common/svg/plus.svg';
import styles from '../videos.module.scss';
import { Video } from '../videos.type';
import { useDispatch } from 'react-redux';
import { Dispatch, RootState } from '../../../types/index.types';
import { deleteVideo, getAllVideos } from '../actions/async-action';
import VideoCard, { AdditionalAction, VideoTag } from './video';
import NoData from '../../commom/components/no-data-available/no-data';
import { useIsMobile, useUdpateSettings } from '../../../hooks';
import { useSelector } from 'react-redux';
import { settingsKeys } from '../../../common/utils/constants';

const VideosList = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [search, setSearch] = useState<string>('');
  const settings = useSelector((state: RootState) => state.pageUIState.settings);
  const { about_videoId, course1_videoId } = settings || {};
  const updateSettings = useUdpateSettings();
  const getTag = (videoId: any) => {
    const tags: VideoTag[] = [];
    if (videoId === about_videoId) {
      tags.push({ text: 'About Video', color: 'blue' });
    }
    if (videoId === course1_videoId) {
      tags.push({ text: 'Course Video', color: 'cyan' });
    }
    return tags;
  };
  const isMobile = useIsMobile();
  const dispatch = useDispatch<Dispatch>();
  const additionalAction = useMemo<AdditionalAction[]>(
    () => [
      {
        text: 'Set as about video',
        onClick: (video: Video) => updateSettings(settingsKeys.ABOUT_VIDEOID, video.videoId)
      },
      {
        text: 'Set as course video',
        onClick: (video: Video) => updateSettings(settingsKeys.COURSE1_VIDEOID, video.videoId)
      }
    ],
    []
  );
  const fetchVideos = async () => {
    const data = await dispatch(getAllVideos());
    data && setVideos(data);
  };
  const handleDelete = async (id: any) => {
    const isDeleted = await dispatch(deleteVideo(id));
    isDeleted && fetchVideos();
  };
  useEffect(() => {
    fetchVideos();
  }, []);
  return (
    <div>
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <Heading title="Vidoes" className="ml-1" />
          <Input
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="ml-5"
            placeholder="type here to search..."
          />
        </div>
        <Link to={'./addVideo'}>
          <Button type="primary" className="is-flex is-align-items-center">
            <Plus height={20} width={20} className="mr-1" />
            {isMobile ? '' : 'Add Video'}
          </Button>
        </Link>
      </div>
      {videos.length ? (
        <>
          <List
            className="mt-3"
            pagination={{
              pageSize: 18
            }}
            grid={{ gutter: 16, column: isMobile ? 2 : 6 }}
            dataSource={
              search
                ? videos.filter((video: Video) => video.title.toLowerCase().includes(search.toLowerCase()))
                : videos
            }
            renderItem={(video) => (
              <List.Item>
                <VideoCard key={video.id} {...{ video, handleDelete, tags: getTag(video.videoId), additionalAction }} />
              </List.Item>
            )}
          />
        </>
      ) : (
        <NoData text="No Videos to show" />
      )}
    </div>
  );
};

export default VideosList;
