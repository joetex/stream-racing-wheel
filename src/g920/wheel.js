import React, { Component } from 'react';
import flatstore from 'flatstore';

flatstore.set('maxrotation', 900);
class Wheel extends Component {

    render() {
        let maxrotation = flatstore.get('maxrotation');
        let degrees = this.props.currentRotation * (maxrotation / 2);
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
        currentRotation: value
    }
}

export default flatstore.connect([], onCustomWatched, onCustomProps)(Wheel);