import managerStore from './store/manager';
import pickersStore from './store/pickers';
import mediaStore from './store/media';
import foldersStore from './store/folders';

import icons from './lib/icons';
import defaultActions from './actions';

import {
    iconMap as defaultIconMap,
    imageExtensions as defaultImageExtensions,
} from './config/media';

let actions = { ...defaultActions };
let iconMap = { ...defaultIconMap };
let imageExtensions = [ ...defaultImageExtensions ];

import MediaManager from './components/MediaManager.vue';
import MediaPicker from './components/MediaPicker.vue';

export default function install(Vue, options = {}) {
    if (! options.hasOwnProperty('store')) {
        throw new Error('Please provide vuex store.');
    }

    // Register store
    options.store.registerModule('mediaManager', managerStore);
    options.store.registerModule('mediaManagerPickers', pickersStore);
    options.store.registerModule('mediaManagerMedia', mediaStore);
    options.store.registerModule('mediaManagerFolders', foldersStore);

    // Register icons
    icons.register();

    // Register components
    Vue.component('media-manager', MediaManager);
    Vue.component('media-picker', MediaPicker);

    // Setup options
    if (options.hasOwnProperty('actions')) {
        const userActions = options.actions;

        Object.keys(actions).forEach(actionName => {
            if (! (userActions.hasOwnProperty(actionName) && userActions[actionName])) {
                return;
            }

            if (! (userActions[actionName] instanceof Function)) {
                throw new Error(`${actionName} is not a function.`);
            }

            actions[actionName] = userActions[actionName];
        });
    }

    if (options.hasOwnProperty('iconMap')) {
        if (! (options.iconMap instanceof Object)) {
            throw new Error('Icon map must be an object.');
        }

        iconMap = options.iconMap;
    }

    if (options.hasOwnProperty('imageExtensions')) {
        if (! (options.imageExtensions instanceof Array)) {
            throw new Error('Image extensions must be an array.');
        }

        imageExtensions = options.imageExtensions;
    }
}

export {
    actions,
    iconMap,
    imageExtensions,
};
