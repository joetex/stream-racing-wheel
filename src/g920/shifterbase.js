import React from 'react';
import flatstore from 'flatstore';
import Shifter from './shifter';

function ShifterBase(props) {

    let [imgShifterBase] = flatstore.useWatch('imgShifterBase');

    return (
        <div style={{ position: 'relative' }}>
            <Shifter
                top={70}
                left={50}
                gridSize={150}
            />
            <img alt="" width="250px" src={imgShifterBase} />
        </div>
    )

}

export default ShifterBase;
