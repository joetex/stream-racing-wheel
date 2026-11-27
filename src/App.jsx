import React, { Component } from 'react';
import './index.css';

import Wheel from './g920/wheel';
import Pedals from './g920/pedals';
import ShifterBase from './g920/shifterbase';

import RebindInputs from './RebindInputs';
import PresetSelector from './PresetSelector';

import { loadDefaultProfile, loadProfile } from './KeybindProfiles';
import { MOZA_WHEELS } from './MozaCatalog';

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

    const params = new URLSearchParams(window.location.search);
    const paramProfile = params.get('profile');
    if (paramProfile) {
      loadProfile(paramProfile);
    }
    const paramWheel = params.get('wheel');
    if (paramWheel) {
      const foundWheel = MOZA_WHEELS.find((w) => w.id === paramWheel);
      if (foundWheel) {
        flatstore.set('imgWheel', foundWheel.image);
        flatstore.set('wheelButtonsEnabled', 0);
      }
    }
    const paramRotation = params.get('rotation');
    const initialRotation = paramRotation ? Number.parseInt(paramRotation, 10) || 900 : 900;
    if (paramRotation) {
      flatstore.set('maxrotation', initialRotation);
    }
    const paramButtons = params.get('buttons');
    if (paramButtons !== null) {
      flatstore.set('wheelButtonsEnabled', paramButtons === '1' ? 1 : 0);
    }

    const isUrlObs = params.get('obs') === '1';
    if (isUrlObs) {
      document.documentElement.style.backgroundColor = 'transparent';
      document.body.style.backgroundColor = 'transparent';
    }

    this.state = {
      gameLoopStarted: false,
      rotation: initialRotation,
      wheelButtonsEnabled: flatstore.get('wheelButtonsEnabled') ?? 1,
      showPedals: params.get('pedals') !== '0',
      showShifter: params.get('shifter') !== '0',
      obsMode: isUrlObs
    }

    flatstore.subscribe('wheelButtonsEnabled', (val) => {
      this.setState({ wheelButtonsEnabled: val });
    });

    this.gameLoop = this.gameLoop.bind(this);
    this.onGamepadConnected = this.onGamepadConnected.bind(this);
    this.onGamepadDisconnected = this.onGamepadDisconnected.bind(this);
  }

  componentDidMount() {
    window.addEventListener("gamepadconnected", this.onGamepadConnected);
    window.addEventListener("gamepaddisconnected", this.onGamepadDisconnected);

    // Pick up any gamepads the browser already exposed before we mounted.
    for (const gp of navigator.getGamepads()) {
      if (gp) this.onGamepadConnected({ gamepad: gp });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("gamepadconnected", this.onGamepadConnected);
    window.removeEventListener("gamepaddisconnected", this.onGamepadDisconnected);
    cancelAnimationFrame(this.start);
  }

  onGamepadConnected(e) {
    var gp = navigator.getGamepads()[e.gamepad.index];
    if (!gp) return;
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      gp.index, gp.id, gp.buttons.length, gp.axes.length
    );

    this.gamePads[gp.index] = gp;
    this.setState({ gamePads: { ...this.gamePads } });

    if (this.gamePadIndex === -1 || gp.id.toLowerCase().indexOf("wheel") > -1) {
      this.changeGamepad(gp.index);
    }
  }

  onGamepadDisconnected(e) {
    delete this.gamePads[e.gamepad.index];
    this.setState({ gamePads: { ...this.gamePads } });
  }

  onChange(e) {
    this.changeGamepad(e.target.value);
  }

  changeGamepad(id) {
    id = Number.parseInt(id, 10);
    var gp = navigator.getGamepads()[id];
    this.gamePadIndex = id;
    flatstore.set('gamePadIndex', id);
    flatstore.set('gamePad', gp)
    this.setState({ gamepadIndex: id, gameLoopStarted: true })
    cancelAnimationFrame(this.start);
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
      <div className={`app-shell ${this.state.obsMode ? 'obs-mode' : 'app-layout'}`}>
        {!this.state.obsMode && (
          <aside className="sidebar">
            <div className="app-header">
              <h1>Stream Racing Wheel</h1>
              <a href="https://github.com/joetex/stream-racing-wheel">GitHub</a>
            </div>

            <PresetSelector
              rotation={this.state.rotation}
              wheelButtonsEnabled={this.state.wheelButtonsEnabled}
              showPedals={this.state.showPedals}
              setShowPedals={(showPedals) => this.setState({ showPedals })}
              showShifter={this.state.showShifter}
              setShowShifter={(showShifter) => this.setState({ showShifter })}
            />

            <div className="sidebar-card">
              <div className="sidebar-field">
                <GamepadSelection onChange={(e) => { this.onChange(e) }} />
              </div>
              <div className="sidebar-row-2">
                <div className="sidebar-field">
                  <label className="control-label">Max Rotation</label>
                  <input name="wheelRotation"
                    type="number"
                    className="control-input-num"
                    value={this.state.rotation}
                    onChange={(e) => {
                      this.onWheelRotationChange(e)
                    }} />
                </div>
                <div className="sidebar-field">
                  <label className="control-label">Button Masks</label>
                  <select name="wheelButtonsEnabled"
                    type="number"
                    value={this.state.wheelButtonsEnabled}
                    onChange={(e) => {
                      let wheelButtonsEnabled = Number.parseInt(e.target.value, 10);
                      flatstore.set('wheelButtonsEnabled', wheelButtonsEnabled);
                      this.setState({ wheelButtonsEnabled })
                    }}>
                    <option value="0">Off</option>
                    <option value="1">On</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>
        )}

        <main className="main-stage">
          <div className="stage-wrapper">
            <div className="stage-top-row">
              <div className="stage-wheel">
                <Wheel rotation={this.state.rotation} />
              </div>
              {this.state.showShifter && (
                <div className="stage-shifter">
                  <ShifterBase />
                </div>
              )}
            </div>
            {this.state.showPedals && (
              <div className="stage-pedals-row">
                <Pedals />
              </div>
            )}
          </div>

          {!this.state.obsMode && (
            <div className="rebind-section">
              <RebindInputs />
            </div>
          )}
        </main>
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
    if (!gp) {
      // Selected device is gone (disconnected); keep polling in case it returns.
      this.start = requestAnimationFrame(this.gameLoop);
      return;
    }

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



    // A binding may point past this controller's inputs (e.g. a profile made for
    // a different device); report it as idle instead of undefined.
    const inputAt = (i) => actionStates[i] || { value: 0, pressed: false, touched: false };

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

    // let buttonGear8 = flatstore.get('buttonGear8');

    if (btnWheel != null)
      flatstore.set('valueWheel', inputAt(btnWheel));

    if (btnGas != null)
      flatstore.set('valueGas', inputAt(btnGas));

    if (btnBrake != null)
      flatstore.set('valueBrake', inputAt(btnBrake));

    if (btnClutch != null)
      flatstore.set('valueClutch', inputAt(btnClutch));

    if (btnGearReverse != null)
      flatstore.set('valueGearReverse', inputAt(btnGearReverse));
    if (btnGear1 != null)
      flatstore.set('valueGear1', inputAt(btnGear1));
    if (btnGear2 != null)
      flatstore.set('valueGear2', inputAt(btnGear2));
    if (btnGear3 != null)
      flatstore.set('valueGear3', inputAt(btnGear3));
    if (btnGear4 != null)
      flatstore.set('valueGear4', inputAt(btnGear4));
    if (btnGear5 != null)
      flatstore.set('valueGear5', inputAt(btnGear5));
    if (btnGear6 != null)
      flatstore.set('valueGear6', inputAt(btnGear6));
    if (btnGear7 != null)
      flatstore.set('valueGear7', inputAt(btnGear7));



    if (btnWheel_DUp != null)
      flatstore.set('valueWheel_DUp', inputAt(btnWheel_DUp));
    if (btnWheel_DDown != null)
      flatstore.set('valueWheel_DDown', inputAt(btnWheel_DDown));
    if (btnWheel_DLeft != null)
      flatstore.set('valueWheel_DLeft', inputAt(btnWheel_DLeft));
    if (btnWheel_DRight != null)
      flatstore.set('valueWheel_DRight', inputAt(btnWheel_DRight));
    if (btnWheel_Back != null)
      flatstore.set('valueWheel_Back', inputAt(btnWheel_Back));
    if (btnWheel_Start != null)
      flatstore.set('valueWheel_Start', inputAt(btnWheel_Start));
    if (btnWheel_X != null)
      flatstore.set('valueWheel_X', inputAt(btnWheel_X));
    if (btnWheel_Y != null)
      flatstore.set('valueWheel_Y', inputAt(btnWheel_Y));
    if (btnWheel_A != null)
      flatstore.set('valueWheel_A', inputAt(btnWheel_A));
    if (btnWheel_B != null)
      flatstore.set('valueWheel_B', inputAt(btnWheel_B));
    if (btnWheel_RSB != null)
      flatstore.set('valueWheel_RSB', inputAt(btnWheel_RSB));
    if (btnWheel_LSB != null)
      flatstore.set('valueWheel_LSB', inputAt(btnWheel_LSB));
    if (btnWheel_LB != null)
      flatstore.set('valueWheel_LB', inputAt(btnWheel_LB));
    if (btnWheel_RB != null)
      flatstore.set('valueWheel_RB', inputAt(btnWheel_RB));
    if (btnWheel_L3 != null)
      flatstore.set('valueWheel_L3', inputAt(btnWheel_L3));
    if (btnWheel_R3 != null)
      flatstore.set('valueWheel_R3', inputAt(btnWheel_R3));
    if (btnWheel_L4 != null)
      flatstore.set('valueWheel_L4', inputAt(btnWheel_L4));
    if (btnWheel_R4 != null)
      flatstore.set('valueWheel_R4', inputAt(btnWheel_R4));

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

  // Poll the device list: the browser's gamepadconnected event can be missed
  // (e.g. button pressed while the page wasn't focused), so don't rely on it alone.
  const listDevices = () =>
    Array.from(navigator.getGamepads())
      .filter(Boolean)
      .map((gp) => ({ index: gp.index, id: gp.id }));
  const [devices, setDevices] = React.useState(listDevices);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const next = listDevices();
      setDevices((prev) =>
        JSON.stringify(prev) === JSON.stringify(next) ? prev : next
      );
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sidebar-field">
      <label className="control-label">Controller Gamepad</label>
      <select
        name="gamepadSelection"
        value={gamePadIndex ?? ''}
        onChange={(e) => props.onChange(e)}>
        {devices.length === 0 && (
          <option value="" disabled>Press a button on a controller…</option>
        )}
        {devices.map((gp) => (
          <option key={'optionsGamepad' + gp.index} value={gp.index}>
            {gp.id}
          </option>
        ))}
      </select>
    </div>
  )
}

export default App;
