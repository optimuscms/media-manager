import mediaStore from './store';
import './lib/icons';

// todo docs
// <media-manager></media-manager>
// <media-picker></media-picker> props: value Number/Array, accept [], limit Number, preview Boolean
// mention plugin is dependant on @optimuscms/ui

export default function install(Vue, options = {}) {

    if (! options.hasOwnProperty('store')) {
        throw new Error('Please provide vuex store.');
    }
    
    options.store.registerModule('mediaManager', mediaStore);
    window.mediaManagerBus = new Vue();

    Vue.mediaManager = {
        open(options) {
            mediaManagerBus.$emit('media-manager-open', options);
        },

        imageExtensions() {
            return options.store.getters['mediaManager/imageExtensions'];
        },

        setActiveMedia(media) { // todo rename active media?
            options.store.commit('mediaManager/setActiveMedia', media);
        },

        getActiveMediaById(id) { // todo rename active media?
            return options.store.getters['mediaManager/getActiveMedia']([id])[0];
        },

        clearActiveMedia() { // todo rename active media?
            options.store.commit('mediaManager/clearActiveMedia');
        }
    }

    // Register components
    Vue.component('media-manager', require('./components/Manager'));
    Vue.component('media-picker', require('./components/Picker'));

    Object.defineProperty(Vue.prototype, '$mediaManager', {
        get() {
            return Vue.mediaManager;
        }
    });

}
