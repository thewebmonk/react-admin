import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setErrorModal } from '../../actions';
import { Dispatch, RootState } from '../../types/index.types';
import styles from './error-modal.module.scss';

const ErrorModal = () => {
  const [visible, setVisible] = useState(false);
  const errorMessage = useSelector((state: RootState) => state.pageUIState.errorModal.message);
  const dispatch: Dispatch = useDispatch();

  const handleOk = () => {
    dispatch(setErrorModal(null));
  };

  useEffect(() => {
    if (errorMessage) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [errorMessage]);
  return (
    <Modal
      title="Error"
      footer={
        <Button type="primary" onClick={handleOk}>
          Ok
        </Button>
      }
      wrapClassName={styles.modalContainer}
      centered
      onOk={handleOk}
      visible={visible}
    >
      {errorMessage}
    </Modal>
  );
};

export default ErrorModal;
