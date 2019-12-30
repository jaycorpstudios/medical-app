import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './ThemeModal.module.scss';

// TODO: Add modal styles [vertical, small, medium, large];
const ThemeModal = ({
  children,
  open,
  className,
  setNodeRef,
}) => {
  const { backdrop, modal, container } = styles;
  const modalContainer = document.getElementById('app-modals');
  return !open ? null : ReactDOM.createPortal(
    <section className={modal}>
      <div className={classnames(container, className)}>
        {children}
      </div>
      <div className={backdrop} ref={setNodeRef} />
    </section>,
    modalContainer,
  );
};

ThemeModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  open: PropTypes.bool,
  className: PropTypes.string,
  setNodeRef: PropTypes.func,
};

ThemeModal.defaultProps = {
  open: false,
  className: '',
};

export default ThemeModal;
