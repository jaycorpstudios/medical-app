import React from 'react';
import './TernaryButton.scss';

export default class TernaryButton extends React.Component {
  render() {
    const {
      className = '', title, negative = false, icon = '', ...other
    } = this.props;
    const classes = `TernaryButton ${negative ? '--negative' : ''} ${icon} ${className}`;

    return (
      <button className={classes} {...other}>{title}</button>
    );
  }
}
