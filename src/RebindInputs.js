import React from 'react';
import flatstore from 'flatstore';
import { ProfileLoader, getDefaultProfile, loadDefaultProfile, loadProfile } from './KeybindProfiles';


function PreviewButtons({ }) {

    // let [axes] = flatstore.useWatch('axes');
    // let [buttons] = flatstore.useWatch('buttons');
    let [actionStates] = flatstore.useWatch('actionStates');


    let actionOptions = [];

    let axisOptions = [];
    let buttonOptions = [];
    let displayAxes = [];
    let displayButtons = [];

    if (!actionOptions)
        return <></>

    for (let x = 0; x < actionStates.length; x++) {

        let action = actionStates[x];
        let { type, id, index, pressed, value } = action;

        if (Math.abs(value) > 0 && value < 1) {
            value = value.toFixed(2);
        }

        if (type == 'Button') {
            displayButtons.push(
                <span
                    key={"displayButtons-" + id}
                    style={{
                        display: 'inline-block',
                        position: 'relative',
                        textAlign: 'center',
                        borderRadius: '50%',
                        width: '2.5rem',
                        height: '2.5rem',
                        padding: '0.5rem',
                        margin: '0.2rem',

                        backgroundColor: '#222',
                    }}>
                    <span style={{
                        backgroundColor: '#222',
                        position: 'absolute',
                        top: 0, left: 0,
                        borderRadius: '50%',
                        width: '2.5rem',
                        height: '2.5rem',
                        padding: '0.5rem',
                        width: '100%',
                        height: '100%',
                        color: (!pressed ? 'white' : 'black'),
                        backgroundColor: (!pressed ? '#222' : `rgba(255,255,255,${Math.abs(value) * 1})`),
                    }}>
                        {id}</span>
                    {/* <span style={{ fontSize: '8px', position: 'absolute', bottom: '4px', left: '25%' }}>{value}</span> */}
                </span>
            )
            actionOptions.push(<option key={"optionButtons-" + index} value={index}>Button {id}</option>)
        } else if (type == 'Axis') {
            let axisValue = Number.parseFloat(value);
            let pct = ((axisValue + 1.0) / 2.0) * 100;
            pct = Math.min(pct, 100);
            axisValue = axisValue.toFixed(3)
            displayAxes.push(
                <span
                    style={{
                        padding: '0.5rem',
                        width: '50px',
                        height: '2rem',
                        margin: '0.5rem',
                        backgroundColor: 'black',
                        color: 'white',
                        position: 'relative',
                        display: 'inline-block',
                        textAlign: 'center'
                    }}
                    key={"displayAxes-" + id}>
                    <span
                        style={{
                            width: (pct + '%'),
                            height: '0.4rem',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transition: 'width 0.05s linear',
                            backgroundColor: `rgba(255,255,255,255)`
                        }}
                    >

                    </span>
                    {id}
                </span>
            )

            actionOptions.push(<option key={"optionAxes-" + index} value={index}>Axis {id}</option>)
        }
    }

    return (<>
        <div id="displayAxes" style={{ width: '100%', }}>
            <h3 style={{ color: 'white', padding: '1rem 0' }}>Axes IDs</h3>
            {displayAxes}
        </div>
        <div id="displayButtons" style={{ width: '100%', paddingBottom: '1rem' }}>
            <h3 style={{ color: 'white', padding: '1rem 0' }}>Button IDs</h3>
            {displayButtons}
        </div>
    </>)
}


function RebindInputs(props) {

    let [gamepad] = flatstore.useWatch('gamePad')

    if (!gamepad)
        return <></>

    return (
        <div style={{ paddingBottom: '3rem' }}>


            <ProfileLoader />
            <br />
            <p style={{ color: 'white' }}>
                Press and move your controller inputs to identify the ID needed to map the input to the correct binding.
            </p>

            <PreviewButtons />
            <div style={{ paddingBottom: '1rem' }}>
                <h3 style={{ color: 'white', padding: '1rem 0' }}>Wheel and Pedal Binding</h3>

                <InputBind title="Wheel" id="btnWheel" allowInvert={true} invertId={'valueWheel'} />
                <InputBind title="Gas" id="btnGas" allowInvert={true} invertId={'valueGas'} />
                <InputBind title="Break" id="btnBrake" allowInvert={true} invertId={'valueBrake'} />
                <InputBind title="Clutch" id="btnClutch" allowInvert={true} invertId={'valueClutch'} />

                {/* <InputBind title="Gear 8" id="buttonGear8" options={buttonOptions} /> */}



            </div>
            <div style={{ paddingBottom: '1rem' }}>
                <h3 style={{ color: 'white', padding: '1rem 0' }}>Gear Binding</h3>
                <InputBind title="Gear Reverse" id="btnGearReverse" allowInvert={true} invertId={'valueGearReverse'} />
                <InputBind title="Gear 1" id="btnGear1" allowInvert={true} invertId={'valueGear1'} />
                <InputBind title="Gear 2" id="btnGear2" allowInvert={true} invertId={'valueGear2'} />
                <InputBind title="Gear 3" id="btnGear3" allowInvert={true} invertId={'valueGear3'} />
                <InputBind title="Gear 4" id="btnGear4" allowInvert={true} invertId={'valueGear4'} />
                <InputBind title="Gear 5" id="btnGear5" allowInvert={true} invertId={'valueGear5'} />
                <InputBind title="Gear 6" id="btnGear6" allowInvert={true} invertId={'valueGear6'} />
                <InputBind title="Gear 7" id="btnGear7" allowInvert={true} invertId={'valueGear7'} />
            </div>

            <div style={{ paddingBottom: '1rem' }}>
                <h3 style={{ color: 'white', padding: '1rem 0' }}>Wheel Button Binding</h3>
                <InputBind title="D-Up" id="btnWheel_DUp" />
                <InputBind title="D-Down" id="btnWheel_DDown" />
                <InputBind title="D-Left" id="btnWheel_DLeft" />
                <InputBind title="D-Right" id="btnWheel_DRight" />
                <InputBind title="Back" id="btnWheel_Back" />
                <InputBind title="Start" id="btnWheel_Start" />
                <br />
                <InputBind title="X" id="btnWheel_X" />
                <InputBind title="Y" id="btnWheel_Y" />
                <InputBind title="A" id="btnWheel_A" />
                <InputBind title="B" id="btnWheel_B" />
                <InputBind title="RSB" id="btnWheel_RSB" />
                <InputBind title="LSB" id="btnWheel_LSB" />
                <InputBind title="LB" id="btnWheel_LB" />
                <InputBind title="RB" id="btnWheel_RB" />
                <InputBind title="L3" id="btnWheel_L3" />
                <InputBind title="R3" id="btnWheel_R3" />
                <InputBind title="L4" id="btnWheel_L4" />
                <InputBind title="R4" id="btnWheel_R4" />
                <InputBind title="Plus" id="btnWheel_plus" />
                <InputBind title="Minus" id="btnWheel_minus" />
                <InputBind title="Ps" id="btnWheel_ps" />
                <InputBind title="Option" id="btnWheel_option" />
                <InputBind title="Share" id="btnWheel_share" />
                <InputBind title="Return" id="btnWheel_return" />

            </div>
            <div>
                <h3 style={{ color: 'white', padding: '1rem 0' }}>Change Images</h3>
                <h5 style={{ fontWeight: 'light', color: 'white', padding: '0', paddingBottom: '1rem' }}>Enter an image URL to replace the existing image.  Images will be forced to the pixel ratios below.</h5>
                <ImageBind title="Wheel" id="imgWheel" width="500" height="500" />
                <ImageBind title="Pedal Base" id="imgPedalBase" width="400" height="238" />
                <ImageBind title="Gas Pedal" id="imgGas" width="70" height="121" />
                <ImageBind title="Brake Pedal" id="imgBrake" width="70" height="96" />
                <ImageBind title="Clutch Petal" id="imgClutch" width="70" height="96" />
                <ImageBind title="Shifter Base" id="imgShifterBase" width="250" height="293" />
                <ImageBind title="Shifter Head" id="imgShifter" width="150" height="150" />

                <h3 style={{ color: 'white', padding: '1rem 0' }}>Change Wheel Button Masks</h3>
                <ImageBind title="D-Up" id="imgWheel_DUp" width="500" height="500" />
                <ImageBind title="D-Down" id="imgWheel_DDown" width="500" height="500" />
                <ImageBind title="D-Left" id="imgWheel_DLeft" width="500" height="500" />
                <ImageBind title="D-Right" id="imgWheel_DRight" width="500" height="500" />
                <ImageBind title="Back" id="imgWheel_Back" width="500" height="500" />
                <ImageBind title="Start" id="imgWheel_Start" width="500" height="500" />

                <ImageBind title="X" id="imgWheel_X" width="500" height="500" />
                <ImageBind title="Y" id="imgWheel_Y" width="500" height="500" />
                <ImageBind title="A" id="imgWheel_A" width="500" height="500" />
                <ImageBind title="B" id="imgWheel_B" width="500" height="500" />
                <ImageBind title="RSB" id="imgWheel_RSB" width="500" height="500" />
                <ImageBind title="LSB" id="imgWheel_LSB" width="500" height="500" />
                <ImageBind title="LB" id="imgWheel_LB" width="500" height="500" />
                <ImageBind title="RB" id="imgWheel_RB" width="500" height="500" />
                <ImageBind title="L3" id="imgWheel_L3" width="500" height="500" />
                <ImageBind title="R3" id="imgWheel_R3" width="500" height="500" />
                <ImageBind title="L4" id="imgWheel_L4" width="500" height="500" />
                <ImageBind title="R4" id="imgWheel_R4" width="500" height="500" />
                <ImageBind title="plus" id="imgWheel_plus" width="500" height="500" />
                <ImageBind title="minus" id="imgWheel_minus" width="500" height="500" />
                <ImageBind title="ps" id="imgWheel_ps" width="500" height="500" />
                <ImageBind title="option" id="imgWheel_option" width="500" height="500" />
                <ImageBind title="share" id="imgWheel_share" width="500" height="500" />
                


                {/* <button
                    className="resetButton"
                    onClick={() => {
                        loadDefaultProfile();
                    }}>Reset to Default</button> */}
            </div>
        </div >
    )

}
/*

*/

function ImageBind({ id, title, width, height }) {

    let [value] = flatstore.useChange(id);
    return (
        <div style={{ display: 'block', paddingLeft: '1rem', paddingBottom: '0.5rem' }}>

            <label style={{ fontWeight: 'light', color: 'white', paddingRight: '0.5rem', width: '150px', height: '2rem', display: 'inline-block' }}>
                {title}
            </label>
            <input
                name={id}
                type="text"
                value={value}
                onChange={(e) => {
                    flatstore.set(id, e.target.value);
                    localStorage.setItem(id, e.target.value);

                    flatstore.set('updatedSettings', Date.now());
                }}
                style={{ height: '2rem', width: '400px' }}
            />
            <span style={{ paddingLeft: '10px', color: 'white', fontSize: '12px',filter: 'hue-rotate(180deg)' }}>{width || 0}x{height || 0} pixels</span>
        </div>
    )
}

function InputBind({ invertId, id, title, allowInvert, options }) {

    let actionStates = flatstore.get('actionStates');

    invertId = invertId || '';

    let [defaultValue] = flatstore.useChange(id);
    let [defaultChecked] = flatstore.useChange('invert/' + id);
    // let defaultValue = localStorage.getItem(id) || flatstore.get(id);
    // let defaultChecked = localStorage.getItem('invert/' + id) || flatstore.get('invert/' + id);

    // defaultValue = Number.parseInt(defaultValue);
    defaultChecked = (defaultChecked == 'false' || !defaultChecked) ? false : true;

    return (
        <div style={{ display: 'inline-block', paddingLeft: '1rem' }}>
            <label style={{ fontWeight: 'bold', color: '#eee', paddingRight: '0.5rem', height: '2rem', display: 'inline-block' }}>
                {title}
            </label>
            <select
                style={{ height: '2rem', width: '100px', color: 'white', backgroundColor: "rgb(34, 34, 34)", borderColor: "rgb(34, 34, 34)" }}
                name={id}
                // defaultValue={defaultValue}
                value={defaultValue}
                onChange={(e) => {
                    flatstore.set(id, Number.parseInt(e.target.value))
                    // localStorage.setItem(id, e.target.value);
                    flatstore.set('updatedSettings', Date.now());
                }}
            >
                {actionStates.map(action => <option key={"option-" + action.index} value={action.index}>{action.type} {action.id}</option>)}
            </select>
            <br />
            {allowInvert && (
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.4rem' }}>
                    <span style={{ color: 'white', fontSize: '0.65rem', }}>Invert?</span>
                    <label className="switch">
                        <input type="checkbox" defaultChecked={defaultChecked} onChange={(e) => {
                            flatstore.set('invert/' + id, e.target.checked);
                            // localStorage.setItem('invert/' + id, e.target.checked);

                            flatstore.set('updatedSettings', Date.now());
                        }} />
                        <span className="slider round"></span>
                    </label>
                </div>

            )}
        </div>
    )
}

export default RebindInputs;