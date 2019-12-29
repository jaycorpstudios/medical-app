import React from 'react';
import classnames from 'classnames';
import styles from './ThemeAlert.module.scss';

const ThemeAlert = ({
  type = 'info', text = '', highlight, className, style,
}) => {
  const typeIcons = {
    info: 'info_outline',
    success: 'check_circle_outline',
    warning: 'warning',
    error: 'error',
  };
  const classes = classnames(styles.ThemeAlert, styles[type], className);
  const icon = typeIcons[type];

  return (
    <div className={classes} style={style}>
      <span className="material-icons">{icon}</span>
      <span className={styles.textContainer}>
        {highlight && <span className={styles.highlight}>{highlight}</span>}
        <span>{text}</span>
      </span>
    </div>
  );
};

export default ThemeAlert;
