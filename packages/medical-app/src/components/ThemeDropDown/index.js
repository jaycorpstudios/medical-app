import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ThemeDropDownPropTypes from './propTypes';
import styles from './ThemeDropDown.module.scss';
import ThemeButtonDefault from '../ThemeButtonDefault';

const DropDownOptions = ({ options, alignTo }) => {
  const initialState = {
    containerWidth: 0,
  };
  const [measures, setMeasures] = useState(initialState);
  const containerRef = useRef(null);

  useEffect(() => {
    const { width } = containerRef.current.getBoundingClientRect();
    setMeasures({ ...measures, containerWidth: width });
  }, []);

  // TODO: consider parent's width in order to calculate position.
  const calculateHorizontalPosition = () => {
    const center = (measures.containerWidth / 2);
    return `-${center}px`;
  };

  const getAlignmentClass = () => {
    const alignClasses = {
      center: 'alignCenter',
      right: 'alignRight',
      left: 'alignLeft',
    };
    return styles[alignClasses[alignTo] || 'right'];
  };

  const style = alignTo === 'center' ? { left: calculateHorizontalPosition() } : {};
  const classNames = classnames(styles.ThemeDropDownOptions, getAlignmentClass());
  return (
    <div className={classNames} ref={containerRef} style={style}>
      {options.map((option) => <ThemeButtonDefault key={Math.random()} noShadow {...option} />)}
    </div>
  );
};

DropDownOptions.propTypes = {
  options: ThemeDropDownPropTypes.options,
  alignTo: ThemeDropDownPropTypes.alignTo,
};

DropDownOptions.defaultProps = {
  options: [],
  alignTo: 'right',
};

const DropDownWrapper = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={styles.DropDownWrapper}
  >
    {children}
  </button>
);

DropDownWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

class ThemeDropDown extends React.Component {
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
          { children ? <DropDownWrapper onClick={onClick}>{children}</DropDownWrapper>
            : <ThemeButtonDefault active={isOpen} icon={icon} title={title} onClick={onClick} />}
          {isOpen && <DropDownOptions options={options} alignTo={alignTo} />}
        </div>
      );
    }
}

ThemeDropDown.propTypes = {
  ...ThemeDropDownPropTypes,
};

ThemeDropDown.defaultProps = {
  options: [],
  alignTo: 'right',
  onClick: () => {},
  children: undefined,
};

export default ThemeDropDown;
