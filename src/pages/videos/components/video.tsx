import React from 'react';
import { Video } from '../videos.type';
import styles from '../videos.module.scss';
import { ReactComponent as TrashIcon } from '../../../common/svg/trash.svg';
import { ReactComponent as ExLinkIcon } from '../../../common/svg/external-link.svg';
import { Popconfirm } from 'antd';

type VideoProps = {
  video: Video;
  handleDelete: (id: any) => void;
};

const VideoCard = ({ video, handleDelete }: VideoProps) => {
  return (
    <div className={styles.video}>
      <div className={styles.thumb}>
        <img src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`} alt="yt thumb" />
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>{video.title}</div>
      </div>
      <div className={styles.actions}>
        <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target={'_blank'} rel="noreferrer">
          <ExLinkIcon height={20} width={20} />
        </a>
        <Popconfirm
          placement="bottom"
          title={'Are you sure that you want to delete ?'}
          onConfirm={() => handleDelete(video.id)}
          okText="Yes"
          cancelText="No"
        >
          <TrashIcon color="#ff3d3d" height={20} width={20} />
        </Popconfirm>
      </div>
    </div>
  );
};

export default VideoCard;
