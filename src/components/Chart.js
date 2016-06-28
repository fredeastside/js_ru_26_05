import React, { Component, PropTypes } from 'react'
//import some d3

class Chart extends Component {
    static propTypes = {

    };

    componentDidMount() {
        console.log('---', 1)
        console.log('---', this.refs.container)
        this.refs.container.innerHTML = "hello world"
    }

    componentWillReceiveProps(nextProps) {
        //change chart
    }

    render() {
        return (
            <div>
                <h3>Chart for articles</h3>
                <div ref="container" />
            </div>
        )
    }
}

export default Chart
