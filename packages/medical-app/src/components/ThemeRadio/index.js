import React from 'react';
import './ThemeRadio.scss';

export default class ThemeRadio extends React.Component {
  renderOptions(options, props) {
    const { name, value: currentValue, ...other } = props;

    return options.map((option, index) => (
      <label key={index}>
        <input type="radio" name={name} value={option.value} checked={option.value === currentValue} {...other} />
        {option.text}
      </label>
    ));
  }

  render() {
    const { className = '', label, options } = this.props;
    const classes = `ThemeRadio theme-body-regular ${className}`;
    return (
      <div className={classes}>
        <span className="ThemeRadio__label theme-input-text">{label}</span>
        {this.renderOptions(options, this.props)}
      </div>
    );
  }
}

ThemeRadio.defaultProps = {
  options: [],
};
