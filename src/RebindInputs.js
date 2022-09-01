import React from 'react';
import flatstore from 'flatstore';

function RebindInputs(props) {

    let [gamepad] = flatstore.useWatch('gamePad')
    let [axes] = flatstore.useWatch('axes');
    let [buttons] = flatstore.useWatch('buttons');

    let axisOptions = [];
    let buttonOptions = [];
    let displayAxes = [];
    let displayButtons = [];

    if (!gamepad || !axes || !buttons)
        return <></>

    for (let id = 0; id < axes.length; id++) {
        let axisValue = Number.parseFloat(axes[id]);
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
                        backgroundColor: 'white'
                    }}
                >

                </span>
                {id}
            </span>
        )
        axisOptions.push(<option key={"optionAxes-" + id} value={id}>{id}</option>)
    }

    for (let id = 0; id < gamepad.buttons.length; id++) {
        let btn = buttons[id];
        displayButtons.push(
            <span
                key={"displayButtons-" + id}
                style={{
                    display: 'inline-block',
                    textAlign: 'center',
                    borderRadius: '50%',
                    width: '2.5rem',
                    height: '2.5rem',
                    padding: '0.5rem',
                    margin: '0.2rem',
                    color: (!btn?.pressed ? 'white' : 'black'),
                    backgroundColor: (!btn?.pressed ? '#222' : 'white')
                }}>
                {id}
            </span>
        )
        buttonOptions.push(<option key={"optionButtons-" + id} value={id}>{id}</option>)
    }

    const updateImage = (key, value) => {
        flatstore.set(key, value);
        localStorage.setItem(key, value);
    }

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <p style={{ color: 'white' }}>
                Press and move your controller inputs to identify the ID needed to map the input to the correct binding.
            </p>
            <div id="displayAxes" style={{ width: '100%', }}>
                <h3 style={{ color: 'white', padding: '1rem 0' }}>Axes IDs</h3>
                {displayAxes}
            </div>
            <div id="displayButtons" style={{ width: '100%', paddingBottom: '1rem' }}>
                <h3 style={{ color: 'white', padding: '1rem 0' }}>Button IDs</h3>
                {displayButtons}
            </div>

            <div style={{ paddingBottom: '1rem' }}>
                <h3 style={{ color: 'white', padding: '1rem 0' }}>Input Binding</h3>

                <InputBind title="Wheel" id="axisWheel" options={axisOptions} />
                <InputBind title="Gas" id="axisGas" options={axisOptions} />
                <InputBind title="Break" id="axisBrake" options={axisOptions} />
                <InputBind title="Clutch" id="axisClutch" options={axisOptions} />
                <InputBind title="Gear Reverse" id="buttonGearReverse" options={buttonOptions} />
                <InputBind title="Gear 1" id="buttonGear1" options={buttonOptions} />
                <InputBind title="Gear 2" id="buttonGear2" options={buttonOptions} />
                <InputBind title="Gear 3" id="buttonGear3" options={buttonOptions} />
                <InputBind title="Gear 4" id="buttonGear4" options={buttonOptions} />
                <InputBind title="Gear 5" id="buttonGear5" options={buttonOptions} />
                <InputBind title="Gear 6" id="buttonGear6" options={buttonOptions} />
                <InputBind title="Gear 7" id="buttonGear7" options={buttonOptions} />
                {/* <InputBind title="Gear 8" id="buttonGear8" options={buttonOptions} /> */}



            </div>
            <div>
                <h3 style={{ color: 'white', padding: '1rem 0' }}>Change Images</h3>
                <h5 style={{ fontWeight: 'light', color: 'white', padding: '0', paddingBottom: '1rem' }}>Enter an image URL to replace the existing image</h5>
                <ImageBind title="Wheel" id="imgWheel" />
                <ImageBind title="Pedal Base" id="imgPedalBase" />
                <ImageBind title="Gas Pedal" id="imgGas" />
                <ImageBind title="Brake Pedal" id="imgBrake" />
                <ImageBind title="Clutch Petal" id="imgClutch" />
                <ImageBind title="Shifter Base" id="imgShifterBase" />
                <ImageBind title="Shifter Head" id="imgShifter" />

                <button
                    className="resetButton"
                    onClick={() => {
                        updateImage('imgWheel', "/stream-racing-wheel/g920/wheel.png");
                        updateImage('imgPedalBase', '/stream-racing-wheel/g920/pedals.png');
                        updateImage('imgGas', '/stream-racing-wheel/g920/gas.png');
                        updateImage('imgBrake', '/stream-racing-wheel/g920/brake.png');
                        updateImage('imgClutch', '/stream-racing-wheel/g920/clutch.png');
                        updateImage('imgShifterBase', '/stream-racing-wheel/g920/shifter-base.png');
                        updateImage('imgShifter', '/stream-racing-wheel/g920/shifter.png');
                    }}>Reset to Default</button>
            </div>
        </div>
    )

}

function ImageBind(props) {

    return (
        <div style={{ display: 'block', paddingLeft: '1rem', paddingBottom: '0.5rem' }}>

            <label style={{ fontWeight: 'light', color: 'white', paddingRight: '0.5rem', width: '150px', height: '2rem', display: 'inline-block' }}>
                {props.title}
            </label>
            <input
                name={props.id}
                type="text"
                value={flatstore.get(props.id)}
                onChange={(e) => {
                    flatstore.set(props.id, e.target.value);
                }}
                style={{ height: '2rem', width: '400px' }}
            />
        </div>
    )
}

function InputBind(props) {

    return (
        <div style={{ display: 'inline-block', paddingLeft: '1rem' }}>
            <label style={{ fontWeight: 'light', color: 'white', paddingRight: '0.5rem', height: '2rem', display: 'inline-block' }}>
                {props.title}
            </label>
            <select
                style={{ height: '2rem', width: '50px' }}
                name={props.id}
                defaultValue={flatstore.get(props.id)}
                onChange={(e) => {
                    flatstore.set(props.id, Number.parseInt(e.target.value))
                    localStorage.setItem(props.id, e.target.value);
                }}
            >
                {props.options}
            </select>

        </div>
    )
}

export default RebindInputs;