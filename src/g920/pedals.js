import React, { Component } from 'react';

import Pedal from './pedal';

class Pedals extends Component {

    render() {

        let pedalsStyle = {
            width: '400px'
        }
        return (
            <div style={{ position: 'relative' }}>
                <Pedal top={-20} left={290} downAmount={50} axis={1} src="g920/gas.png" />
                <Pedal top={-10} left={160} downAmount={50} axis={2} src="g920/brake.png" />
                <Pedal top={-10} left={40} downAmount={50} axis={5} src="g920/clutch.png" />

                <img alt="" style={pedalsStyle} src="g920/pedals.png" />

            </div>
        )
    }
}


export default Pedals;