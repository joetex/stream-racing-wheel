import React, { useState } from "react";
import flatstore from "flatstore";
import { ProfileLoader } from "./KeybindProfiles";

function PreviewButtons() {
    let [actionStates] = flatstore.useWatch("actionStates");

    if (!actionStates || actionStates.length === 0) return null;

    let displayAxes = [];
    let displayButtons = [];

    for (let x = 0; x < actionStates.length; x++) {
        let action = actionStates[x];
        let { type, id, pressed, value } = action;

        if (type === "Button") {
            displayButtons.push(
                <div
                    key={"displayButtons-" + id}
                    className={`monitor-btn-chip ${pressed ? "pressed" : ""}`}
                    style={
                        pressed
                            ? { backgroundColor: `rgba(99, 179, 237, ${Math.max(0.35, Math.abs(value))})` }
                            : undefined
                    }
                >
                    <span>{id}</span>
                </div>
            );
        } else if (type === "Axis") {
            let axisValue = Number.parseFloat(value);
            let pct = Math.min(Math.max(((axisValue + 1.0) / 2.0) * 100, 0), 100);
            displayAxes.push(
                <div className="monitor-axis-chip" key={"displayAxes-" + id}>
                    <div className="monitor-axis-bar" style={{ width: pct + "%" }} />
                    <span className="monitor-axis-label">Axis {id}</span>
                    <span className="monitor-axis-val">{axisValue.toFixed(2)}</span>
                </div>
            );
        }
    }

    return (
        <div className="rebind-card">
            <div className="rebind-card-header">
                <h3>Live Input Monitor</h3>
                <span className="rebind-hint">Move your wheel, pedals, or press buttons to see their IDs</span>
            </div>
            <div className="monitor-group">
                <div className="monitor-label">Axes</div>
                <div className="monitor-chips">{displayAxes}</div>
            </div>
            <div className="monitor-group">
                <div className="monitor-label">Buttons</div>
                <div className="monitor-chips">{displayButtons}</div>
            </div>
        </div>
    );
}

function RebindInputs() {
    let [gamepad] = flatstore.useWatch("gamePad");
    const [activeTab, setActiveTab] = useState("driving");
    const [showMaskImages, setShowMaskImages] = useState(false);

    if (!gamepad) {
        return (
            <div className="rebind-empty">
                <ProfileLoader />
                <p className="rebind-hint" style={{ marginTop: "0.75rem" }}>
                    Connect or move a controller/wheel to view live inputs and customize bindings.
                </p>
            </div>
        );
    }

    return (
        <div className="rebind-container">
            <ProfileLoader />
            <PreviewButtons />

            <div className="rebind-tabs">
                <button
                    type="button"
                    className={`rebind-tab-btn ${activeTab === "driving" ? "active" : ""}`}
                    onClick={() => setActiveTab("driving")}
                >
                    Wheel, Pedals &amp; Shifter
                </button>
                <button
                    type="button"
                    className={`rebind-tab-btn ${activeTab === "buttons" ? "active" : ""}`}
                    onClick={() => setActiveTab("buttons")}
                >
                    Wheel Buttons
                </button>
                <button
                    type="button"
                    className={`rebind-tab-btn ${activeTab === "images" ? "active" : ""}`}
                    onClick={() => setActiveTab("images")}
                >
                    Custom Images
                </button>
            </div>

            {activeTab === "driving" && (
                <div className="rebind-tab-panel">
                    <div className="rebind-card">
                        <div className="rebind-card-header">
                            <h3>Wheel &amp; Pedals</h3>
                        </div>
                        <div className="bind-grid">
                            <InputBind title="Wheel" id="btnWheel" allowInvert={true} />
                            <InputBind title="Gas" id="btnGas" allowInvert={true} />
                            <InputBind title="Brake" id="btnBrake" allowInvert={true} />
                            <InputBind title="Clutch" id="btnClutch" allowInvert={true} />
                        </div>
                    </div>

                    <div className="rebind-card">
                        <div className="rebind-card-header">
                            <h3>H-Pattern Shifter</h3>
                        </div>
                        <div className="bind-grid">
                            <InputBind title="Reverse" id="btnGearReverse" allowInvert={true} />
                            <InputBind title="Gear 1" id="btnGear1" allowInvert={true} />
                            <InputBind title="Gear 2" id="btnGear2" allowInvert={true} />
                            <InputBind title="Gear 3" id="btnGear3" allowInvert={true} />
                            <InputBind title="Gear 4" id="btnGear4" allowInvert={true} />
                            <InputBind title="Gear 5" id="btnGear5" allowInvert={true} />
                            <InputBind title="Gear 6" id="btnGear6" allowInvert={true} />
                            <InputBind title="Gear 7" id="btnGear7" allowInvert={true} />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "buttons" && (
                <div className="rebind-tab-panel">
                    <div className="rebind-card">
                        <div className="rebind-card-header">
                            <h3>Wheel Button Masks</h3>
                            <span className="rebind-hint">Used when Button Masks is set to On (Logitech G920)</span>
                        </div>
                        <div className="bind-grid">
                            <InputBind title="D-Up" id="btnWheel_DUp" />
                            <InputBind title="D-Down" id="btnWheel_DDown" />
                            <InputBind title="D-Left" id="btnWheel_DLeft" />
                            <InputBind title="D-Right" id="btnWheel_DRight" />
                            <InputBind title="Back" id="btnWheel_Back" />
                            <InputBind title="Start" id="btnWheel_Start" />
                            <InputBind title="X" id="btnWheel_X" />
                            <InputBind title="Y" id="btnWheel_Y" />
                            <InputBind title="A" id="btnWheel_A" />
                            <InputBind title="B" id="btnWheel_B" />
                            <InputBind title="LSB" id="btnWheel_LSB" />
                            <InputBind title="RSB" id="btnWheel_RSB" />
                            <InputBind title="LB" id="btnWheel_LB" />
                            <InputBind title="RB" id="btnWheel_RB" />
                            <InputBind title="L3" id="btnWheel_L3" />
                            <InputBind title="R3" id="btnWheel_R3" />
                            <InputBind title="L4" id="btnWheel_L4" />
                            <InputBind title="R4" id="btnWheel_R4" />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "images" && (
                <div className="rebind-tab-panel">
                    <div className="rebind-card">
                        <div className="rebind-card-header">
                            <h3>Hardware Images</h3>
                            <span className="rebind-hint">Enter any image URL or local path to override the active artwork</span>
                        </div>
                        <div className="image-bind-list">
                            <ImageBind title="Wheel" id="imgWheel" width="500" height="500" />
                            <ImageBind title="Pedal Base" id="imgPedalBase" width="400" height="238" />
                            <ImageBind title="Gas Pedal" id="imgGas" width="70" height="121" />
                            <ImageBind title="Brake Pedal" id="imgBrake" width="70" height="96" />
                            <ImageBind title="Clutch Pedal" id="imgClutch" width="70" height="96" />
                            <ImageBind title="Shifter Base" id="imgShifterBase" width="250" height="293" />
                            <ImageBind title="Shifter Head" id="imgShifter" width="150" height="150" />
                        </div>

                        <button
                            type="button"
                            className="rebind-secondary-btn"
                            style={{ marginTop: "1rem" }}
                            onClick={() => setShowMaskImages((prev) => !prev)}
                        >
                            {showMaskImages ? "Hide Wheel Button Mask Images ▲" : "Show Wheel Button Mask Images (18) ▼"}
                        </button>

                        {showMaskImages && (
                            <div className="image-bind-list" style={{ marginTop: "0.85rem" }}>
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
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function ImageBind({ id, title, width, height }) {
    let [value] = flatstore.useChange(id);
    return (
        <div className="image-bind-row">
            <label className="image-bind-label">{title}</label>
            <input
                name={id}
                type="text"
                className="image-bind-input"
                value={value || ""}
                onChange={(e) => {
                    flatstore.set(id, e.target.value);
                    localStorage.setItem(id, e.target.value);
                    flatstore.set("updatedSettings", Date.now());
                }}
            />
            <span className="image-bind-dims">
                {width || 0}×{height || 0}px
            </span>
        </div>
    );
}

function InputBind({ id, title, allowInvert }) {
    let actionStates = flatstore.get("actionStates") || [];
    let [defaultValue] = flatstore.useChange(id);
    let [defaultChecked] = flatstore.useWatch("invert/" + id);

    defaultChecked = defaultChecked === "false" || !defaultChecked ? false : true;

    return (
        <div className="bind-item-card">
            <label className="bind-item-title">{title}</label>
            <select
                className="bind-item-select"
                name={id}
                value={defaultValue ?? ""}
                onChange={(e) => {
                    flatstore.set(id, Number.parseInt(e.target.value, 10));
                    flatstore.set("updatedSettings", Date.now());
                }}
            >
                {actionStates.map((action) => (
                    <option key={"option-" + action.index} value={action.index}>
                        {action.type} {action.id}
                    </option>
                ))}
            </select>
            {allowInvert && (
                <div className="bind-item-invert">
                    <span>Invert</span>
                    <label className="switch">
                        <input
                            id={"checkbox-" + id}
                            name={"checkbox-" + id}
                            type="checkbox"
                            checked={defaultChecked}
                            onChange={(e) => {
                                flatstore.set("invert/" + id, e.target.checked);
                                flatstore.set("updatedSettings", Date.now());
                            }}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            )}
        </div>
    );
}

export default RebindInputs;
