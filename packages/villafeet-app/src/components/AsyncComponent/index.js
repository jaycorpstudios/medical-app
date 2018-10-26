import React from 'react'

export default function asyncComponent (getComponent) {
  class LazyComponent extends React.Component {
    constructor (props) {
      super(props);
      this.state = { Component: null }
    }
    componentWillMount () {
      if (!this.state.Component) {
        getComponent()
          .then(Component => { this.setState({ Component }) })
      }
    }
    render () {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }
  return LazyComponent;
}
