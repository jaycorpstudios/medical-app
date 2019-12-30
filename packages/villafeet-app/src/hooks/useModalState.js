import { useState, useEffect } from 'react';

let wrapperNode;

const useModalState = (initialState = false) => {
  const [shouldDisplayModal, openModal] = useState(initialState);

  const handleExternalClicks = (event) => {
    const isSameComponent = wrapperNode && wrapperNode.contains(event.target);
    if (wrapperNode && isSameComponent) openModal(false);
  };

  const handleKeyPress = (event) => {
    const { key = '' } = event;
    if (key === 'Escape') openModal(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleExternalClicks, false);
    document.addEventListener('keydown', handleKeyPress, false);
    return () => {
      document.removeEventListener('click', handleExternalClicks, false);
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, []);

  const setNodeRef = (ref) => {
    wrapperNode = ref;
  };

  return {
    shouldDisplayModal,
    openModal,
    setNodeRef,
  };
};

export default useModalState;
