import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import ManageVideo from './components/manage-video';
import VideosList from './components/videos-list';

const VideosPage = () => {
  return (
    <Routes>
      <Route path="/" element={<VideosList />} />
      <Route path="/addVideo" element={<ManageVideo />} />
      <Route path="/*" element={<Navigate to={`/videos`} replace />} />
    </Routes>
  );
};

export default VideosPage;
