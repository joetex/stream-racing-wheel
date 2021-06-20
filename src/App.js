import React, { Component } from 'react';
import './index.css';

import Wheel from './g920/wheel';
import Pedals from './g920/pedals';
import ShifterBase from './g920/shifterbase';

import flatstore from 'flatstore';

let defaultButtons = [];
let defaultAxes = [];
for (let i = 0; i < 20; i++) {
  defaultButtons.push({ pressed: false, touched: false, value: 0 })
  defaultAxes.push(0);
}

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
    this.gamePadIndex = id;
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
    var options = Object.values(this.gamePads).map(gp => {

      let isSelected = gp.index === this.gamePadIndex;
      return (<option selected={isSelected} value={gp.index}>{gp.id}</option>)

    }
    );

    return (
      <div style={{ width: '600px', height: '100%', position: 'absolute', top: '0px', left: '0px' }}>
        <label style={{ color: 'white' }}>Driving System</label><select name="gamepadSelection" onChange={(e) => { this.onChange(e) }}>
          {options}
        </select>
        <br />
        <label style={{ color: 'white' }}>Max Rotation</label><input name="wheelRotation" type="number" value={this.state.rotation} onChange={(e) => { this.onWheelRotationChange(e) }} />
        <br />
        <div style={{ position: 'relative', top: '20px', }}>
          <Wheel axis={0} rotation={this.state.rotation} />
        </div>
        <div style={{ position: 'relative', top: '-300px', left: "500px", 'marginLeft': '50px' }}>
          <ShifterBase />
        </div>
        <div style={{ position: 'relative', top: '-170px', left: "30px", 'marginLeft': '50px' }}>
          <Pedals />
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

    flatstore.set("buttons", buttonStates);
    flatstore.set("axes", axesStates);

    this.start = requestAnimationFrame(this.gameLoop);
  }
}

export default App;
