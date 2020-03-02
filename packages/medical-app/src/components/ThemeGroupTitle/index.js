import React from 'react';
import './ThemeGroupTitle.scss';


const ThemeGroupTitle = (props) => {
  const { title, className } = props;
  const classes = `ThemeGroupTitle theme-heading-small ${className}`;
  return (
    <h2 className={classes}><span>{title}</span></h2>
  );
};

export default ThemeGroupTitle;
