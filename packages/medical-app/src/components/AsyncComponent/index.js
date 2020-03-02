import React from 'react';

export default function asyncComponent(getComponent) {
  class LazyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { Component: null };
    }

    componentDidMount() {
      const { Component } = this.state;
      if (!Component) {
        getComponent()
          .then((FetchedComponent) => { this.setState({ Component: FetchedComponent }); });
      }
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }
  return LazyComponent;
}
