import React from 'react';

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeBuilding: 0.3,
            cost: 25000000,
            time: 10,
            totalSum: 0
        };
    }
    render() {
        return <p>{this.state.cost}Hello, world!</p>;
    }
}

export default HelloWorld;