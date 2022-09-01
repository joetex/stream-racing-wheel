import React from 'react';
import flatstore from 'flatstore';
function Shifter(props) {

    let [imgShifter] = flatstore.useWatch('imgShifter');

    let halfGrid = props.gridSize / 2.0;
    let halfGridY = props.gridSize / 2.2;
    let moveX = 0;
    let moveY = 0;


    let speed = '100ms';
    let highlightX = 0;
    let highlightY = 0;

    let gear = -1;

    let [gearReverse] = flatstore.useWatch('valueGearReverse');
    let [gear1] = flatstore.useWatch('valueGear1');
    let [gear2] = flatstore.useWatch('valueGear2');
    let [gear3] = flatstore.useWatch('valueGear3');
    let [gear4] = flatstore.useWatch('valueGear4');
    let [gear5] = flatstore.useWatch('valueGear5');
    let [gear6] = flatstore.useWatch('valueGear6');
    let [gear7] = flatstore.useWatch('valueGear7');
    let [gear8] = flatstore.useWatch('valueGear8');

    if (gearReverse) gear = 0;
    if (gear1) gear = 1;
    if (gear2) gear = 2;
    if (gear3) gear = 3;
    if (gear4) gear = 4;
    if (gear5) gear = 5;
    if (gear6) gear = 6;
    if (gear7) gear = 7;
    if (gear8) gear = 8;


    switch (gear) {
        case -1: speed = '500ms'; moveX = 0; moveY = 0; break;

        case 1: moveX = -halfGrid; moveY = -halfGridY; break;
        case 2: moveX = -halfGrid; moveY = halfGridY; break;
        case 3: moveX = 0; moveY = -halfGridY; break;
        case 4: moveX = 0; moveY = halfGridY; break;
        case 5: moveX = halfGrid; moveY = -halfGridY; break;
        case 6: moveX = halfGrid; moveY = halfGridY; break;
        case 7: moveX = halfGrid + (halfGrid); moveY = halfGridY; break;
        default: speed = '500ms'; moveX = 0; moveY = 0; break;
    }
    let shifterStyle = {
        width: '150px',
        'zIndex': '999',
        position: 'absolute',
        top: props.top + 'px',
        left: props.left + 'px',
        transition: 'all ' + speed,
        transform: 'translate(' + moveX + 'px, ' + moveY + 'px)'
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
            <img alt="" style={shifterStyle} src={imgShifter} />
        </div>
    )

}

export default Shifter;