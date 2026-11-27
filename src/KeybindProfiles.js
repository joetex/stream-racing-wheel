import flatstore from "flatstore";
import { useEffect, useState } from "react";

const pub = process.env.PUBLIC_URL || "";

const baseG920Profile = {
        btnWheel: 0,
        btnGas: 1,
        btnBrake: 2,
        btnClutch: 5,
        btnGearReverse: 15,
        btnGear1: 16,
        btnGear2: 17,
        btnGear3: 18,
        btnGear4: 19,
        btnGear5: 20,
        btnGear6: 21,
        btnGear7: 22,
        btnWheel_DUp: 16,
        btnWheel_DDown: 17,
        btnWheel_DLeft: 18,
        btnWheel_DRight: 19,
        btnWheel_Back: 12,
        btnWheel_Start: 13,
        btnWheel_X: 6,
        btnWheel_Y: 7,
        btnWheel_A: 4,
        btnWheel_B: 5,
        btnWheel_RSB: 15,
        btnWheel_LSB: 14,
        btnWheel_LB: 8,
        btnWheel_RB: 9,
        btnWheel_L3: 8,
        btnWheel_R3: 9,
        btnWheel_L4: 8,
        btnWheel_R4: 9,
        wheelButtonsEnabled: 1,
        imgWheel: `${pub}/g920/wheel.png`,
        imgWheel_DUp: `${pub}/g920/DUp.png`,
        imgWheel_DDown: `${pub}/g920/DDown.png`,
        imgWheel_DLeft: `${pub}/g920/DLeft.png`,
        imgWheel_DRight: `${pub}/g920/DRight.png`,
        imgWheel_Back: `${pub}/g920/Back.png`,
        imgWheel_Start: `${pub}/g920/Start.png`,
        imgWheel_X: `${pub}/g920/X.png`,
        imgWheel_Y: `${pub}/g920/Y.png`,
        imgWheel_A: `${pub}/g920/A.png`,
        imgWheel_B: `${pub}/g920/B.png`,
        imgWheel_RSB: `${pub}/g920/RSB.png`,
        imgWheel_LSB: `${pub}/g920/LSB.png`,
        imgWheel_LB: `${pub}/g920/LB.png`,
        imgWheel_RB: `${pub}/g920/RB.png`,
        imgWheel_L3: `${pub}/g920/LB.png`,
        imgWheel_R3: `${pub}/g920/RB.png`,
        imgWheel_L4: `${pub}/g920/LB.png`,
        imgWheel_R4: `${pub}/g920/RB.png`,
        imgPedalBase: `${pub}/g920/pedals.png`,
        imgGas: `${pub}/g920/gas.png`,
        imgBrake: `${pub}/g920/brake.png`,
        imgClutch: `${pub}/g920/clutch.png`,
        imgShifterBase: `${pub}/g920/shifter-base.png`,
        imgShifter: `${pub}/g920/shifter.png`,
};

export const defaultProfiles = {
    G920: baseG920Profile,
    "MOZA R5 Bundle (ES)": {
        ...baseG920Profile,
        wheelButtonsEnabled: 0,
        imgWheel: `${pub}/moza/wheels/es.png`,
    },
    "MOZA CS V2": {
        ...baseG920Profile,
        wheelButtonsEnabled: 0,
        imgWheel: `${pub}/moza/wheels/cs_v2.png`,
    },
    "MOZA KS GT": {
        ...baseG920Profile,
        wheelButtonsEnabled: 0,
        imgWheel: `${pub}/moza/wheels/ks.png`,
    },
};

export function getCurrentProfile() {
    let keys = Object.keys(defaultProfiles.G920); //use keys from this profile

    let json = {};
    for (let key of keys) {
        try {
            json[key] = JSON.parse(getSaved(key));
        } catch (e) {
            json[key] = getSaved(key);
        }

        let inverted = getSaved("invert/" + key);
        if (typeof inverted !== "undefined" && inverted != null) {
            try {
                json["invert/" + key] = JSON.parse(getSaved("invert/" + key));
            } catch (e) {
                json["invert/" + key] = getSaved("invert/" + key);
            }
        }
    }
    return json;
}

export function ProfileLoader() {
    let [defaultProfile] = flatstore.useChange("defaultProfile");
    let profiles = getProfiles();
    let profileNames = Object.keys(profiles);

    let [isCreate, setIsCreate] = useState(false);
    let [profileName, setProfileName] = useState("");
    let [profileJson, setProfileJson] = useState("");
    let [prevProfileName, setPrevProfileName] = useState("");

    let [updatedSettings] = flatstore.useChange("updatedSettings");

    useEffect(() => {
        let currentProfile = getCurrentProfile();
        setProfileJson(JSON.stringify(currentProfile, null, 2));
    }, [updatedSettings]);

    useEffect(() => {
        let currentProfile = getCurrentProfile();
        setProfileJson(JSON.stringify(currentProfile, null, 2));
    }, []);

    return (
        <div className="rebind-card">
            <div className="profile-bar">
                <div className="profile-bar-left">
                    <label htmlFor="profileLoader" className="control-label">
                        Keybind Profile
                    </label>
                    <select
                        name="profileLoader"
                        id="profileLoader"
                        value={isCreate ? "*" : defaultProfile}
                        onChange={(e) => {
                            let nextName = e.target.value;
                            if (nextName === "*") {
                                let curProfileName = getDefaultProfile();
                                if (curProfileName !== "*") {
                                    setPrevProfileName(curProfileName);
                                }
                                let currentProfile = getCurrentProfile();
                                setProfileJson(JSON.stringify(currentProfile, null, 2));
                                setIsCreate(true);
                                return;
                            }
                            loadProfile(nextName);
                            setIsCreate(false);
                        }}
                    >
                        {profileNames.map((name) => (
                            <option key={"profilename-" + name} value={name}>
                                {name}
                            </option>
                        ))}
                        <option name="new" value="*">
                            + Create new profile
                        </option>
                    </select>
                </div>

                {!isCreate && (
                    <div className="profile-bar-actions">
                        <button
                            type="button"
                            onClick={() => {
                                let json = getCurrentProfile();
                                let curProfileName = getDefaultProfile();
                                addProfile(curProfileName, json);
                                loadProfile(curProfileName);
                                setIsCreate(false);
                            }}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="rebind-danger-btn"
                            disabled={defaultProfile === "G920"}
                            onClick={() => {
                                let curProfileName = getDefaultProfile();
                                if (!window.confirm(`Do you want to DELETE "${curProfileName}" profile?`))
                                    return;

                                removeProfile(curProfileName);
                                loadProfile("G920");
                                setIsCreate(false);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {isCreate && (
                <div className="profile-create-panel">
                    <h4>Create Profile from Current Settings</h4>
                    <div className="sidebar-field">
                        <label htmlFor="profilename" className="control-label">
                            Profile Name
                        </label>
                        <input
                            type="text"
                            id="profilename"
                            name="profilename"
                            placeholder="e.g. My MOZA Drift"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                        />
                    </div>
                    <div className="sidebar-field">
                        <label htmlFor="profilejson" className="control-label">
                            Profile JSON
                        </label>
                        <textarea
                            className="profile-json-textarea"
                            id="profilejson"
                            name="profilejson"
                            value={profileJson}
                            onChange={(e) => setProfileJson(e.target.value)}
                        />
                    </div>
                    <div className="profile-bar-actions">
                        <button
                            type="button"
                            name="create"
                            onClick={() => {
                                try {
                                    let json = JSON.parse(profileJson);
                                    if (profileName.length < 3) {
                                        alert("Profile name must be more than 2 characters.");
                                        return;
                                    }
                                    addProfile(profileName, json);
                                    loadProfile(profileName);
                                    setIsCreate(false);
                                } catch (e) {
                                    alert("Profile JSON is invalid, must be valid JSON syntax.");
                                    console.error(e);
                                }
                            }}
                        >
                            Create Profile
                        </button>
                        <button
                            type="button"
                            className="rebind-secondary-btn"
                            onClick={() => {
                                let defProfile = getDefaultProfile();
                                loadProfile(defProfile);
                                let currentProfile = getCurrentProfile();
                                setProfileJson(JSON.stringify(currentProfile, null, 2));
                            }}
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            className="rebind-secondary-btn"
                            onClick={() => {
                                loadProfile(prevProfileName);
                                setIsCreate(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export function getDefaultProfile() {
    let defaultProfile = localStorage.getItem("defaultProfile");
    if (defaultProfile) return defaultProfile;
    return "G920";
}
export function setDefaultProfile(profileName) {
    localStorage.setItem("defaultProfile", profileName);
    flatstore.set("defaultProfile", profileName);
}

export function getProfiles() {
    try {
        let profiles = localStorage.getItem("profiles");
        if (profiles) {
            return { ...defaultProfiles, ...JSON.parse(profiles) };
        }
    } catch (e) {
        console.error(e);
    }

    return defaultProfiles;
}

export function loadDefaultProfile() {
    let defaultProfile = getDefaultProfile();
    loadProfile(defaultProfile);
}

export function loadProfile(profileName) {
    let profiles = getProfiles();
    let profile = profiles[profileName];
    if (!profile) {
        profileName = "G920";
        profile = profiles[profileName];
    }

    let keys = Object.keys(profile);
    for (let key of keys) {
        loadSaved(key, profile[key]);

        loadSaved("invert/" + key, profile["invert/" + key]);
    }

    // let inverted = getSaved('invert/' + key);
    // if (typeof inverted !== 'undefined' && inverted != null) {
    //   try { json['invert/' + key] = JSON.parse(getSaved('invert/' + key)); }
    //   catch (e) { json['invert/' + key] = getSaved('invert/' + key); }
    // }
    flatstore.set("updatedSettings", Date.now());
    setDefaultProfile(profileName);
    flatstore.set("defaultProfile", profileName);
}

export function addProfile(profileName, profile) {
    if (typeof profileName !== "string") {
        console.error("Profile name must be string.");
        alert("Profile name must be string.");
        return;
    }

    let profiles = getProfiles();

    if (profileName in profiles) {
        console.warn(`Profile "${profileName}" already exists.`);
        if (!window.confirm(`Do you want to overwrite "${profileName}" profile?`)) return;
        // return;
    }

    profiles[profileName] = profile;

    localStorage.setItem("profiles", JSON.stringify(profiles));
}

export function removeProfile(profileName) {
    //cannot delete G920
    if (profileName === "G920") {
        return false;
    }

    let profiles = getProfiles();
    if (profileName in profiles) {
        delete profiles[profileName];
    }

    localStorage.setItem("profiles", JSON.stringify(profiles));
}

function getSaved(key) {
    let value = flatstore.get(key);
    // if (value !== null && typeof value !== 'undefined' && (key.indexOf("btn") === 0 || key.indexOf("invert") === 0)) {
    //   value = Number.parseInt(value);
    // }
    return value;
}

function loadSaved(key, defaultValue) {
    // let saved = getSaved(key);

    // if (saved == null || typeof saved === 'undefined') {
    flatstore.set(key, defaultValue);
    // localStorage.setItem(key, defaultValue);
    // }
    // else {
    //   flatstore.set(key, saved);
    // }
}
