import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './ThemeDropDown.module.scss';
import ThemeButtonDefault from '../ThemeButtonDefault';

class DropDownOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
    };
  }

  componentDidMount() {
    const { width } = this.refs.container.getBoundingClientRect();
    this.setState({ containerWidth: width });
  }

  // TODO: consider parent's width in order to calculate position.
  calculateHorizontalPosition() {
    const center = (this.state.containerWidth / 2);
    return `-${center}px`;
  }

  getAlignmentClass() {
    const { alignTo } = this.props;
    const alignClasses = {
      center: 'alignCenter',
      right: 'alignRight',
      left: 'alignLeft',
    };
    return styles[alignClasses[alignTo]];
  }

  render() {
    const { options, alignTo } = this.props;
    const style = alignTo === 'center' ? { left: this.calculateHorizontalPosition() } : {};
    const classNames = classnames(styles.ThemeDropDownOptions, this.getAlignmentClass());
    return (
      <div className={classNames} ref="container" style={style}>
        {options.map((option, key) => <ThemeButtonDefault key={key} noShadow {...option} />)}
      </div>
    );
  }
}

class ThemeDropDown extends React.Component {
    renderChildren = () => {
      const { children, onClick } = this.props;
      return (
        <span onClick={onClick}>
          {children}
        </span>
      );
    }

    getDropDownOptionsSize = (node) => {
      this.dropDownOptionsWidth = node && node.getBoundingClientRect();
    }

    render() {
      const {
        options, icon, title, isOpen, onClick, children, className, alignTo,
      } = this.props;
      const classes = classnames(styles.ThemeDropDown, className);
      return (
        <div className={classes}>
          { children ? this.renderChildren() : <ThemeButtonDefault active={isOpen} icon={icon} title={title} onClick={onClick} /> }
          {isOpen && <DropDownOptions options={options} alignTo={alignTo} />}
        </div>
      );
    }
}

ThemeDropDown.propTypes = {
  options: PropTypes.array,
  alignTo: PropTypes.oneOf(['left', 'center', 'right']),
};

ThemeDropDown.defaultProps = {
  options: [],
  alignTo: 'right',
};

export default ThemeDropDown;
