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
    
    const eventBus = new Vue();
    options.store.registerModule('mediaManager', mediaStore);

    Vue.mediaManager = {
        open(params) {
            eventBus.$emit('media-manager-open', params);
        },

        onOpen(params) {
            eventBus.$on('media-manager-open', params);
        },

        close() {
            eventBus.$emit('media-manager-closed');
        },

        onClose(params) {
            eventBus.$on('media-manager-closed', () => {
                eventBus.$off('media-selected', params);
            });
        },

        destroy(params) {
            eventBus.$off('media-manager-open', params);
        },

        mediaSelected(mediaIds) {
            eventBus.$emit('media-selected', mediaIds);
        },

        onMediaSelected(params) {
            return eventBus.$once('media-selected', params);
        },

        mediaDeleted(mediaIds) {
            eventBus.$emit('media-deleted', mediaIds);
        },

        onMediaDeleted(mediaIds) {
            return eventBus.$on('media-deleted', mediaIds);
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
