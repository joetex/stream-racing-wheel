import React, { Component } from 'react';
import flatstore from 'flatstore';
class Wheel extends Component {

    render() {
        let degrees = this.props.rotation * 900;
        let wheelStyle = {
            //width: '400px',
            transform: 'rotate(' + degrees + 'deg)'
        };

        return (
            <img alt="" style={wheelStyle} src="/stream-racing-wheel/g920/wheel.png" />
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

export default flatstore.connect([], onCustomWatched, onCustomProps)(Wheel);