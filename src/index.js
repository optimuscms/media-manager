import store from './store';
import icons from './lib/icons';

import MediaManager from './components/MediaManager.vue';
import MediaPicker from './components/MediaPicker.vue';

// todo docs
// <media-manager></media-manager>
// <media-picker></media-picker> props: value Number/Array, accept [], limit Number, preview Boolean
// mention plugin is dependant on @optimuscms/ui

export default function install(Vue, options = {}) {
    if (! options.hasOwnProperty('store')) {
        throw new Error('Please provide vuex store.');
    }

    options.store.registerModule('mediaManager', store);

    icons.register();

    // Register components
    Vue.component('media-manager', MediaManager);
    Vue.component('media-picker', MediaPicker);
}
