import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { storeSettings } from '../../actions';
import { fetchSettings } from '../../actions/async-action';
import { Dispatch } from '../../types/index.types';
import ManageVideo from './components/manage-video';
import VideosList from './components/videos-list';

const VideosPage = () => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch(fetchSettings());
    return () => {
      dispatch(storeSettings(null));
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<VideosList />} />
      <Route path="/addVideo" element={<ManageVideo />} />
      <Route path="/*" element={<Navigate to={`/videos`} replace />} />
    </Routes>
  );
};

export default VideosPage;
