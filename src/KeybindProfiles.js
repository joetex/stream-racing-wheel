import flatstore from 'flatstore';
import { useEffect, useState } from 'react';


export const defaultProfiles = {
  'G920': {
    'btnWheel': 0,
    'btnGas': 1,
    'btnBrake': 2,
    'btnClutch': 5,
    'btnGearReverse': 15,
    'btnGear1': 16,
    'btnGear2': 17,
    'btnGear3': 18,
    'btnGear4': 19,
    'btnGear5': 20,
    'btnGear6': 21,
    'btnGear7': 22,
    'btnWheel_DUp': 16,
    'btnWheel_DDown': 17,
    'btnWheel_DLeft': 18,
    'btnWheel_DRight': 19,
    'btnWheel_Back': 12,
    'btnWheel_Start': 13,
    'btnWheel_X': 6,
    'btnWheel_Y': 7,
    'btnWheel_A': 4,
    'btnWheel_B': 5,
    'btnWheel_RSB': 15,
    'btnWheel_LSB': 14,
    'btnWheel_LB': 8,
    'btnWheel_RB': 9,
    'btnWheel_L3': 8,
    'btnWheel_R3': 9,
    'btnWheel_L4': 8,
    'btnWheel_R4': 9,
    'imgWheel': "/stream-racing-wheel/g920/wheel.png",
    'imgWheel_DUp': "/stream-racing-wheel/g920/DUp.png",
    'imgWheel_DDown': "/stream-racing-wheel/g920/DDown.png",
    'imgWheel_DLeft': "/stream-racing-wheel/g920/DLeft.png",
    'imgWheel_DRight': "/stream-racing-wheel/g920/DRight.png",
    'imgWheel_Back': "/stream-racing-wheel/g920/Back.png",
    'imgWheel_Start': "/stream-racing-wheel/g920/Start.png",
    'imgWheel_X': "/stream-racing-wheel/g920/X.png",
    'imgWheel_Y': "/stream-racing-wheel/g920/Y.png",
    'imgWheel_A': "/stream-racing-wheel/g920/A.png",
    'imgWheel_B': "/stream-racing-wheel/g920/B.png",
    'imgWheel_RSB': "/stream-racing-wheel/g920/RSB.png",
    'imgWheel_LSB': "/stream-racing-wheel/g920/LSB.png",
    'imgWheel_LB': "/stream-racing-wheel/g920/LB.png",
    'imgWheel_RB': "/stream-racing-wheel/g920/RB.png",
    'imgWheel_L3': "/stream-racing-wheel/g920/LB.png",
    'imgWheel_R3': "/stream-racing-wheel/g920/RB.png",
    'imgWheel_L4': "/stream-racing-wheel/g920/LB.png",
    'imgWheel_R4': "/stream-racing-wheel/g920/RB.png",
    'imgPedalBase': '/stream-racing-wheel/g920/pedals.png',
    'imgGas': '/stream-racing-wheel/g920/gas.png',
    'imgBrake': '/stream-racing-wheel/g920/brake.png',
    'imgClutch': '/stream-racing-wheel/g920/clutch.png',
    'imgShifterBase': '/stream-racing-wheel/g920/shifter-base.png',
    'imgShifter': '/stream-racing-wheel/g920/shifter.png',
  }
}

export function getCurrentProfile() {
  let keys = Object.keys(defaultProfiles.G920); //use keys from this profile 

  let json = {}
  for (let key of keys) {
    try { json[key] = JSON.parse(getSaved(key)); }
    catch (e) { json[key] = getSaved(key); }

    let inverted = getSaved('invert/' + key);
    if (typeof inverted !== 'undefined' && inverted != null) {
      try { json['invert/' + key] = JSON.parse(getSaved('invert/' + key)); }
      catch (e) { json['invert/' + key] = getSaved('invert/' + key); }
    }
  }
  return json;
}

export function ProfileLoader({ }) {

  let [defaultProfile] = flatstore.useChange('defaultProfile');
  // let defaultProfile = getDefaultProfile();
  let profiles = getProfiles();
  let profileNames = Object.keys(profiles);

  let [isCreate, setIsCreate] = useState(false);
  let [profileName, setProfileName] = useState('');
  let [profileJson, setProfileJson] = useState('');

  let [updatedSettings] = flatstore.useChange('updatedSettings');

  useEffect(() => {
    let currentProfile = getCurrentProfile();
    setProfileJson(JSON.stringify(currentProfile, null, 2));
  }, [updatedSettings])

  useEffect(() => {


    let currentProfile = getCurrentProfile();
    setProfileJson(JSON.stringify(currentProfile, null, 2));
  }, [])

  return (<div>
    <label htmlFor="profileLoader" style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', display: 'block' }}>Load Keybind Profile</label>
    <select name="profileLoader" id="profileLoader" value={isCreate ? '*' : defaultProfile} onChange={(e) => {
      let profileName = e.target.value;
      if (profileName == '*') {
        let currentProfile = getCurrentProfile();
        setProfileJson(JSON.stringify(currentProfile, null, 2));
        setIsCreate(true);
        return;
      }
      loadProfile(profileName);
      setIsCreate(false);
    }}>
      {profileNames.map(name => <option key={'profilename-' + name} value={name}>{name}</option>)}
      <option name="new" value="*">Create new profile</option>
    </select>
    <br />
    {isCreate && (
      <>
        <h4 style={{ marginTop: '20px', color: 'white', fontSize: '18px', fontWeight: '600', display: 'block' }}>Create Profile from Settings</h4>
        <label htmlFor="profilename" style={{ color: 'white', fontSize: '14px', fontWeight: '300', display: 'block' }}>Profile Name</label>
        <input type="text" id="profilename" name="profilename" value={profileName} onChange={(e) => { setProfileName(e.target.value) }} />
        <label htmlFor="profilename" style={{ color: 'white', fontSize: '14px', fontWeight: '300', display: 'block' }}>Profile JSON</label>
        <textarea style={{ width: '500px', height: '200px' }} id="profilename" name="profilejson" value={profileJson} onChange={(e) => {
          setProfileJson(e.target.value);
        }}></textarea>
        <br />
        <button name="create" value="create" onClick={() => {
          try {
            let json = JSON.parse(profileJson);
            if (profileName.length < 3) {
              alert("Profile name must be more than 2 characters.");
              return;
            }

            addProfile(profileName, json);
            loadProfile(profileName);
            setIsCreate(false);
          }
          catch (e) {
            alert("Profile JSON is invalid, must be valid JSON syntax.")
            console.error(e);
          }
        }}>Create Profile</button>
        &nbsp;&nbsp;&nbsp;
        <button name="reset" value="reset" onClick={() => {

          let defaultProfile = getDefaultProfile();
          loadProfile(defaultProfile);
          let currentProfile = getCurrentProfile();
          setProfileJson(JSON.stringify(currentProfile, null, 2));
        }}>Reset</button>
      </>

    )}
  </div>)
}

export function getDefaultProfile() {
  let defaultProfile = localStorage.getItem('defaultProfile');
  if (defaultProfile)
    return defaultProfile;
  return 'G920';
}
export function setDefaultProfile(profileName) {
  localStorage.setItem('defaultProfile', profileName);
  flatstore.set('defaultProfile', profileName);
}

export function getProfiles() {
  try {
    let profiles = localStorage.getItem('profiles');
    if (profiles)
      return JSON.parse(profiles);
  }
  catch (e) {
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

  let keys = Object.keys(profile);
  for (let key of keys) {
    loadSaved(key, profile[key]);
  }

  setDefaultProfile(profileName);
  flatstore.set('defaultProfile', profileName);
}

export function addProfile(profileName, profile) {
  if (typeof profileName !== 'string') {
    console.error("Profile name must be string.");
    alert("Profile name must be string.");
    return;
  }

  let profiles = getProfiles();

  if (profileName in profiles) {
    console.warn(`Profile "${profileName}" already exists.`);
    alert(`Profile "${profileName}" exists, overwriting.`);
    // return;
  }

  profiles[profileName] = profile;

  localStorage.setItem('profiles', JSON.stringify(profiles));
}

export function removeProfile(profileName) {
  //cannot delete G920
  if (profileName == 'G920') {
    return false;
  }

  let profiles = getProfiles();
  if (profileName in profiles) {
    delete profiles[profileName];
  }

  localStorage.setItem('profiles', JSON.stringify(profiles));
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
