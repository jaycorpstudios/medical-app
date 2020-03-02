import React from 'react';
import PropTypes from 'prop-types';
import ThemeModal from '../ThemeModal';
import styles from './ModalConfirm.module.scss';
import ThemeButton from '../ThemeButton';

const confirmIllustration = require('../../theme/images/flame-delete-confirmation.png');

const ModalConfirm = ({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmTitle,
  cancelTitle,
  setNodeRef,
}) => {
  const { modal, illustration } = styles;
  return (
    <ThemeModal open={open} className={modal} setNodeRef={setNodeRef}>
      <img className={illustration} src={confirmIllustration} alt="Delete confirmation" />
      <div className="theme-heading-small">{title}</div>
      <div className="theme-body-small">{description}</div>
      <ThemeButton title={confirmTitle} onClick={onConfirm} />
      <ThemeButton title={cancelTitle} secondary onClick={onCancel} />
    </ThemeModal>
  );
};

ModalConfirm.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  confirmTitle: PropTypes.string,
  cancelTitle: PropTypes.string,
  description: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setNodeRef: PropTypes.func,
};

ModalConfirm.defaultProps = {
  open: false,
  title: '¿Estás seguro?',
  confirmTitle: 'Aceptar',
  cancelTitle: 'Cancelar',
  description: '',
  setNodeRef: () => {},
};

export default ModalConfirm;
