import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import blurAppBackground from '../../actions/animation';
import styles from './ThemeModal.module.scss';

const ModalContainerWithTransition = ({ open, className, children }) => {
  const modalAnimationClasses = {
    enter: styles.ModalContainerEnter,
    enterActive: styles.ModalContainerEnterActive,
    enterDone: styles.ModalContainerEnterDone,
    exit: styles.ModalContainerExit,
    exitActive: styles.ModalContainerExitActive,
  };
  const { container } = styles;
  return (
    <TransitionGroup>
      {open && (
        <CSSTransition
          timeout={1000}
          classNames={modalAnimationClasses}
        >
          <div className={classnames(container, className)}>
            {children}
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

ModalContainerWithTransition.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  open: PropTypes.bool,
  className: PropTypes.string,
};

ModalContainerWithTransition.defaultProps = {
  open: false,
  className: '',
};

const BackdropWithTransition = ({ open, setNodeRef, dispatchBlurAppBackground }) => {
  useEffect(() => {
    if (open) dispatchBlurAppBackground(true);
    return () => {
      dispatchBlurAppBackground(false);
    };
  }, [open]);
  const { backdrop } = styles;
  const backdropAnimationClasses = {
    enter: styles.BackdropEnter,
    enterActive: styles.BackdropEnterActive,
    enterDone: styles.BackdropEnterDone,
    exit: styles.BackdropExit,
    exitActive: styles.BackdropExitActive,
  };
  return (
    <TransitionGroup>
      {open && (
        <CSSTransition
          timeout={2000}
          classNames={backdropAnimationClasses}
        >
          <div className={backdrop} ref={setNodeRef} />
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

BackdropWithTransition.propTypes = {
  open: PropTypes.bool,
  setNodeRef: PropTypes.func,
  dispatchBlurAppBackground: PropTypes.func,
};

BackdropWithTransition.defaultProps = {
  open: false,
  setNodeRef: () => {},
  dispatchBlurAppBackground: () => {},
};
const mapDispatchToProps = (dispatch) => (
  {
    dispatchBlurAppBackground: (shouldBlurApp) => dispatch(blurAppBackground(shouldBlurApp)),
  }
);
const BackdropWithTransitionConnect = connect(null, mapDispatchToProps)(BackdropWithTransition);

// TODO: Add modal styles [vertical, small, medium, large];
const ThemeModal = ({
  children,
  open,
  className,
  setNodeRef,
}) => {
  const { modal } = styles;
  const modalContainer = document.getElementById('app-modals');
  return ReactDOM.createPortal(
    <section className={modal}>
      <ModalContainerWithTransition open={open} className={className}>
        {children}
      </ModalContainerWithTransition>
      <BackdropWithTransitionConnect open={open} setNodeRef={setNodeRef} />
    </section>,
    modalContainer,
  );
};

ThemeModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  setNodeRef: PropTypes.func,
};

ThemeModal.defaultProps = {
  open: false,
  className: '',
};

export default ThemeModal;
