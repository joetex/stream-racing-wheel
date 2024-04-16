import React from 'react';
import flatstore from 'flatstore';
function Shifter(props) {

    let [imgShifter] = flatstore.useWatch('imgShifter');

    let halfGrid = props.gridSize / 2.0;
    let halfGridY = props.gridSize / 2.2;
    let moveX = 0;
    let moveY = 0;


    let speed = '200ms';
    let highlightX = 0;
    let highlightY = 0;
    let displayText = '';

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

    if (gearReverse?.value) gear = 0;
    if (gear1?.value) gear = 1;
    if (gear2?.value) gear = 2;
    if (gear3?.value) gear = 3;
    if (gear4?.value) gear = 4;
    if (gear5?.value) gear = 5;
    if (gear6?.value) gear = 6;
    if (gear7?.value) gear = 7;
    if (gear8?.value) gear = 8;


    switch (gear) {
        case -1: speed = '500ms'; moveX = 0; moveY = 0; displayText = 'N'; break; 
        case 0: speed = '500ms'; moveX = halfGrid + (halfGrid); moveY = halfGridY;  displayText = 'R'; break;
        case 1: moveX = -halfGrid; moveY = -halfGridY; displayText = gear.toString(); break;
        case 2: moveX = -halfGrid; moveY = halfGridY; displayText = gear.toString(); break;
        case 3: moveX = 0; moveY = -halfGridY; displayText = gear.toString(); break; 
        case 4: moveX = 0; moveY = halfGridY; displayText = gear.toString(); break;
        case 5: moveX = halfGrid; moveY = -halfGridY; displayText = gear.toString(); break;
        case 6: moveX = halfGrid; moveY = halfGridY; displayText = gear.toString(); break;
        case 7: moveX = halfGrid + (halfGrid); moveY = halfGridY; displayText = gear.toString(); break;
        default: speed = '500ms'; moveX = 0; moveY = 0; displayText = 'N'; break; 
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
            <span style={{ position: 'absolute', top: '-30px', left: '120px', zIndex: '999', color:'white'}}>{displayText}</span>
            <img alt="" style={shifterStyle} src={imgShifter} />
        </div>
    )

}

export default Shifter;