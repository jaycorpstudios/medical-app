import PropTypes from 'prop-types';

const ThemeDropDownPropTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  alignTo: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ThemeDropDownPropTypes;
