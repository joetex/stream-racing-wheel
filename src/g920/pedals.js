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
            <Pedal id='valueGas' invertId={'btnGas'} top={-20} left={290} downAmount={50} src={imgGas} />
            <Pedal id='valueBrake' invertId={'btnBrake'} top={-10} left={160} downAmount={50} src={imgBrake} />
            <Pedal id='valueClutch' invertId={'btnClutch'} top={-10} left={40} downAmount={50} src={imgClutch} />

            <img alt="" style={pedalsStyle} src={imgPedalBase} />

        </div>
    )

}


export default Pedals;