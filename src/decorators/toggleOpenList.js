import React, { PropTypes, Component } from 'react';

export default (CustomComponent) => class DecoratedComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedId: null
        };
    }

    toggleOpen = id => ev => {
        this.setState({
            openedId: (this.state.openedId !== id) ? id : null
        });
    }

    render() {
        return <CustomComponent {...this.props}
                openedId = {this.state.openedId}
                toggleOpen = { this.toggleOpen } />
    }
};
