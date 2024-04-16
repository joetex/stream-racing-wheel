import React, { Component } from 'react';
import './index.css';

import Wheel from './g920/wheel';
import Pedals from './g920/pedals';
import ShifterBase from './g920/shifterbase';

import RebindInputs from './RebindInputs';

import { defaultProfiles, loadDefaultProfile, loadProfile } from './KeybindProfiles';

import flatstore from 'flatstore';

let defaultButtons = [];
let defaultAxes = [];
for (let i = 0; i < 20; i++) {
  defaultButtons.push({ pressed: false, touched: false, value: 0 })
  defaultAxes.push(0);
}

loadDefaultProfile();

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


flatstore.set('valueWheel_DUp', 0);
flatstore.set('valueWheel_DDown', 0);
flatstore.set('valueWheel_DLeft', 0);
flatstore.set('valueWheel_DRight', 0);
flatstore.set('valueWheel_Back', 0);
flatstore.set('valueWheel_Start', 0);
flatstore.set('valueWheel_X', 0);
flatstore.set('valueWheel_Y', 0);
flatstore.set('valueWheel_A', 0);
flatstore.set('valueWheel_B', 0);
flatstore.set('valueWheel_RSB', 0);
flatstore.set('valueWheel_LSB', 0);
flatstore.set('valueWheel_LB', 0);
flatstore.set('valueWheel_RB', 0);
flatstore.set('valueWheel_L3', 0);
flatstore.set('valueWheel_R3', 0);
flatstore.set('valueWheel_L4', 0);
flatstore.set('valueWheel_R4', 0);
flatstore.set('valueWheel_plus', 0);
flatstore.set('valueWheel_minus', 0);
flatstore.set('valueWheel_ps', 0);
flatstore.set('valueWheel_option', 0);
flatstore.set('valueWheel_share', 0);
flatstore.set('valueWheel_return', 0);
// flatstore.set('valueGear8', 0);

flatstore.set('actionStates', []);
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
      rotation: 900,
      wheelButtonsEnabled: 1
    }

    flatstore.set('wheelButtonsEnabled', 1);

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

        <h1 style={{ color: 'white' }}>Stream Racing Wheel - G923</h1>
        <a style={{ color: 'white' }} href="https://github.com/joetex/stream-racing-wheel">Remake by Quicko for the g923</a>
        <br />
        <br />
        <a style={{ color: 'white' }} href="https://github.com/joetex/stream-racing-wheel">Original on GitHub make by Joetex</a>
        <br />
        <br />
        <GamepadSelection onChange={(e) => { this.onChange(e) }} />
        <br />
        <label style={{ color: 'white', display: 'inline-block', paddingRight: '1rem', fontWeight: 'bold' }}>
          Max Rotation
        </label>
        <input name="wheelRotation"
          type="number"
          value={this.state.rotation}
          onChange={(e) => {
            this.onWheelRotationChange(e)
          }} />
        <br />
        <label style={{ color: 'white', display: 'inline-block', paddingTop: '0.5rem', paddingRight: '1rem', fontWeight: 'bold' }}>
          Show Wheel Button Presses
        </label>
        <select name="wheelButtonsEnabled"
          type="number"
          value={this.state.wheelButtonsEnabled}
          onChange={(e) => {
            // this.onWheelRotationChange(e)

            let wheelButtonsEnabled = Number.parseInt(e.target.value);
            flatstore.set('wheelButtonsEnabled', wheelButtonsEnabled);
            this.setState({ wheelButtonsEnabled })

          }}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <br />
        <br />
        <span style={{ color: 'white' }}><strong>Scroll down</strong> to re-bind inputs and change images</span>
        <br />
        <br />
        <br />
        <br />
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

    let actionStates = [];

    let buttonStates = [];
    let index = 0;

    let axesStates = [];
    for (let i = 0; i < gp.axes.length; i++) {
      let axis = gp.axes[i];
      axesStates.push(axis);

      let axisState = {
        type: 'Axis',
        id: i,
        index: index++,
        pressed: Math.abs(axis) > 0.05,
        touched: Math.abs(axis) > 0.05,
        value: axis
      }
      actionStates.push(axisState);

    }

    for (let i = 0; i < gp.buttons.length; i++) {
      let button = gp.buttons[i];
      let buttonState = {
        type: 'Button',
        id: i,
        index: index++,
        pressed: button.pressed,
        touched: button.touched,
        value: button.value
      }
      buttonStates.push(buttonState);

      actionStates.push(buttonState);
    }



    let btnWheel = flatstore.get('btnWheel');
    let btnGas = flatstore.get('btnGas');
    let btnBrake = flatstore.get('btnBrake');
    let btnClutch = flatstore.get('btnClutch');

    let btnGearReverse = flatstore.get('btnGearReverse');
    let btnGear1 = flatstore.get('btnGear1');
    let btnGear2 = flatstore.get('btnGear2');
    let btnGear3 = flatstore.get('btnGear3');
    let btnGear4 = flatstore.get('btnGear4');
    let btnGear5 = flatstore.get('btnGear5');
    let btnGear6 = flatstore.get('btnGear6');
    let btnGear7 = flatstore.get('btnGear7');

    let btnWheel_DUp = flatstore.get('btnWheel_DUp');
    let btnWheel_DDown = flatstore.get('btnWheel_DDown');
    let btnWheel_DLeft = flatstore.get('btnWheel_DLeft');
    let btnWheel_DRight = flatstore.get('btnWheel_DRight');
    let btnWheel_Back = flatstore.get('btnWheel_Back');
    let btnWheel_Start = flatstore.get('btnWheel_Start');
    let btnWheel_X = flatstore.get('btnWheel_X');
    let btnWheel_Y = flatstore.get('btnWheel_Y');
    let btnWheel_A = flatstore.get('btnWheel_A');
    let btnWheel_B = flatstore.get('btnWheel_B');
    let btnWheel_RSB = flatstore.get('btnWheel_RSB');
    let btnWheel_LSB = flatstore.get('btnWheel_LSB');
    let btnWheel_LB = flatstore.get('btnWheel_LB');
    let btnWheel_RB = flatstore.get('btnWheel_RB');
    let btnWheel_L3 = flatstore.get('btnWheel_L3');
    let btnWheel_R3 = flatstore.get('btnWheel_R3');
    let btnWheel_L4 = flatstore.get('btnWheel_L4');
    let btnWheel_R4 = flatstore.get('btnWheel_R4');
    let btnWheel_plus = flatstore.get('btnWheel_plus');
    let btnWheel_minus = flatstore.get('btnWheel_minus');
    let btnWheel_ps = flatstore.get('btnWheel_ps');
    let btnWheel_option = flatstore.get('btnWheel_option');
    let btnWheel_share = flatstore.get('btnWheel_share');
    let btnWheel_return = flatstore.get('btnWheel_return');

    // let buttonGear8 = flatstore.get('buttonGear8');

    if (btnWheel != null)
      flatstore.set('valueWheel', actionStates[btnWheel]);

    if (btnGas != null)
      flatstore.set('valueGas', actionStates[btnGas]);

    if (btnBrake != null)
      flatstore.set('valueBrake', actionStates[btnBrake]);

    if (btnClutch != null)
      flatstore.set('valueClutch', actionStates[btnClutch]);

    if (btnGearReverse != null)
      flatstore.set('valueGearReverse', actionStates[btnGearReverse]);
    if (btnGear1 != null)
      flatstore.set('valueGear1', actionStates[btnGear1]);
    if (btnGear2 != null)
      flatstore.set('valueGear2', actionStates[btnGear2]);
    if (btnGear3 != null)
      flatstore.set('valueGear3', actionStates[btnGear3]);
    if (btnGear4 != null)
      flatstore.set('valueGear4', actionStates[btnGear4]);
    if (btnGear5 != null)
      flatstore.set('valueGear5', actionStates[btnGear5]);
    if (btnGear6 != null)
      flatstore.set('valueGear6', actionStates[btnGear6]);
    if (btnGear7 != null)
      flatstore.set('valueGear7', actionStates[btnGear7]);



    if (btnWheel_DUp != null)
      flatstore.set('valueWheel_DUp', actionStates[btnWheel_DUp]);
    if (btnWheel_DDown != null)
      flatstore.set('valueWheel_DDown', actionStates[btnWheel_DDown]);
    if (btnWheel_DLeft != null)
      flatstore.set('valueWheel_DLeft', actionStates[btnWheel_DLeft]);
    if (btnWheel_DRight != null)
      flatstore.set('valueWheel_DRight', actionStates[btnWheel_DRight]);
    if (btnWheel_Back != null)
      flatstore.set('valueWheel_Back', actionStates[btnWheel_Back]);
    if (btnWheel_Start != null)
      flatstore.set('valueWheel_Start', actionStates[btnWheel_Start]);
    if (btnWheel_X != null)
      flatstore.set('valueWheel_X', actionStates[btnWheel_X]);
    if (btnWheel_Y != null)
      flatstore.set('valueWheel_Y', actionStates[btnWheel_Y]);
    if (btnWheel_A != null)
      flatstore.set('valueWheel_A', actionStates[btnWheel_A]);
    if (btnWheel_B != null)
      flatstore.set('valueWheel_B', actionStates[btnWheel_B]);
    if (btnWheel_RSB != null)
      flatstore.set('valueWheel_RSB', actionStates[btnWheel_RSB]);
    if (btnWheel_LSB != null)
      flatstore.set('valueWheel_LSB', actionStates[btnWheel_LSB]);
    if (btnWheel_LB != null)
      flatstore.set('valueWheel_LB', actionStates[btnWheel_LB]);
    if (btnWheel_RB != null)
      flatstore.set('valueWheel_RB', actionStates[btnWheel_RB]);
    if (btnWheel_L3 != null)
      flatstore.set('valueWheel_L3', actionStates[btnWheel_L3]);
    if (btnWheel_R3 != null)
      flatstore.set('valueWheel_R3', actionStates[btnWheel_R3]);
    if (btnWheel_L4 != null)
      flatstore.set('valueWheel_L4', actionStates[btnWheel_L4]);
    if (btnWheel_R4 != null)
      flatstore.set('valueWheel_R4', actionStates[btnWheel_R4]);
    if (btnWheel_plus != null)
      flatstore.set('valueWheel_plus', actionStates[btnWheel_plus]);
    if (btnWheel_minus != null)
      flatstore.set('valueWheel_minus', actionStates[btnWheel_minus]);
    if (btnWheel_ps != null)
      flatstore.set('valueWheel_ps', actionStates[btnWheel_ps]);
    if (btnWheel_option != null)
      flatstore.set('valueWheel_option', actionStates[btnWheel_option]);
    if (btnWheel_share != null)
      flatstore.set('valueWheel_share', actionStates[btnWheel_share]);
    if (btnWheel_return != null)
      flatstore.set('valueWheel_return', actionStates[btnWheel_return]);

    // if (buttonGear8 != null)
    //   flatstore.set('valueGear8', buttonStates[buttonGear8].pressed);

    flatstore.set('actionStates', actionStates);
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
