import React, { Component } from 'react';
import flatiron from '../flatiron';
import Shifter from './shifter';

class ShifterBase extends Component {

    render() {

        return (
            <div style={{ position: 'relative' }}>
                <Shifter
                    top={70}
                    left={50}
                    gridSize={150}
                    gear1={12}
                    gear2={13}
                    gear3={14}
                    gear4={15}
                    gear5={16}
                    gear6={17}
                    reverse={11} />
                <img width="250px" src="g920/shifter-base.png" />
            </div>
        )
    }
}

let onCustomWatched = (ownProps) => {
    return ['buttons-' + ownProps.axis];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        value: value
    }
}

export default flatiron.connect([], onCustomWatched, onCustomProps)(ShifterBase);