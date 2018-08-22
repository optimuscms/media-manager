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

    Vue.mediaManager = {
        bus: new Vue(),

        open(options) {
            this.bus.$emit('media-manager-open', options);
        },

        imageExtensions() {
            return options.store.getters['mediaManager/imageExtensions'];
        },

        setActiveMedia(media) {
            options.store.commit('mediaManager/setActiveMedia', media);
        },

        getActiveMedia(mediaId) {
            return options.store.getters['mediaManager/activeMedia']([mediaId])[0];
        },

        clearActiveMedia() {
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
