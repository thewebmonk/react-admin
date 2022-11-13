import React from 'react';
import { Video } from '../videos.type';
import styles from '../videos.module.scss';
import { ReactComponent as TrashIcon } from '../../../common/svg/trash.svg';
import { ReactComponent as MoreIcon } from '../../../common/svg/more-vertical.svg';
import { ReactComponent as ExLinkIcon } from '../../../common/svg/external-link.svg';
import { Popconfirm, Popover, Tag } from 'antd';
export type AdditionalAction = {
  text: string;
  onClick: (video: Video) => void;
};
export type VideoTag = {
  color: string;
  text: string;
};
type VideoProps = {
  video: Video;
  handleDelete: (id: any) => void;
  tags?: VideoTag[];
  additionalAction?: AdditionalAction[];
};

const VideoCard = ({ video, handleDelete, tags, additionalAction }: VideoProps) => {
  return (
    <div className={styles.video}>
      {tags && tags.length > 0 && (
        <div className={styles.tag}>
          {tags.map((tag: VideoTag) => (
            <Tag key={tag.text} color={tag.color}>
              {tag.text}
            </Tag>
          ))}
        </div>
      )}
      <div className={styles.thumb}>
        <img src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`} alt="yt thumb" />
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>{video.title}</div>
      </div>
      <div className={styles.actions}>
        <div>
          <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target={'_blank'} rel="noreferrer">
            <ExLinkIcon height={20} width={20} />
          </a>
          <Popconfirm
            placement="bottomRight"
            title={'Are you sure that you want to delete ?'}
            onConfirm={() => handleDelete(video.id)}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon className="ml-2" color="#ff3d3d" height={20} width={20} />
          </Popconfirm>
        </div>
        <div>
          {additionalAction && (
            <Popover
              overlayClassName={styles.popupClass}
              trigger={'click'}
              placement="bottomRight"
              content={
                <div className={styles.moreActionContainer}>
                  {additionalAction.map((action: AdditionalAction, index: number) => (
                    <div key={index} onClick={() => action.onClick(video)} className={styles.moreAction}>
                      {action.text}
                    </div>
                  ))}
                </div>
              }
            >
              <MoreIcon height={20} width={20} />
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
