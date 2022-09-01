import React, { Component } from 'react';
import './index.css';

import Wheel from './g920/wheel';
import Pedals from './g920/pedals';
import ShifterBase from './g920/shifterbase';

import RebindInputs from './RebindInputs';


import flatstore from 'flatstore';

let defaultButtons = [];
let defaultAxes = [];
for (let i = 0; i < 20; i++) {
  defaultButtons.push({ pressed: false, touched: false, value: 0 })
  defaultAxes.push(0);
}


function getSaved(key) {
  let value = localStorage.getItem(key);
  if (value !== null && typeof value !== 'undefined' && (key.indexOf("axis") === 0 || key.indexOf("button") === 0)) {
    value = Number.parseInt(value);
  }
  return value;
}

function loadSaved(key, defaultValue) {
  let saved = getSaved(key);

  if (saved == null || typeof saved === 'undefined') {
    flatstore.set(key, defaultValue);
    localStorage.setItem(key, defaultValue);
  }
  else {
    flatstore.set(key, saved);
  }
}

loadSaved('axisWheel', 0);
loadSaved('axisGas', 1);
loadSaved('axisBrake', 2);
loadSaved('axisClutch', 5);
loadSaved('buttonGearReverse', 11);
loadSaved('buttonGear1', 12);
loadSaved('buttonGear2', 13);
loadSaved('buttonGear3', 14);
loadSaved('buttonGear4', 15);
loadSaved('buttonGear5', 16);
loadSaved('buttonGear6', 17);
loadSaved('buttonGear7', 11);
// loadSaved('buttonGear8', 1);

loadSaved('imgWheel', "/stream-racing-wheel/g920/wheel.png");
loadSaved('imgPedalBase', '/stream-racing-wheel/g920/pedals.png');
loadSaved('imgGas', '/stream-racing-wheel/g920/gas.png');
loadSaved('imgBrake', '/stream-racing-wheel/g920/brake.png');
loadSaved('imgClutch', '/stream-racing-wheel/g920/clutch.png');
loadSaved('imgShifterBase', '/stream-racing-wheel/g920/shifter-base.png');
loadSaved('imgShifter', '/stream-racing-wheel/g920/shifter.png');

flatstore.set('valueWheel', 0);
flatstore.set('valueBrake', 0);
flatstore.set('valueGas', 0);
flatstore.set('valueCluch', 0);
flatstore.set('valueGearReverse', 0);
flatstore.set('valueGear1', 0);
flatstore.set('valueGear2', 0);
flatstore.set('valueGear3', 0);
flatstore.set('valueGear4', 0);
flatstore.set('valueGear5', 0);
flatstore.set('valueGear6', 0);
flatstore.set('valueGear7', 0);
// flatstore.set('valueGear8', 0);


flatstore.set("buttons", defaultButtons);
flatstore.set("axes", defaultAxes);
class App extends Component {
  constructor(props) {
    super(props)

    this.gamePads = {};

    this.start = 0;
    this.a = 0;
    this.b = 0;

    this.gamePadIndex = -1;

    this.state = {
      gameLoopStarted: false,
      rotation: 900
    }

    this.gameLoop = this.gameLoop.bind(this);
    this.onGamepadConnected = this.onGamepadConnected.bind(this);
    window.addEventListener("gamepadconnected", this.onGamepadConnected);
  }

  onGamepadConnected(e) {
    var gp = navigator.getGamepads()[e.gamepad.index];
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      gp.index, gp.id, gp.buttons.length, gp.axes.length
    );

    let currentGamePad = flatstore.get('gamePad');
    if (!currentGamePad) {
      this.changeGamepad(gp.index);
    }

    this.gamePads[gp.index] = gp;
    this.setState({ gamePads: this.gamePads })
    if (gp.id.toLowerCase().indexOf("wheel") > -1) {
      this.changeGamepad(gp.index);
    }
  }

  onChange(e) {
    this.changeGamepad(e.target.value);

  }

  changeGamepad(id) {
    console.log(id);
    var gp = navigator.getGamepads()[id];
    this.gamePadIndex = id;
    flatstore.set('gamePad', gp)
    this.setState({ gamepadIndex: id, gameLoopStarted: true })
    this.gameLoop();
  }

  onWheelRotationChange(e) {
    let rotation = e.target.value;
    flatstore.set('maxrotation', rotation);
    this.setState({ rotation })
  }

  render() {
    //let gamepads = navigator.getGamepads();
    //console.log(gamepads)


    return (
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px', paddingTop: '1rem', paddingLeft: '2rem' }}>
        <h1 style={{ color: 'white' }}>Stream Racing Wheel</h1>
        <a style={{ color: 'white' }} href="https://github.com/joetex/stream-racing-wheel">View on GitHub</a>
        <br />
        <br />
        <GamepadSelection onChange={(e) => { this.onChange(e) }} />
        <br />
        <label style={{ color: 'white', display: 'inline-block', paddingRight: '1rem', fontWeight: 'bold' }}>Max Rotation</label><input name="wheelRotation" type="number" value={this.state.rotation} onChange={(e) => { this.onWheelRotationChange(e) }} />
        <br />
        <br />
        <span style={{ color: 'white' }}><strong>Scroll down</strong> to re-bind inputs and change images</span>
        <br />
        <br />
        <br />
        <br />
        <div style={{ width: '600px', }}>


          <div style={{ position: 'relative', top: '20px', }}>
            <Wheel rotation={this.state.rotation} />
          </div>
          <div style={{ position: 'relative', top: '-300px', left: "500px", 'marginLeft': '50px' }}>
            <ShifterBase />
          </div>
          <div style={{ position: 'relative', top: '-170px', left: "30px", 'marginLeft': '50px' }}>
            <Pedals />
          </div>
        </div>
        <div style={{ paddingTop: '5rem' }}>
          <RebindInputs />
        </div>

      </div>

    )
  }

  buttonPressed(b) {
    if (typeof (b) == "object") {
      return b.pressed;
    }
    return b === 1.0;
  }

  gameLoop() {
    if (this.gamePadIndex === -1)
      return;

    //var gp = this.gamePads[this.gamePadIndex];
    var gp = navigator.getGamepads()[this.gamePadIndex];
    let buttonStates = [];
    for (let i = 0; i < gp.buttons.length; i++) {
      let button = gp.buttons[i];
      let buttonState = {
        pressed: button.pressed,
        touched: button.touched,
        value: button.value
      }
      buttonStates.push(buttonState);
    }

    let axesStates = [];
    for (let i = 0; i < gp.axes.length; i++) {
      let axis = gp.axes[i];
      axesStates.push(axis);
    }

    let axisWheel = flatstore.get('axisWheel');
    let axisGas = flatstore.get('axisGas');
    let axisBrake = flatstore.get('axisBrake');
    let axisClutch = flatstore.get('axisClutch');

    let buttonGearReverse = flatstore.get('buttonGearReverse');
    let buttonGear1 = flatstore.get('buttonGear1');
    let buttonGear2 = flatstore.get('buttonGear2');
    let buttonGear3 = flatstore.get('buttonGear3');
    let buttonGear4 = flatstore.get('buttonGear4');
    let buttonGear5 = flatstore.get('buttonGear5');
    let buttonGear6 = flatstore.get('buttonGear6');
    let buttonGear7 = flatstore.get('buttonGear7');
    // let buttonGear8 = flatstore.get('buttonGear8');

    if (axisWheel != null)
      flatstore.set('valueWheel', axesStates[axisWheel]);

    if (axisGas != null)
      flatstore.set('valueGas', axesStates[axisGas]);

    if (axisBrake != null)
      flatstore.set('valueBrake', axesStates[axisBrake]);

    if (axisClutch != null)
      flatstore.set('valueClutch', axesStates[axisClutch]);

    if (buttonGearReverse != null)
      flatstore.set('valueGearReverse', buttonStates[buttonGearReverse]?.pressed);
    if (buttonGear1 != null)
      flatstore.set('valueGear1', buttonStates[buttonGear1]?.pressed);
    if (buttonGear2 != null)
      flatstore.set('valueGear2', buttonStates[buttonGear2]?.pressed);
    if (buttonGear3 != null)
      flatstore.set('valueGear3', buttonStates[buttonGear3]?.pressed);
    if (buttonGear4 != null)
      flatstore.set('valueGear4', buttonStates[buttonGear4]?.pressed);
    if (buttonGear5 != null)
      flatstore.set('valueGear5', buttonStates[buttonGear5]?.pressed);
    if (buttonGear6 != null)
      flatstore.set('valueGear6', buttonStates[buttonGear6]?.pressed);
    if (buttonGear7 != null)
      flatstore.set('valueGear7', buttonStates[buttonGear7]?.pressed);
    // if (buttonGear8 != null)
    //   flatstore.set('valueGear8', buttonStates[buttonGear8].pressed);

    flatstore.set("buttons", buttonStates);
    flatstore.set("axes", axesStates);

    this.start = requestAnimationFrame(this.gameLoop);
  }
}

function GamepadSelection(props) {

  let [gamePadIndex] = flatstore.useWatch('gamePadIndex');

  const changeGamepad = (id) => {
    console.log(id);
    var gp = navigator.getGamepads()[id];

    flatstore.set('gamePadIndex', id);

    // gamePadIndex = id;
    flatstore.set('gamePad', gp)
    // this.setState({ gamepadIndex: id, gameLoopStarted: true })
    this.gameLoop();
  }

  const onChange = (e) => {
    changeGamepad(e.target.value);
  }

  let gamePads = navigator.getGamepads();

  var options = Object.values(gamePads).map(gp => {
    if (!gp)
      return null;
    // let isSelected = gp.index === this.gamePadIndex;
    return (<option
      key={'optionsGamepad' + gp.id}
      //selected={isSelected} 
      value={gp.index}>
      {gp.id}
    </option>)

  }
  );


  return (
    <div>
      <label style={{ color: 'white', display: 'inline-block', paddingRight: '1rem', fontWeight: 'bold' }}>Controller Gamepad</label>
      <select name="gamepadSelection" defaultValue={gamePadIndex} onChange={(e) => { onChange(e); props.onChange(e); }}>
        {options}
      </select>
    </div>
  )
}

export default App;
