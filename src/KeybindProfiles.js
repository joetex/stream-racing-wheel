import flatstore from 'flatstore';
import { useEffect, useState } from 'react';


export const defaultProfiles = {
  'G923': {
    'btnWheel': 0,
    'btnGas': 2,
    'invert/btnGas': false,
    'btnBrake': 5,
    'btnClutch': 1,
    'btnGearReverse': 28,
    'btnGear1': 22,
    'invert/btnGear1': false,
    'btnGear2': 23,
    'btnGear3': 24,
    'btnGear4': 25,
    'btnGear5': 26,
    'btnGear6': 27,
    'btnGear7': -1,
    'btnWheel_DUp': 9,
    'btnWheel_DDown': 9,
    'btnWheel_DLeft': 9,
    'btnWheel_DRight': 9,
    'btnWheel_Back': 17,
    'btnWheel_Start': 16,
    'btnWheel_X': 11,
    'btnWheel_Y': 13,
    'btnWheel_A': 10,
    'btnWheel_B': 12,
    'btnWheel_RSB': 20,
    'btnWheel_LSB': 21,
    'btnWheel_LB': 15,
    'btnWheel_RB': 14,
    'btnWheel_L3': 15,
    'btnWheel_R3': 14,
    'btnWheel_L4': 15,
    'btnWheel_R4': 14,
    'btnWheel_plus': 29,
    'btnWheel_minus': 30,
    'btnWheel_ps': 34,
    'btnWheel_option': 19,
    'btnWheel_share': 18,
    'btnWheel_return': 33,
    'imgWheel': '/stream-racing-wheel/g923/wheel.png',
    'imgWheel_DUp': '/stream-racing-wheel/g923/DUp.png',
    'imgWheel_DDown': '/stream-racing-wheel/g923/DDown.png',
    'imgWheel_DLeft': '/stream-racing-wheel/g923/DLeft.png',
    'imgWheel_DRight': '/stream-racing-wheel/g923/DRight.png',
    'imgWheel_Back': '/stream-racing-wheel/g923/Back.png',
    'imgWheel_Start': '/stream-racing-wheel/g923/Start.png',
    'imgWheel_X': '/stream-racing-wheel/g923/X.png',
    'imgWheel_Y': '/stream-racing-wheel/g923/Y.png',
    'imgWheel_A': '/stream-racing-wheel/g923/A.png',
    'imgWheel_B': '/stream-racing-wheel/g923/B.png',
    'imgWheel_RSB': '/stream-racing-wheel/g923/RSB.png',
    'imgWheel_LSB': '/stream-racing-wheel/g923/LSB.png',
    'imgWheel_LB': '/stream-racing-wheel/g923/LB.png',
    'imgWheel_RB': '/stream-racing-wheel/g923/RB.png',
    'imgWheel_L3': '/stream-racing-wheel/g923/LB.png',
    'imgWheel_R3': '/stream-racing-wheel/g923/RB.png',
    'imgWheel_L4': '/stream-racing-wheel/g923/LB.png',
    'imgWheel_R4': '/stream-racing-wheel/g923/RB.png',
    'imgWheel_plus': '/stream-racing-wheel/g923/plus.png',
    'imgWheel_minus': '/stream-racing-wheel/g923/minus.png',
    'imgWheel_ps': '/stream-racing-wheel/g923/ps.png',
    'imgWheel_option': '/stream-racing-wheel/g923/option.png',
    'imgWheel_share': '/stream-racing-wheel/g923/share.png',
    'imgWheel_return': '/stream-racing-wheel/g923/return.png',
    
    'imgPedalBase': '/stream-racing-wheel/g923/pedals.png',
    'imgGas': '/stream-racing-wheel/g923/gas.png',
    'imgBrake': '/stream-racing-wheel/g923/brake.png',
    'imgClutch': '/stream-racing-wheel/g923/clutch.png',
    'imgShifterBase': '/stream-racing-wheel/g923/shifter-base.png',
    'imgShifter': '/stream-racing-wheel/g923/shifter.png',
    
  }
}

export function getCurrentProfile() {
  let keys = Object.keys(defaultProfiles.G923); //use keys from this profile 

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
  return 'G923';
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
  //cannot delete G923
  if (profileName == 'G923') {
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
