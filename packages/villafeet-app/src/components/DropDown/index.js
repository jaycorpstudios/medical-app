import React, { useState, useEffect } from 'react';
import ThemeDropDown from '../ThemeDropDown';
import ThemeDropDownPropTypes from '../ThemeDropDown/propTypes';

let wrapperNode;

const DropDown = ({
  options, icon, title, className, children, alignTo,
}) => {
  const [isOpen, setOpen] = useState(false);

  const closeDropDown = () => {
    setOpen(false);
  };

  const handleKeyPress = (event) => {
    const { key = '' } = event;
    if (key === 'Escape') setOpen(false);
  };

  const handleExternalClicks = (event) => {
    const sameComponent = wrapperNode && wrapperNode.contains(event.target);
    if (!sameComponent) closeDropDown();
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

  const toggleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
    <div ref={setNodeRef}>
      <ThemeDropDown
        onClick={toggleDropDown}
        options={options}
        icon={icon}
        title={title}
        className={className}
        isOpen={isOpen}
        alignTo={alignTo}
      >
        {children}
      </ThemeDropDown>
    </div>
  );
};

DropDown.propTypes = {
  ...ThemeDropDownPropTypes,
};

DropDown.defaultProps = {
  icon: '',
  title: '',
  className: '',
  alignTo: 'right',
  options: [],
  children: undefined,
};

export default DropDown;
