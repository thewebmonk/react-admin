import { notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { openNotification } from '../../../common/utils';
import { permissions } from '../../../common/utils/constants';
import { Dispatch } from '../../../types/index.types';
import { roles } from '../../login/constants';
import { createVideo } from '../actions/async-action';
import { VideoFormFields } from '../videos.type';

export const useUserForm = (editMode?: boolean) => {
  const [videoId, setVideoIdForThumb] = useState('');
  const [editVideoId, setEditVideoId] = useState(false);
  const form: any = useRef(null);
  const [initialValues, setInitialValues] = useState<VideoFormFields>({
    title: '',
    videoId: '',
    url: ''
  });
  const dispatch = useDispatch<Dispatch>();
  // const { id } = useParams();
  // const navigate = useNavigate();
  const handleCreateVideo = async (formValue: VideoFormFields) => {
    console.log(formValue);
    const { title, videoId } = formValue;
    const video = await dispatch(createVideo({ title, videoId }));
    if (video) {
      openNotification({
        message: 'Video added.'
      });
      form.current && form.current.resetFields();
      setEditVideoId(false);
      setVideoIdForThumb('');
    } else {
      openNotification({
        message: 'Something went wrong'
      });
    }
  };

  // useEffect(() => {
  //   if (editMode && id) {
  //     dispatch(getUser(id)).then((data: User | null) => {
  //       if (data) {
  //         const prms: string[] = [];
  //         Object.entries(data.permission).forEach((prm: [string, boolean]) => {
  //           prm[1] && prms.push(prm[0]);
  //         });
  //         const { firstName, lastName, email, role } = data;
  //         setRole(role);
  //         if (form.current) {
  //           const values = form.current.getFieldsValue();
  //           form.current.setFieldsValue({ ...values, firstName, lastName, email, role, permission: prms });
  //         }
  //       } else {
  //         navigate('../');
  //       }
  //     });
  //   }
  // }, []);

  return { form, initialValues, handleCreateVideo, videoId, setEditVideoId, editVideoId, setVideoIdForThumb };
};
