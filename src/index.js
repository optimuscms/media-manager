import mediaStore from './store';
import icons from './lib/icons';

import MediaManager from './components/MediaManager';
import MediaPicker from './components/MediaPicker';

// todo docs
// <media-manager></media-manager>
// <media-picker></media-picker> props: value Number/Array, accept [], limit Number, preview Boolean
// mention plugin is dependant on @optimuscms/ui

export default function install(Vue, options = {}) {

    if (! options.hasOwnProperty('store')) {
        throw new Error('Please provide vuex store.');
    }

    icons.register();

    options.store.registerModule('mediaManager', mediaStore);
    
    // Register components
    Vue.component('media-manager', MediaManager);
    Vue.component('media-picker', MediaPicker);

    // const eventBus = new Vue();

    // Vue.mediaManager = {
    //     open(params) {
    //         eventBus.$emit('media-manager-open', params);
    //     },

    //     onOpen(callback = () => {}) {
    //         eventBus.$on('media-manager-open', callback);
    //     },

    //     close() {
    //         eventBus.$emit('media-manager-closed');
    //     },

    //     onClose(callback = () => {}) {
    //         eventBus.$on('media-manager-closed', callback);
    //     },

    //     destroy(callback = () => {}) {
    //         eventBus.$off('media-manager-open', callback);
    //     },

    //     mediaSelected(mediaIds) {
    //         eventBus.$emit('media-selected', mediaIds);
    //     },

    //     onMediaSelected(callback = () => {}) {
    //         return eventBus.$once('media-selected', callback);
    //     },

    //     removeMediaSelectedListener(callback = () => {}) {
    //         eventBus.$off('media-selected', callback);
    //     },

    //     mediaDeleted(mediaIds) {
    //         eventBus.$emit('media-deleted', mediaIds);
    //     },

    //     onMediaDeleted(mediaIds) {
    //         return eventBus.$on('media-deleted', mediaIds);
    //     },

    //     imageExtensions() {
    //         return options.store.getters['mediaManager/imageExtensions'];
    //     },

    //     setActiveMedia(media) {
    //         options.store.commit('mediaManager/setActiveMedia', media);
    //     },

    //     getActiveMedia(mediaId) {
    //         return options.store.getters['mediaManager/activeMedia']([mediaId])[0];
    //     },

    //     clearActiveMedia() {
    //         options.store.commit('mediaManager/clearActiveMedia');
    //     }
    // }

}
