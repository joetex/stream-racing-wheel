import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

var flatiron = {};  //main library
var fiStore = {};   //global store
var fiWatchers = {};    //component watchers
var fiWatchersChildren = {}; //component watchers for drill down keys 
var fiIncrementIndex = 0; //HOC indexing
var fiSubscribers;  //global subscribers (outside components)
var fiHistoryIndex = {}; //index of history
var fiHistory = {}; //history list of copied states
var delimiter = "-";

flatiron.delimiter = function (d) {
    delimiter = d;
}

flatiron.get = function (key) {
    let value;
    try {
        value = _getChild(fiStore, key);
    } catch (error) {
        throw new Error("[flatiron.get] ERROR: Key '" + key + "' not valid.");
    }

    return value;
}

flatiron.copy = function (key) {
    let value = flatiron.get(key);
    return cloneDeep(value);
}

flatiron.set = function (key, newValue) {
    let parent = key;
    try {
        parent = _setChild(fiStore, key, newValue);
    } catch (error) {
        throw new Error("[flatiron.set] ERROR: Key '" + key + "' not valid.");
    }

    flatiron._notifyHistory(parent, fiStore[parent]);
    flatiron._notifyComponents(parent, fiStore[parent]);
    flatiron._notifySubscribers(parent, fiStore[parent]);

    if (parent !== key) {
        flatiron._notifyComponents(key, newValue);
        flatiron._notifySubscribers(key, newValue);
    } else {
        flatiron._notifyChildren(parent);
    }
}

flatiron.setWithObj = function (obj) {
    for (let i in obj) {
        const key = i
        const newValue = obj[i]
        let parent = key;
        try {
            parent = _setChild(fiStore, key, newValue);
        } catch (error) {
            throw new Error("[flatiron.set] ERROR: Key '" + key + "' not valid.");
        }

        flatiron._notifyHistory(parent, fiStore[parent]);
        flatiron._notifyComponents(parent, fiStore[parent]);
        flatiron._notifySubscribers(parent, fiStore[parent]);

        if (parent !== key) {
            flatiron._notifyComponents(key, newValue);
            flatiron._notifySubscribers(key, newValue);
        } else {
            flatiron._notifyChildren(parent);
        }
    }
}
flatiron.subscribe = function (key, callback) {
    if (!(callback instanceof Function))
        throw new Error("[flatiron.subscribe] ERROR: callback must be a function.");
    if (!fiSubscribers)
        fiSubscribers = {};

    if (!fiSubscribers[key])
        fiSubscribers[key] = [];
    fiSubscribers[key].push(callback);
}

flatiron.undo = function (key) {
    if (!(key in fiHistory))
        throw new Error("[flatiron.undo] ERROR: Key '" + key + "' does not have historical state");

    let index = fiHistoryIndex[key] - 2;
    if (index < 0)
        index = 0;
    fiHistoryIndex[key] = index + 1;
    flatiron._setHistory(key, cloneDeep(fiHistory[key][index]));
    return fiHistory[key][index];
}

flatiron.redo = function (key) {
    if (!(key in fiHistory))
        throw new Error("[flatiron.redo] ERROR: Key '" + key + "' does not have historical state");
    let index = fiHistoryIndex[key];
    if (index >= fiHistory[key].length)
        index = fiHistory[key].length - 1;
    fiHistoryIndex[key] = index + 1;
    flatiron._setHistory(key, cloneDeep(fiHistory[key][index]));
    return fiHistory[key][index];
}

flatiron.historical = function (key) {
    fiHistory[key] = [];
    fiHistoryIndex[key] = 0;
}

function _arrayEquals(a, b) {
    if (!a || !b) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
}

flatiron.connect = function (watchedKeys, onCustomWatched, onCustomProps) {
    return function (WrappedComponent) {
        return class extends React.Component {
            constructor(props) {
                super(props);

                this.watched = {};
                this.onCustomWatched = null;
                this._flatironid = fiIncrementIndex++;

                if (onCustomWatched instanceof Function)
                    this.onCustomWatched = onCustomWatched;

                this.state = this.processWatched(true);
            }

            componentWillUnmount() {
                flatiron._unwatch(this.watched, this);
            }

            processWatched(isConstructor) {
                if (this.onCustomWatched) {
                    let previousWatchedKeys = watchedKeys;
                    watchedKeys = this.onCustomWatched({ ...this.props, ...this.state });
                    if (!_arrayEquals(previousWatchedKeys, watchedKeys)) {
                        flatiron._unwatch(this.watched, this);
                        this.watched = {};
                    }
                }

                if (!Array.isArray(watchedKeys))
                    throw new Error("[flatiron.ProcessWatched] ERROR: parameter watchList '" + typeof watchedKeys + "' must return array of strings.");

                let componentState = {};

                for (let i in watchedKeys) {
                    let key = watchedKeys[i];

                    if (!(key in this.watched)) {
                        flatiron._watch(key, this);
                        this.watched[key] = true;
                        if (isConstructor) {
                            let customState = this.onNotify(key, flatiron.copy(key), isConstructor);
                            Object.assign(componentState, customState);
                        }
                    }
                }

                return componentState;
            }

            onNotify(key, value, isConstructor) {
                let componentState = {};
                componentState[key] = value;

                if (onCustomProps instanceof Function) {
                    let customComponentState = onCustomProps(key, value, Object.assign({}, fiStore), { ...this.props, ...this.state });
                    Object.assign(componentState, customComponentState);
                }

                // if (this.onCustomWatched)
                //     this.processWatched();

                if (!isConstructor)
                    this.setState(componentState);
                return componentState;
            }

            render() {
                return React.createElement(WrappedComponent, { ...this.state, ...this.props }, this.props.children);
            }
        };
    }
}

function _getChild(obj, path) {
    var i;
    path = path.split(delimiter);
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    return obj[path[i]];
}

function _setChild(obj, path, value) {
    var i;
    path = path.split(delimiter);
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    obj[path[i]] = value;
    return path[0];
}

flatiron._setHistory = function (key, newValue) {
    let oldValue = fiStore[key];
    let parent = _setChild(fiStore, key, newValue);

    flatiron._notifyComponents(key, newValue);
    flatiron._notifySubscribers(key, newValue);
    flatiron._notifyChildren(parent);
}

flatiron._notifyChildren = function (key) {
    if (!Array.isArray(fiStore[key]) && !(fiStore[key] instanceof Object))
        return;
    for (var childKey in fiWatchersChildren[key]) {
        let newValue = flatiron.get(childKey);
        flatiron._notifyComponents(childKey, newValue);
        flatiron._notifySubscribers(childKey, newValue);
    }
}

flatiron._notifyHistory = function (key, value) {
    if (!(key in fiHistory))
        return;

    value = cloneDeep(value);
    let index = fiHistoryIndex[key];
    if (index == fiHistory[key].length) {
        fiHistory[key].push(value);
        fiHistoryIndex[key] = fiHistory[key].length;
    }
    else {
        fiHistory[key] = fiHistory[key].slice(0, index);
        fiHistory[key][index] = value;
        fiHistoryIndex[key] = index + 1;
    }
}
flatiron._notifyComponents = function (key, value) {
    if (!(key in fiWatchers))
        return;
    for (let i in fiWatchers[key])
        fiWatchers[key][i].onNotify(key, value);
}
flatiron._notifySubscribers = function (key, value) {
    if (!fiSubscribers)
        return;

    for (let i in fiSubscribers['*'])
        fiSubscribers['*'][i](key, value);

    for (let i in fiSubscribers[key])
        fiSubscribers[key][i](key, value);
}



flatiron._watch = function (key, component) {
    if (!fiWatchers[key])
        fiWatchers[key] = {};
    fiWatchers[key][component._flatironid] = component;
    let delimiterPos = key.indexOf(delimiter);
    if (delimiterPos > -1) {
        let parentKey = key.substring(0, delimiterPos);
        if (!fiWatchersChildren[parentKey])
            fiWatchersChildren[parentKey] = {};
        fiWatchersChildren[parentKey][key] = true;
    }
}

flatiron._unwatch = function (watched, component) {
    for (let key in watched) {
        delete fiWatchers[key][component._flatironid];
    }

}

export default flatiron;