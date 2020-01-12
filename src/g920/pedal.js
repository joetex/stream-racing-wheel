import React, { Component } from 'react';
import flatstore from 'flatstore';
class Pedal extends Component {

    render() {
        let currentPos = this.props.downAmount * this.props.value * -1;

        let wheelStyle = {
            width: '70px',
            position: 'absolute',
            top: this.props.top + 'px',
            left: this.props.left + 'px',
            transform: 'translateY(' + currentPos + 'px)'
        };

        return (
            <img alt="" style={wheelStyle} src={this.props.src} />
        )
    }
}

let onCustomWatched = (ownProps) => {
    return ['axes-' + ownProps.axis];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        value: value
    }
}

export default flatstore.connect([], onCustomWatched, onCustomProps)(Pedal);