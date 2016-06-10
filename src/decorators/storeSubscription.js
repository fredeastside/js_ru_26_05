import React, { Component } from 'react'

export default (stores) => (Component) => class StoreSubscription extends Component {

  constructor(props) {
    super(props);

    this.state = this.getState();
  }

  componentDidMount() {
      Object.keys(stores).map((store) => {
        stores[store].addChangeListener(this.handleChange)
      });
  }

  componentWillUnmount() {
      Object.keys(stores).map((store) => {
        stores[store].removeChangeListener(this.handleChange)
      });
  }

  handleChange = () => {
      this.setState(this.getState());
  }

  getState() {
    return Object.keys(stores).reduce((state, store) => {
      state[store] = stores[store].getAll();
      return state;
    }, {});
  }

  render() {
      return <Component { ...this.props } { ...this.state } />
  }
}
