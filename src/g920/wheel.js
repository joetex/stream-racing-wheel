import React from 'react';
import flatstore from 'flatstore';

flatstore.set('maxrotation', 900);

function Wheel(props) {

    let [imgWheel] = flatstore.useWatch('imgWheel');
    let [currentRotation] = flatstore.useWatch('valueWheel');

    let maxrotation = flatstore.get('maxrotation');
    let degrees = currentRotation * (maxrotation / 2);
    let wheelStyle = {
        transform: 'rotate(' + degrees + 'deg)'
    };

    return (
        <img width="500px" height="500px" alt="" style={wheelStyle} src={imgWheel} />
    )

}

export default Wheel;