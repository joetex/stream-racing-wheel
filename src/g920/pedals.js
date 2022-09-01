import React from 'react';

import Pedal from './pedal';
import flatstore from 'flatstore';
function Pedals(props) {

    let [imgGas] = flatstore.useWatch('imgGas');
    let [imgBrake] = flatstore.useWatch('imgBrake');
    let [imgClutch] = flatstore.useWatch('imgClutch');
    let [imgPedalBase] = flatstore.useWatch('imgPedalBase');


    let pedalsStyle = {
        width: '400px'
    }
    return (
        <div style={{ position: 'relative' }}>
            <Pedal id='valueGas' top={-20} left={290} downAmount={50} src={imgGas} />
            <Pedal id='valueBrake' top={-10} left={160} downAmount={50} src={imgBrake} />
            <Pedal id='valueClutch' top={-10} left={40} downAmount={50} src={imgClutch} />

            <img alt="" style={pedalsStyle} src={imgPedalBase} />

        </div>
    )

}


export default Pedals;