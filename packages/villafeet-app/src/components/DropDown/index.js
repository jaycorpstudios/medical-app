import React from 'react';
import ThemeDropDown from '../ThemeDropDown';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleExternalClicks, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleExternalClicks, false);
  }

  setNodeRef = (ref) => {
    this.wrapperNode = ref;
  }

  handleExternalClicks = (event) => {
    const sameComponent = this.wrapperNode && this.wrapperNode.contains(event.target);
    if (!sameComponent) this.closeDropDown();
  }

  toggleDropDown = () => {
    this.setState((previousState) => ({ isOpen: !previousState.isOpen }));
  }

  closeDropDown = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const {
      options, icon, title, className, children, alignTo,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <div ref={this.setNodeRef}>
        <ThemeDropDown
          onClick={this.toggleDropDown}
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
  }
}

DropDown.defaultProps = {
  options: [],
};

export default DropDown;
