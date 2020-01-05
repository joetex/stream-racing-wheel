import React, { Component } from 'react';
import flatiron from '../flatiron';
class Wheel extends Component {

    render() {
        let degrees = this.props.rotation * 900;
        let wheelStyle = {
            //width: '400px',
            transform: 'rotate(' + degrees + 'deg)'
        };

        return (
            <img style={wheelStyle} src="g920/wheel.png" />
        )
    }
}

let onCustomWatched = (ownProps) => {
    return ['axes-' + ownProps.axis];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        rotation: value
    }
}

export default flatiron.connect([], onCustomWatched, onCustomProps)(Wheel);