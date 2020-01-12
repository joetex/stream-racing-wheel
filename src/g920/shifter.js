import React, { Component } from 'react';
import flatstore from 'flatstore';
class ShifterBase extends Component {

    constructor(props) {
        super(props);
        this.halfGrid = this.props.gridSize / 2.0;
        this.halfGridY = this.props.gridSize / 2.2;
        this.moveX = 0;
        this.moveY = 0;
    }

    render() {
        let speed = '100ms';
        let highlightX = 0;
        let highlightY = 0;

        switch (this.props.gear) {
            case -1: speed = '500ms'; this.moveX = 0; this.moveY = 0; break;
            case 0: this.moveX = this.halfGrid; this.moveY = this.halfGridY; break;
            case 1: this.moveX = -this.halfGrid; this.moveY = -this.halfGridY; break;
            case 2: this.moveX = -this.halfGrid; this.moveY = this.halfGridY; break;
            case 3: this.moveX = 0; this.moveY = -this.halfGridY; break;
            case 4: this.moveX = 0; this.moveY = this.halfGridY; break;
            case 5: this.moveX = this.halfGrid; this.moveY = -this.halfGridY; break;
            case 6: this.moveX = this.halfGrid; this.moveY = this.halfGridY; break;
            default: speed = '500ms'; this.moveX = 0; this.moveY = 0; break;
        }
        let shifterStyle = {
            width: '150px',
            'zIndex': '999',
            position: 'absolute',
            top: this.props.top + 'px',
            left: this.props.left + 'px',
            transition: 'all ' + speed,
            transform: 'translate(' + this.moveX + 'px, ' + this.moveY + 'px)'
        };



        let highlightStyle = {
            backgroundColor: 'red',
            width: '10px',
            height: '20px',
            'zIndex': '999',
            position: 'absolute',
            top: highlightX + 'px',
            left: highlightY + 'px',
            display: 'none'
        }

        return (
            <div style={{ position: 'relative' }}>
                <div style={highlightStyle}></div>
                <img alt="" style={shifterStyle} src="g920/shifter.png" />
            </div>
        )
    }
}

let onCustomWatched = (ownProps) => {
    return ['buttons-' + ownProps.gear1, 'buttons-' + ownProps.gear2, 'buttons-' + ownProps.gear3, 'buttons-' + ownProps.gear4, 'buttons-' + ownProps.gear5, 'buttons-' + ownProps.gear6, 'buttons-' + ownProps.reverse];
}
let onCustomProps = (key, value, store, ownProps) => {

    let gear = ownProps.gear || -1;
    let gearButton = ownProps.gearButton || -1;

    if (value.pressed) {
        switch (key) {
            case 'buttons-' + ownProps.gear1: gear = 1; gearButton = ownProps.gear1; break;
            case 'buttons-' + ownProps.gear2: gear = 2; gearButton = ownProps.gear2; break;
            case 'buttons-' + ownProps.gear3: gear = 3; gearButton = ownProps.gear3; break;
            case 'buttons-' + ownProps.gear4: gear = 4; gearButton = ownProps.gear4; break;
            case 'buttons-' + ownProps.gear5: gear = 5; gearButton = ownProps.gear5; break;
            case 'buttons-' + ownProps.gear6: gear = 6; gearButton = ownProps.gear6; break;
            case 'buttons-' + ownProps.reverse: gear = 0; gearButton = ownProps.reverse; break;
            default: gear = -1; break;
        }
    }
    else if ('buttons-' + ownProps.gearButton === key) {
        gear = -1;
    }
    return {
        gear,
        gearButton
    };
}

export default flatstore.connect([], onCustomWatched, onCustomProps)(ShifterBase);